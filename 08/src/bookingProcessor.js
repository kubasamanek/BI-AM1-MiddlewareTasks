const amqp = require('amqplib');

const username = 'samanjak';
const password = 'samanjak';
const host = 'samanjak';
const amqpUrl = `amqp://${username}:${password}@rabbitmq-api:5672/${host}`;

async function processBookings() {
    try {
        console.log(`Connecting to RabbitMQ at ${amqpUrl}...`);
        const connection = await amqp.connect(amqpUrl);
        const channel = await connection.createChannel();
    
        console.log("Connection established!");
    
        const queue = 'booking_orders';
        const exchange = 'orders_exchange';
        const routingKey = 'booking';
    
        await channel.assertExchange(exchange, 'direct', { durable: true });
        await channel.assertQueue(queue, { durable: true });
    
        // Bind the queue to the exchange with the routing key
        await channel.bindQueue(queue, exchange, routingKey);
    
        console.log(`[X] Waiting for booking orders in '${queue}'...`);
        channel.consume(queue, (msg) => {
            if (msg) {
                const order = JSON.parse(msg.content.toString());
                console.log(`[x] Processed booking order:`, order);
    
                channel.ack(msg);
            }
        });
    } catch(error){
        console.error("Error when processing a booking:", error.message);
    }
}

processBookings();