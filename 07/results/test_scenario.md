# Simple test scenario

## Prerequisites
Ensure both services are running.

```bash
node payment_service.js
node validation_service.js
```

# Test cases

The test cases should cover this simple scenario:

1. Check the inital state (no payments)
2. Add a payment (valid details)
3. Check the state
4. Add a payment (invalid details)
5. Check the state

### Check initial state

**Command**
```bash
grpcurl -plaintext -d '{}' localhost:8000 payment.PaymentService/ListPayments
```
**Output**
```bash
{}
```

### Add a payment (valid details)

**Command**
```bash
grpcurl -plaintext -d '{                                                     
    "cardNumber": "1234-1234-1234-1234",
    "cardOwner": "CardOwner",
    "orderId": "order_001"
}' localhost:8000 payment.PaymentService/AddPayment
```
**Output**
```bash
{
  "success": true,
  "message": "Payment added!",
  "payment": {
    "id": "payment_9978",
    "cardNumber": "1234-1234-1234-1234",
    "cardOwner": "CardOwner",
    "orderId": "order_001"
  }
}
```

### Check the state

**Command**
```bash
grpcurl -plaintext -d '{}' localhost:8000 payment.PaymentService/ListPayments
```
**Output**
```bash
{
  "payments": [
    {
      "id": "payment_9978",
      "cardNumber": "1234-1234-1234-1234",
      "cardOwner": "CardOwner",
      "orderId": "order_001"
    }
  ]
}
```

### Add a payment (invalid details)

**Command**
```bash
grpcurl -plaintext -d '{                                                     
    "cardNumber": "1234-1234-1234-9999",
    "cardOwner": "InvalidOwner",
    "orderId": "order_002"
}' localhost:8000 payment.PaymentService/AddPayment
```
**Output**
```bash
{
  "message": "Invalid card information."
}
```

### Check the state

**Command**
```bash
grpcurl -plaintext -d '{}' localhost:8000 payment.PaymentService/ListPayments
```
**Output (same as before)**
```bash
{
  "payments": [
    {
      "id": "payment_9978",
      "cardNumber": "1234-1234-1234-1234",
      "cardOwner": "CardOwner",
      "orderId": "order_001"
    }
  ]
}
```