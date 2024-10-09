# Telnet POST Request Log

## Command:

Open connection
```bash
kate@am1-samanjak:~/workspace/samanjak/02$ telnet http-test 80
Trying 10.110.245.245...
Connected to http-test.
Escape character is '^]'.
```
Send the POST request
```bash
POST /telnet-post HTTP/1.1
Host: http-test
Content-Type: application/x-www-form-urlencoded
Content-Length: 9
Connection: close

data=demo
```

## Response:

```bash
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 8
ETag: W/"8-dXhL+dZa+6eJcfS5odhJYRmSCDc"
Date: Wed, 09 Oct 2024 07:10:50 GMT
Connection: close

All goodConnection closed by foreign host.
```
