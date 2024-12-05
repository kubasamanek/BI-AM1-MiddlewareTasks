const amqp = require('amqplib');
const readline = require('readline');

const username = 'samanjak';
const password = 'samanjak';
const host = 'samanjak';
const amqpUrl = `amqp://${username}:${password}@rabbitmq-api:5672/${host}`;

let connection;
let channel;
const exchange = 'orders_exchange';

async function setupConnection() {
    try {
        console.log(`Connecting to RabbitMQ at ${amqpUrl}...`);
        connection = await amqp.connect(amqpUrl);
        channel = await connection.createChannel();
        console.log("Connection and channel established!");

        await channel.assertExchange(exchange, 'direct', { durable: true });
    } catch (error) {
        console.error("Failed to set up connection:", error.message);
        process.exit(1);
    }
}

async function closeConnection() {
    try {
        if (channel) await channel.close();
        if (connection) await connection.close();
        console.log("Connection closed.");
    } catch (error) {
        console.error("Error closing connection:", error.message);
    }
}

async function produceOrder(order) {
    try {
        const routingKey = order.type;

        // Publish the message to the exchange, which then redirects it to the correct queue
        channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(order)), { persistent: true });
        console.log(`[x] Order sent to exchange with routing key '${routingKey}':`, order);
    } catch (error) {
        console.error("Error publishing order:", error.message);
    }
}

async function startProducer() {
    await setupConnection();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Enter order JSON (or type 'exit' to quit): "
    });

    rl.prompt();

    rl.on('line', async (line) => {
        if (line.trim().toLowerCase() === 'exit') {
            console.log("Exiting...");
            rl.close();
            return;
        }

        try {
            const order = JSON.parse(line);
            await produceOrder(order);
        } catch (error) {
            console.error("Invalid JSON input:", error.message);
        }

        rl.prompt();
    });

    rl.on('close', async () => {
        await closeConnection();
        process.exit(0);
    });
}

startProducer();
