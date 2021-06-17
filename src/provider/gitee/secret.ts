// src/provider/gitee/secret.ts
// see here: https://gitee.com/help/articles/4290#article-header3
import crypto from 'crypto'

//creating hmac object
var hmac = crypto.createHmac('sha256', 'yoursecretkeyhere');
//passing the data to be hashed
data = hmac.update('nodejsera');
//Creating the hmac in the required format
gen_hmac= data.digest('hex');
//Printing the output on the console
console.log("hmac : " + gen_hmac);
