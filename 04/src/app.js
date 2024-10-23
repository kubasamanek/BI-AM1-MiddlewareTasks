const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();

app.use(express.json()); 

// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Tours API',
            version: '1.0.0',
            description: 'API for managing tours with asynchronous deletion'
        }
    },
    apis: ['./app.js'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

let tours = [
    { id: 0, name: "Hiking", price: 99.99 },
    { id: 1, name: "Swimming", price: 59.99 },
    { id: 2, name: "Cycling", price: 79.99 }
]

let pendingDeletions = {};

/**
 * @swagger
 * /tours:
 *   get:
 *     summary: List all tours
 *     responses:
 *       200:
 *         description: A list of tours
 */
app.get('/tours', (req, res) => {
    res.json(tours);
});

/**
 * @swagger
 * /tours/{id}:
 *   get:
 *     summary: Get a tour by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the tour
 *     responses:
 *       200:
 *         description: A tour object
 *       404:
 *         description: Tour not found
 */
app.get("/tours/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const tour = tours.find(tour => tour.id === id);

    if (!tour) {
        return res.status(404).send('Tour not found');
    }
    
    res.json(tour);
});

/**
 * @swagger
 * /tours/{id}:
 *   delete:
 *     summary: Asynchronously delete a tour
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the tour
 *     responses:
 *       202:
 *         description: A pending deletion confirmation
 *         headers:
 *           Location:
 *             description: URL to check the status of the deletion
 */
app.delete("/tours/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const tour = tours.find(tour => tour.id === id);

    if (!tour) {
        return res.status(404).send('Tour not found');
    }

    // Simulate confirmation delay 
    pendingDeletions[id] = setTimeout(() => {
        tours = tours.filter(t => t.id !== id);
        console.log(`Tour with id ${id} was successfully deleted.`);
        delete pendingDeletions[id]; 
    }, 10000); // 10 seconds delay

    res.status(202).location(`/tours/${id}/status`).json({
        message: `Tour with id ${id} is pending deletion. It will be confirmed after 10 seconds unless cancelled.`,
        pendingDeletion: true
    });
})

/**
 * @swagger
 * /tours/{id}/cancel:
 *   post:
 *     summary: Cancel a pending deletion of a tour
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the tour
 *     responses:
 *       200:
 *         description: Deletion cancelled
 *       404:
 *         description: No pending deletion for this tour
 */
app.post('/tours/:id/cancel', (req, res) => {
    const id = parseInt(req.params.id);

    if (pendingDeletions[id]) {
        clearTimeout(pendingDeletions[id]);
        delete pendingDeletions[id];
        res.json({ message: `Deletion of tour with id ${id} has been cancelled.` });
    } else {
        res.status(404).send('No pending deletion for this tour.');
    }
});

/**
 * @swagger
 * /tours/{id}/status:
 *   get:
 *     summary: Check the status of a tour deletion
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the tour
 *     responses:
 *       200:
 *         description: The status of the deletion
 *       404:
 *         description: Tour not found or already deleted
 */
app.get('/tours/:id/status', (req, res) => {
    const id = parseInt(req.params.id);
    
    const tour = tours.find(t => t.id === id);

    if (!tour && !pendingDeletions[id]) {
        return res.status(404).send('Tour not found or already deleted.');
    }

    if (pendingDeletions[id]) {
        res.json({
            message: `Tour with id ${id} is currently pending deletion.`,
            status: 'pending'
        });
    } else {
        res.json({
            message: `Tour with id ${id} is not pending deletion and is currently available.`,
            status: 'available'
        });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});