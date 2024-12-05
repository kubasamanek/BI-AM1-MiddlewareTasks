# Simple Load Balancer
This task implements a very simple load balancer for a travel agency. The service runs a monitoring in the background, checks health of available endpoints and forwards requests to healthy services using proxy. The load balancer uses round-robin algorithm.

## How it works
- Regular checks on /health endpoints of each service using background monitoring check
- Healthy endpoints are kept in a list
- Whenever a request to `/list` endpoint comes in, it is forwarded to one of the healthy services
- If no healthy services available, load balancer responds with 503
- Requests are distributed using Round-Robin

# How to run

Start the service, it will start monitoring service in the background as well.
```bash
node proxy.js
```

Test the service:
```bash
curl http://localhost:9999/list
```

# Logs
More logs can be found in [logs.md](results/logs.md).