# Task 5 - Tours Management Service with Conditional GET Support

This is a simple RESTful API built with **Express.js** to manage a list of tours. The service supports Conditional GET requests for HTTP caching using `Last-Modified` and `ETag` headers, with both strong and weak ETags. 

## Setup

Install dependencies
```bash
npm install
```

Start the server
```bash
cd src
node app.js
```

The server will run on http://localhost:3000.

## Endpoints

#### GET /tours
Retrieve a list of all available tours. This endpoint supports Conditional GET requests with Last-Modified, ETag, and Cache-Control headers.

**Example request**
```bash
curl -i http://localhost:3000/tours
```

**Expected Response:**
```http
HTTP/1.1 200 OK
X-Powered-By: Express
Cache-Control: private, max-age=200
Last-Modified: Sun, 27 Oct 2024 09:21:54 GMT
ETag: c8d10e4e9b36c2ebd0581b46c2236b40
Content-Type: application/json; charset=utf-8
Content-Length: 75
Date: Sun, 27 Oct 2024 10:05:36 GMT
Connection: close

[
  {
    "id": 1,
    "name": "aaa",
    "customers": []
  },
  {
    "id": 2,
    "name": "bbb",
    "customers": []
  }
]
```

#### Conditional GET with If-None-Match (Strong ETag)
After receiving the ETag from the initial request, you can use it in the If-None-Match header for a conditional GET. If the resource hasn’t changed, the server responds with 304 Not Modified.

**Example request**
```bash
curl -i http://localhost:3000/tours -H "If-None-Match: c8d10e4e9b36c2ebd0581b46c2236b40"
```

**Expected Response: (if not modified)**
```http
HTTP/1.1 304 Not Modified
X-Powered-By: Express
Cache-Control: private, max-age=200
Last-Modified: Sun, 27 Oct 2024 09:21:54 GMT
ETag: c8d10e4e9b36c2ebd0581b46c2236b40
Date: Sun, 27 Oct 2024 10:05:58 GMT
Connection: close
```

#### Conditional GET with If-None-Match (Weak ETag)
Use `?weak=true` in the URL to generate a weak ETag.

**Example request**
```bash
curl -i 'http://localhost:3000/tours?weak=true' -H "If-None-Match: W/8f3bc8a6718aad66f63990a7a7368183"
```

**Expected Response: (if not modified)**
```http
HTTP/1.1 304 Not Modified
X-Powered-By: Express
Cache-Control: private, max-age=200
Last-Modified: Sun, 27 Oct 2024 09:21:54 GMT
ETag: W/8f3bc8a6718aad66f63990a7a7368183
Date: Sun, 27 Oct 2024 10:10:11 GMT
Connection: close
```

#### Conditional GET with Last-Modified
If the client sends the `If-Modified-Since` header with the last known modification date, the server will respond with 304 Not Modified if no updates occurred since that date.

Example Request (If-Modified-Since > Last-Modified):
```bash
curl -i http://localhost:3000/tours -H "If-Modified-Since: Sun, 27 Oct 2024 09:21:56 GMT"
```

**Expected Response: (if not modified)**
```http
HTTP/1.1 304 Not Modified
X-Powered-By: Express
Cache-Control: private, max-age=200
Last-Modified: Sun, 27 Oct 2024 09:21:54 GMT
ETag: c8d10e4e9b36c2ebd0581b46c2236b40
Date: Sun, 27 Oct 2024 10:11:28 GMT
Connection: close
```

## Test requests
In test.http, there are multiple GET requests to test the service. The Last-Modified date has been set to a constant value to ensure that tests work consistently every time. This value is:
```javascript
let lastModifiedDate = "Sun, 27 Oct 2024 09:21:54 GMT";
```

## Overview
This service demonstrates HTTP caching principles using Conditional GET requests. By utilizing Last-Modified, strong ETags and weak ETags, this API efficiently manages data retrieval.