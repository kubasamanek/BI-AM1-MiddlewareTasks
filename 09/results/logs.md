# Running proxy
Proxy runs on port 8888
```bash
node proxy.js
```

Proxy will then print our healthy services each 3 seconds.

Output:
```bash
Healthy services: [
  'http://http-lb/list1',
  'http://http-lb/list2',
  'http://http-lb/list3'
]
Healthy services: [
  'http://http-lb/list1',
  'http://http-lb/list2',
  'http://http-lb/list3'
]
Healthy services: [
  'http://http-lb/list1',
  'http://http-lb/list2',
  'http://http-lb/list3'
]
```

# Calling list endpoint
```bash
curl http://localhost:8888/list
```

Output:
```bash
[{"name":"Prague Castle","capacity":30,"booked":15},{"name":"Karlstejn Castle","capacity":25,"booked":20},{"name":"Kutna Hora","capacity":20,"booked":10},{"name":"Cesky Krumlov","capacity":30,"booked":15},{"name":"Karlovy Vary","capacity":25,"booked":20},{"name":"Pilsen","capacity":20,"booked":10}]
```

Round-Robin in action:

Output in proxy terminal when spamming requests:
```bash
Healthy services: [
  'http://http-lb/list1',
  'http://http-lb/list2',
  'http://http-lb/list3'
]
Sending request to http://http-lb/list3
Sending request to http://http-lb/list1
Sending request to http://http-lb/list2
Sending request to http://http-lb/list3
Sending request to http://http-lb/list1
Sending request to http://http-lb/list2
Sending request to http://http-lb/list3
Healthy services: [
  'http://http-lb/list1',
  'http://http-lb/list2',
  'http://http-lb/list3'
]
```