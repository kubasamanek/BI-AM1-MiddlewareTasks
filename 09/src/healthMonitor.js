const axios = require("axios");

const services = [
    { list: "http://http-lb/list1", health: "http://http-lb/health1" },
    { list: "http://http-lb/list2", health: "http://http-lb/health2" },
    { list: "http://http-lb/list3", health: "http://http-lb/health3" },
];

let healthyServices = [];

async function checkHealth() {
    healthyServices = [];
    for (const service of services) {
        const response = await axios.get(service.health);
        if (response.status === 200) {
            healthyServices.push(service.list);
        }
    }
    console.log("Healthy services:", healthyServices);
}

function startMonitoring() {
    setInterval(checkHealth, 3000);
}

function getHealthyServices() {
    return healthyServices;
}

module.exports = { startMonitoring, getHealthyServices };
