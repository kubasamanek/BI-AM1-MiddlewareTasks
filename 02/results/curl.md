# cURL Task

## Command:

Initial connection, saving cookie to a file cookie.txt.
```bash
kate@am1-samanjak:~/workspace/samanjak/02$ curl -c cookie.txt http://http-test/curl
Next step is /curl-get 
set the cookie header according to the session cookie
Set Accept header to text/plain
Send query parameter: data=aqua_mink
```
Sending GET request with specified query parameter data=aqua_mink, using session cookie stored in cookie.txt file.
```bash
kate@am1-samanjak:~/workspace/samanjak/02$ curl -X GET "http://http-test/curl-get?data=aqua_mink" \
     -H "Accept: text/plain" \
     -b cookie.txt
Next step is /curl-post
set the cookie header according to the session cookie
Set Accept header to application/json
Send POST data: data=chocolate_alligator
```
POST request with data=chocolate_alligator, with headers Accept and Content-Type and again the session cookie.
```bash
kate@am1-samanjak:~/workspace/samanjak/02$ curl -X POST "http://http-test/curl-post" \
     -H "Accept: application/json" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -b cookie.txt \
     --data "data=chocolate_alligator"
Next step is /curl-content
set the cookie header according to the session cookie
Set Accept header to text/html
Set Content-Type header to chocolate_bovid
```
GET request to /curl-content.
```bash
kate@am1-samanjak:~/workspace/samanjak/02$ curl -X GET "http://http-test/curl-content" \
     -H "Accept: text/html" \
     -H "Content-Type: chocolate_bovid" \
     -b cookie.txt
Next step is /curl-ua
set the cookie header according to the session cookie
Set Accept-language header to en-US
Set User-Agent header to curl-coral_orca
```
GET request to /curl-ua
```bash
kate@am1-samanjak:~/workspace/samanjak/02$ curl -X GET "http://http-test/curl-ua" \
     -H "Accept-Language: en-US" \
     -H "User-Agent: curl-coral_orca" \
     -b cookie.txt
Next step is /curl-cookie
set the cookie header according to the session cookie
Set additional cookie data=maroon_swordtail
```
GET request to /curl-cookie with additional cookie data=maroon_swordtail
```bash
kate@am1-samanjak:~/workspace/samanjak/02$ curl -X GET "http://http-test/curl-cookie" \
     -H "Cookie: data=maroon_swordtail" \
     -b cookie.txt
Next step is /curl-auth
Use HTTTP DELETE method
set the cookie header according to the session cookie
Authenticate with following credentials coral_zebra:white_rhinoceros
```
HTTP DELETE request to /curl-auth with authentification.
```bash
kate@am1-samanjak:~/workspace/samanjak/02$ curl -X DELETE "http://http-test/curl-auth" \
     -u coral_zebra:white_rhinoceros \
     -b cookie.txt
All completed.
Your final results is tan_tapir
```

Final results is *tan_tapir*.