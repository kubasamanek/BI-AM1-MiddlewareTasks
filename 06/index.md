# gRPC Flight Booking Service Documentation

FlightBookingService is a gRPC-based service designed to manage flight bookings. This service allows clients to perform basic CRUD operations on flight booking data.

The service provides the following operations:

- ListBookings: Retrieve a list of all current flight bookings.
- AddBooking: Add a new booking to the system.
- UpdateBooking: Modify an existing booking's details.
- RemoveBooking: Delete a booking from the system by its unique identifier.

##  How to Use the Service

You can start the server using node.js
```bash
node server.js
```

The service is then deployed on `localhost:8000` and can be accessed using gRPC client (e.g. `grpcurl`).
Each operation requires specific data structures defined in `flighs.proto` file.

# Test Scenario

A simple test scenario for FlightBookingService has been documented in [test_scenario.md](results/test_scenario.md). This document is a walkthrough of the scenario describing commands and their outputs. 

- Checking Initial State: Ensuring the service starts with an empty list of bookings.
- Adding a Booking: Verifying the addition of a new booking.
- Updating a Booking: Ensuring an existing booking's information can be updated.
- Removing a Booking: Verifying that a booking can be deleted.
- Checking Final State: Ensuring the booking list reflects changes accurately after each operation.