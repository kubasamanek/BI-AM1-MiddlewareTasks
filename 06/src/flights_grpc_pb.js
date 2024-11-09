// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var flights_pb = require('./flights_pb.js');

function serialize_flights_AddBookingRequest(arg) {
  if (!(arg instanceof flights_pb.AddBookingRequest)) {
    throw new Error('Expected argument of type flights.AddBookingRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_flights_AddBookingRequest(buffer_arg) {
  return flights_pb.AddBookingRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_flights_GeneralReply(arg) {
  if (!(arg instanceof flights_pb.GeneralReply)) {
    throw new Error('Expected argument of type flights.GeneralReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_flights_GeneralReply(buffer_arg) {
  return flights_pb.GeneralReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_flights_ListBookingsReply(arg) {
  if (!(arg instanceof flights_pb.ListBookingsReply)) {
    throw new Error('Expected argument of type flights.ListBookingsReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_flights_ListBookingsReply(buffer_arg) {
  return flights_pb.ListBookingsReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_flights_ListBookingsRequest(arg) {
  if (!(arg instanceof flights_pb.ListBookingsRequest)) {
    throw new Error('Expected argument of type flights.ListBookingsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_flights_ListBookingsRequest(buffer_arg) {
  return flights_pb.ListBookingsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_flights_RemoveBookingRequest(arg) {
  if (!(arg instanceof flights_pb.RemoveBookingRequest)) {
    throw new Error('Expected argument of type flights.RemoveBookingRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_flights_RemoveBookingRequest(buffer_arg) {
  return flights_pb.RemoveBookingRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_flights_UpdateBookingRequest(arg) {
  if (!(arg instanceof flights_pb.UpdateBookingRequest)) {
    throw new Error('Expected argument of type flights.UpdateBookingRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_flights_UpdateBookingRequest(buffer_arg) {
  return flights_pb.UpdateBookingRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var FlightBookingServiceService = exports.FlightBookingServiceService = {
  listBookings: {
    path: '/flights.FlightBookingService/ListBookings',
    requestStream: false,
    responseStream: false,
    requestType: flights_pb.ListBookingsRequest,
    responseType: flights_pb.ListBookingsReply,
    requestSerialize: serialize_flights_ListBookingsRequest,
    requestDeserialize: deserialize_flights_ListBookingsRequest,
    responseSerialize: serialize_flights_ListBookingsReply,
    responseDeserialize: deserialize_flights_ListBookingsReply,
  },
  addBooking: {
    path: '/flights.FlightBookingService/AddBooking',
    requestStream: false,
    responseStream: false,
    requestType: flights_pb.AddBookingRequest,
    responseType: flights_pb.GeneralReply,
    requestSerialize: serialize_flights_AddBookingRequest,
    requestDeserialize: deserialize_flights_AddBookingRequest,
    responseSerialize: serialize_flights_GeneralReply,
    responseDeserialize: deserialize_flights_GeneralReply,
  },
  removeBooking: {
    path: '/flights.FlightBookingService/RemoveBooking',
    requestStream: false,
    responseStream: false,
    requestType: flights_pb.RemoveBookingRequest,
    responseType: flights_pb.GeneralReply,
    requestSerialize: serialize_flights_RemoveBookingRequest,
    requestDeserialize: deserialize_flights_RemoveBookingRequest,
    responseSerialize: serialize_flights_GeneralReply,
    responseDeserialize: deserialize_flights_GeneralReply,
  },
  updateBooking: {
    path: '/flights.FlightBookingService/UpdateBooking',
    requestStream: false,
    responseStream: false,
    requestType: flights_pb.UpdateBookingRequest,
    responseType: flights_pb.GeneralReply,
    requestSerialize: serialize_flights_UpdateBookingRequest,
    requestDeserialize: deserialize_flights_UpdateBookingRequest,
    responseSerialize: serialize_flights_GeneralReply,
    responseDeserialize: deserialize_flights_GeneralReply,
  },
};

exports.FlightBookingServiceClient = grpc.makeGenericClientConstructor(FlightBookingServiceService);
