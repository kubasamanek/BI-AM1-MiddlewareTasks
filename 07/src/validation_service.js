const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const reflection = require('grpc-node-server-reflection');

const packageDefinition = protoLoader.loadSync("protos/card.proto", {});
const cardProto = grpc.loadPackageDefinition(packageDefinition).card;

function ValidateCard(call, callback) {
    card_number = call.request.cardNumber;
    card_owner = call.request.cardOwner;

    // Validate the card information
    if (card_number === "1234-1234-1234-1234" && card_owner === "CardOwner") {
        callback(null, { value: true });  
    } else {
        callback(null, { value: false }); 
    }
}

function main() {
    const server = reflection.default(new grpc.Server()); 

    server.addService(cardProto.CardValidationService.service, { 
        ValidateCard : ValidateCard 
    });
    
    server.bindAsync('0.0.0.0:8080', grpc.ServerCredentials.createInsecure(), () => {
        console.log('CardValidationService running on port 8080');
    });
}

main();
