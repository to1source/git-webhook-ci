// src/provider/gitee/secret.ts
// see here: https://gitee.com/help/articles/4290#article-header3

import { createHmac } from 'crypto'

/**
 * create the secret key to compare
 * @param {string} secretKey the secret key set during sestting up the webhook
 * @param {number} timestamp this timestamp send from the git provider server
 */
export function verifyKeyFn(secretKey: string, timestamp: number): string {
  const secret_enc = Buffer.from(secret, 'utf8')
  const string_to_sign = `${timestamp}\n${secret_enc}`
  const hmac = createHmac('sha256', secret_enc)
  const data = hmac.update(string_to_sign)

  return encodeURIComponent(data.digest('base64'))
}

/**
 * gitee has it's own payload structure therefore we need to check if we have those things in the header
 * @param {*} req request object from http server
 * @return {*} 
 */
export function verifyHeader(req: any): any {

}
