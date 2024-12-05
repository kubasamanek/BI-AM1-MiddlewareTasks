# MS - Message Forwarding

This project demonstrates the use of RabbitMQ for routing messages between producers and consumers using queues.

## Components

### Producer
Interactive console producer which accepts booking and trip orders. 

Can be run using:
```bash
node producer.js
```

It accepts orders in JSON format, examples are in [test_inputs.txt](src/data/test_inputs.txt). 
Those orders are then processed and sent to **Exchange**. In the task, there's a queue in place of exchange, but I decided an exchange fits here quite well and wanted to give it a try. 

### Exchange
- name: `orders_exchange`
- type: `direct`

Exchange routes the messages from producer to queues based on a routing key, which is the type of order - booking or trip.

### Queues
There are two queues:
- `booking_orders`
    - key: `booking`
- `trip_orders`
    - key: `trip`

Exchange routes the messages to those queues.

### Processors
Can be run in separate terminals using:
```bash
node tripProcessor.js
node bookingProcessor.js
```
They consume the queues and simualate processing the orders by printing them to console.
If there are already messages in the queue, they will consume them first upon startup.

# Test Run
In [LOGS](results/logs.md), you can find example scenario logs. 

There's also a test run script, which starts a producer, produces several messages from [test_inputs.txt](src/data/test_inputs.txt) and exits. 
