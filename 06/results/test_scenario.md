# Test Scenario for FlightBookingService 

## Prerequisites
Ensure that the gRPC server is running on localhost:8000. 

```bash
node server.js
```

# Test cases

The test cases should cover this simple scenario:

1. Check the inital state
2. Add a booking
3. Check the state
4. Update the booking
5. Check the state
6. Remove the booking
7. Check the state


### Check initial state

**Command**
```bash
grpcurl -plaintext -d '{}' localhost:8000 flights.FlightBookingService/ListBookings
```
**Output**
```bash
{}
```

### Add a booking

**Command**
```bash
grpcurl -plaintext -d '{
    "booking": {
        "passenger": {
            "firstName": "Jakub",
            "lastName": "Samanek",
            "passportNumber": "P12345678"
        },
        "departureAirport": "PRG",
        "arrivalAirport": "JFK",
        "departureDate": "2024-12-15",
        "arrivalDate": "2024-12-15"
    }
}' localhost:8000 flights.FlightBookingService/AddBooking

```
**Output**
```bash
{
  "success": true,
  "message": "Booking successfully added!",
  "booking": {
    "id": "booking_195",
    "passenger": {
      "firstName": "Jakub",
      "lastName": "Samanek",
      "passportNumber": "P12345678"
    },
    "departureAirport": "PRG",
    "arrivalAirport": "JFK",
    "departureDate": "2024-12-15",
    "arrivalDate": "2024-12-15"
  }
}
```

### Check the state

**Command**
```bash
grpcurl -plaintext -d '{}' localhost:8000 flights.FlightBookingService/ListBookings
```
**Output**
```bash
{
  "bookings": [
    {
      "id": "booking_195",
      "passenger": {
        "firstName": "Jakub",
        "lastName": "Samanek",
        "passportNumber": "P12345678"
      },
      "departureAirport": "PRG",
      "arrivalAirport": "JFK",
      "departureDate": "2024-12-15",
      "arrivalDate": "2024-12-15"
    }
  ]
}
```

### Update the booking

**Command**
```bash
grpcurl -plaintext -d '{
    "booking": {
        "id": "booking_195",
        "passenger": {
            "firstName": "Jakub",
            "lastName": "Samanek",
            "passportNumber": "P12345678"
        },
        "departureAirport": "PRG",
        "arrivalAirport": "LHR",
        "departureDate": "2024-12-14",
        "arrivalDate": "2024-12-15"
    }
}' localhost:8000 flights.FlightBookingService/UpdateBooking
```
**Output**
```bash
{
  "success": true,
  "message": "Booking successfully updated!",
  "booking": {
    "id": "booking_195",
    "passenger": {
      "firstName": "Jakub",
      "lastName": "Samanek",
      "passportNumber": "P12345678"
    },
    "departureAirport": "PRG",
    "arrivalAirport": "LHR",
    "departureDate": "2024-12-14",
    "arrivalDate": "2024-12-15"
  }
}
```

### Check the state

**Command**
```bash
grpcurl -plaintext -d '{}' localhost:8000 flights.FlightBookingService/ListBookings
```
**Output**
```bash
{
  "bookings": [
    {
      "id": "booking_195",
      "passenger": {
        "firstName": "Jakub",
        "lastName": "Samanek",
        "passportNumber": "P12345678"
      },
      "departureAirport": "PRG",
      "arrivalAirport": "LHR",
      "departureDate": "2024-12-14",
      "arrivalDate": "2024-12-15"
    }
  ]
}
```

### Remove a booking

**Command**
```bash
grpcurl -plaintext -d '{"bookingId": "booking_195"}' localhost:8000 flights.FlightBookingService/RemoveBooking
```
**Output**
```bash
{
  "success": true,
  "message": "Booking successfully removed!"
}
```

### Check the state

**Command**
```bash
grpcurl -plaintext -d '{}' localhost:8000 flights.FlightBookingService/ListBookings
```
**Output**
```bash
{}
```


