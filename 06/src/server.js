const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const reflection = require('grpc-node-server-reflection');

const packageDefinition = protoLoader.loadSync('flights.proto', {})
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const flightsPackage = grpcObject.flights;

const bookings = {};

function generateRandomId() {
    return 'booking_' + Math.floor(Math.random() * 1000);
}

function ListBookings(call, callback) {
    callback(null, { bookings: Object.values(bookings) })
}

function AddBooking(call, callback) {
    const booking = call.request.booking;
    booking.id = generateRandomId();
    bookings[booking.id] = booking;
    callback(null, { success: true, message: "Booking successfully added!", booking: booking });
}

function RemoveBooking(call, callback) {
    if (bookings[call.request.bookingId]) {  
        delete bookings[call.request.bookingId];
        callback(null, { success: true, message: "Booking successfully removed!" });
    } else {
        callback(null, { success: false, message: "Booking not found." });
    }
}

function UpdateBooking(call, callback) {
    const newBooking = call.request.booking;
    if(bookings[newBooking.id]){
        bookings[newBooking.id] = newBooking;
        callback(null, { success: true, message: "Booking successfully updated!", booking: bookings[newBooking.id] });
    } else {
        callback(null, { success: false, message: "Booking not found." })
    }
}

function main() {
    const server = reflection.default(new grpc.Server());

    server.addService(flightsPackage.FlightBookingService.service, {
        ListBookings: ListBookings,
        AddBooking: AddBooking,
        RemoveBooking: RemoveBooking,
        UpdateBooking: UpdateBooking,
    });

    server.bindAsync('0.0.0.0:8000', grpc.ServerCredentials.createInsecure(), () => {
        console.log('Server running on port 8000');
    });
}

main();