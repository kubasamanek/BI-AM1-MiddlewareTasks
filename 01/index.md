# Booking Transformation Microservice

## Overview
This is a simple Spring Boot microservice that transforms a plain text booking request into JSON format. It runs as a standard Spring Boot application and exposes a REST API for receiving and transforming booking data.

## How to Run
1. **Build the project** using Gradle from src folder:
   ```bash
   ./gradlew build
   ```
2. **Run the application**:
   ```bash
   ./gradlew bootRun
   ```

The application will start and be accessible at http://localhost:8080.

## How to Use
The API accepts a plain text input via a POST request and returns the transformed booking details in JSON format.

**Endpoint:** POST /transform/booking

**Content-Type:** text/plain

### Example Input:
 ```plaintext
Dear Sir or Madam,

please find the details about my booking below:

===
Tour id: "1"
Location: "Bohemian Switzerland"
Person: "Jan Novak"
===

Regards,
Jan Novak
```

### Example Output:
 ```json
 {
  "id": "1",
  "location": "Bohemian Switzerland",
  "person": {
    "name": "Jan",
    "surname": "Novak"
  }
}
```
## Example Request via cURL
Sending plain text directly:
 ```bash
 curl -X POST http://localhost:8080/transform/booking \
     -H "Content-Type: text/plain" \
     --data 'Dear Sir or Madam,

please find the details about my booking below:

===
Tour id: "1"
Location: "Bohemian Switzerland"
Person: "Jan Novak"
===

Regards,
Jan Novak'

  ```

Sending text from a .txt file:
 ```bash
 curl -X POST http://localhost:8080/transform/booking \
     -H "Content-Type: text/plain" \
     --data @data/test1.txt
 ```

## Test Data and Results
Some test data are stored in /data folder. Results of these test data are stored in results folder. 

## How it works
This microservice is built using Spring Boot. The service listens for POST requests at the /transform/booking endpoint, parses the plain text input, and returns the corresponding booking information as JSON. The application runs as a standalone service using Spring Boot’s embedded Tomcat server.