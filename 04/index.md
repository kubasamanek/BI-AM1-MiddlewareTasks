# TASK 4 - Asynchronous operation

I implemented a simple RESTful API build with Express.js managing tour data. It includes endpoints for listing the tours, as well as deleting them asynchronously. Human confirmation process is simulated by 10s delay. User can check the status of a pending deletion and cancel a pending deletion.

# Setup

First install necessary dependencies.
```bash
npm install
```

# Start the server
To start the server run the following command in /src folder.
```bash
node app.js
```

The API will be running at ``http://localhost:3000``.

# Swagger 

You can view the API documentation and interact with the endpoints through Swagger UI at ``http://localhost:3000/api-docs``. 

**Note:** If the API is running remotely (e.g., in a workspace), you may need to use port forwarding to access Swagger from your local machine. To forward the port, run:
```bash
ssh -L 3000:localhost:3000 <username>@<remote-server-ip>
```
# Endpoints

Here's a list of available endpoints. Detailed documentation is available in the Swagger UI. Example requests can be found in ``requests.http``.

### GET /tours
Returns a list of all available tours.

#### Example response:
```json
[
  { "id": 0, "name": "Hiking", "price": 99.99 },
  { "id": 1, "name": "Swimming", "price": 59.99 },
  { "id": 2, "name": "Cycling", "price": 79.99 }
]
```

### GET /tours/{id}
Retrieve details of a specific tour by its ID.

#### Example response:
```json
{
  "id": 1,
  "name": "Swimming",
  "price": 59.99
}
```

### DELETE /tours/{id}
Initiate an asynchronous deletion of a tour. The deletion is confirmed after 10 seconds unless canceled.

#### Example response:
```json
{
  "message": "Tour with id 1 is pending deletion. It will be confirmed after 10 seconds unless cancelled.",
  "pendingDeletion": true
}
```

### POST /tours/{id}/cancel
Cancel a pending deletion of a tour.

#### Example response:
```json
{
  "message": "Deletion of tour with id 1 has been cancelled."
}
```

### GET /tours/{id}/status
Check the status of the deletion process for a tour.

#### Example response (pending deletion):
```json
{
  "message": "Tour with id 1 is currently pending deletion.",
  "status": "pending"
}
```

#### Example response (available or already deleted):
```json
{
  "message": "Tour with id 1 is not pending deletion and is currently available.",
  "status": "available"
}

```


