# This is update version of the Gitee python code (from 2.x upgrade to 3.x)

```python
import time
import hmac
import hashlib
import base64
from urllib.parse import quote


timestamp = int(round(time.time() * 1000))

secret = 'this is secret'

secret_enc = bytes(secret, 'utf-8')

string_to_sign = f"{timestamp}\n{secret}"

string_to_sign_enc = bytes(string_to_sign, 'utf-8')

hmac_code = hmac.new(secret_enc, string_to_sign_enc, digestmod=hashlib.sha256).digest()

sign = quote(base64.b64encode(hmac_code))

print(timestamp)
print(sign)

```
