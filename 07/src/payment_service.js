const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const reflection = require('grpc-node-server-reflection');

const paymentProtoPath = './protos/payment.proto';
const paymentPackageDefinition = protoLoader.loadSync(paymentProtoPath, {});
const paymentProto = grpc.loadPackageDefinition(paymentPackageDefinition).payment;

const cardProtoPath = './protos/card.proto';
const cardPackageDefinition = protoLoader.loadSync(cardProtoPath, {keepCase: true});
const cardProto = grpc.loadPackageDefinition(cardPackageDefinition).card;

const payments = [];

const cardClient = new cardProto.CardValidationService('localhost:8080', grpc.credentials.createInsecure());

function generatePaymentId() {
    return 'payment_' + Math.floor(Math.random() * 10000);
}

function ListPayments(_, callback) {
    callback(null, { payments });
}

function AddPayment(call, callback) {
    const card_number = call.request.cardNumber;
    const card_owner = call.request.cardOwner;
    const order_id = call.request.orderId;

    cardClient.validateCard({
        card_number: card_number, 
        card_owner: card_owner
    }, (error, response) => {
        if (error) {
            console.error("Validation failed: ", error);
            return callback(null, { success: false, message: "Card validation failed.", payment: null });
        }

        if (response.value) {
            const id = generatePaymentId();
            const new_payment = {
                id: id,
                cardNumber: card_number,
                cardOwner: card_owner,
                orderId: order_id
            };
            payments.push(new_payment);

            callback(null, { success: true, message: "Payment added!", payment: new_payment });
        } else {
            callback(null, { success: false, message: "Invalid card information.", payment: null });
        }
    });
}


function main() {
    const server = reflection.default(new grpc.Server()); 

    server.addService(paymentProto.PaymentService.service, {
        ListPayments : ListPayments,
        AddPayment : AddPayment
    });

    server.bindAsync('0.0.0.0:8000', grpc.ServerCredentials.createInsecure(), () => {
        console.log('PaymentService running on port 8000');
    });
}

main();