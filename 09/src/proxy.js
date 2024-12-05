const http = require('http');
const express = require("express");
const { startMonitoring, getHealthyServices } = require("./healthMonitor");

const app = express();
const PORT = 8888;

// Start monitoring service in the background
startMonitoring();

currentIndex = 0;
app.get("/list", async (req, res) => {
    const healthyServices = getHealthyServices();

    if (healthyServices.length === 0) {
        res.status(503).send("No healthy services available");
        return;
    }

        // Select a service using round-robin
        const service = healthyServices[currentIndex];
        currentIndex = (currentIndex + 1) % healthyServices.length;

        console.log(`Sending request to ${service}`);
        const connector = http.request(
            service,
            { method: "GET", headers: req.headers },
            (resp) => {
                res.writeHead(resp.statusCode, resp.headers);
                resp.pipe(res);
            }
        );

        connector.on("error", (err) => {
            res.status(500).send("Error forwarding request");
        });

        req.pipe(connector);
});

app.listen(PORT, () => {
    console.log(`Proxy server running at http://localhost:${PORT}`);
});
