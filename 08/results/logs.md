# Start processors
Run these commands in separate terminals.
```bash
cd src
node bookingProcessor.js
node tripProcessor.js
```

Output:
```
Connecting to RabbitMQ at amqp://samanjak:samanjak@rabbitmq-api:5672/samanjak...
Connection established!
[X] Waiting for booking orders in 'booking_orders'...
```
```
Connecting to RabbitMQ at amqp://samanjak:samanjak@rabbitmq-api:5672/samanjak...
Connection established!
[X] Waiting for trip orders in 'trip_orders'...
```

# Start producer
```bash
cd src
node producer.js
```

Interactive console opens:
```bash
Connecting to RabbitMQ at amqp://samanjak:samanjak@rabbitmq-api:5672/samanjak...
Connection and channel established!
Enter order JSON (or type 'exit' to quit): {"type":"booking","details":{"customer":"John Doe","tripId":123}}
[x] Order sent to exchange with routing key 'booking': { type: 'booking', details: { customer: 'John Doe', tripId: 123 } }

Enter order JSON (or type 'exit' to quit): {"type":"trip","details":{"tripName":"Safari","destination":"Kenya"}}
[x] Order sent to exchange with routing key 'trip': { type: 'trip', details: { tripName: 'Safari', destination: 'Kenya' } }

Enter order JSON (or type 'exit' to quit): exit
Exiting...
Connection closed.
```

# Processors processing:
Processors are receiving the orders.

Trip Processor:
```bash
[X] Waiting for trip orders in 'trip_orders'...
[x] Processed trip order: { type: 'trip', details: { tripName: 'Safari', destination: 'Kenya' } }
```

Booking Processor:
```bash
[X] Waiting for booking orders in 'booking_orders'...
[x] Processed booking order: { type: 'booking', details: { customer: 'John Doe', tripId: 123 } }
```

# Test run
To run a test run, run both processors and run
```bash
./run_test.sh
```

It will run the producer, send all messages in data/test_inputs.txt and exit.
See output in processors:

Trip Processor:
```bash
Connecting to RabbitMQ at amqp://samanjak:samanjak@rabbitmq-api:5672/samanjak...
Connection established!
[X] Waiting for trip orders in 'trip_orders'...
[x] Processed trip order: {
  type: 'trip',
  details: { tripName: 'Everest', destination: 'Nepal' }
}
[x] Processed trip order: { type: 'trip', details: { tripName: 'Safari', destination: 'Kenya' } }
[x] Processed trip order: {
  type: 'trip',
  details: { tripName: 'Explore Prague', destination: 'Prague', price: 1500 }
}
```

Booking Processor:
```bash
Connecting to RabbitMQ at amqp://samanjak:samanjak@rabbitmq-api:5672/samanjak...
Connection established!
[X] Waiting for booking orders in 'booking_orders'...
[x] Processed booking order: { type: 'booking', details: { customer: 'John Doe', tripId: 123 } }
[x] Processed booking order: {
  type: 'booking',
  details: { customer: 'Jakub Samanek', tripId: 456 }
}
[x] Processed booking order: {
  type: 'booking',
  details: {
    customer: 'Pepa Vomacka',
    tripId: 789,
    travelers: [ 'Pani', 'Vomackova' ]
  }
}
[x] Processed booking order: {
  type: 'booking',
  details: {
    customer: 'Honza Krepelka',
    tripId: 321,
    preferences: { seat: 'window', meal: 'meat' }
  }
}
```