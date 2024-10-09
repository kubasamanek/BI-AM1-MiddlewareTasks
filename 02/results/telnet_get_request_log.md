# Telnet GET Request Log

## Command:

Open connection
```bash
kate@am1-samanjak:~/workspace/samanjak/02$ telnet http-test 80
Trying 10.110.245.245...
Connected to http-test.
Escape character is '^]'.
```
Send the GET request
```bash
GET /telnet-get HTTP/1.1
Host: http-test
User-Agent: telnet-client
Accept: text/html
Connection: close
```

## Response:

```bash
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 8
ETag: W/"8-dXhL+dZa+6eJcfS5odhJYRmSCDc"
Date: Wed, 09 Oct 2024 07:02:15 GMT
Connection: close

All goodConnection closed by foreign host.
```
