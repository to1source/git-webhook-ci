// src/provider/github/verify.ts



import { createHmac } from 'crypto'

/**
 * Github now change the way how to validate the signature
 * We need to implement it here, and it's using the payload to hash
 * the whole key starts with `sha256=` using a HMAC hex
 */
export function getToken(secretKey: string, payload: any): string {
  const hmac = createHmac('sha256',  secretKey)

  hmac.update(payload) // note here, you must make sure this is utf-8 encoded before passing here

  return 'sha256=' + hmac.digest('hex') // return the hex format
}

/**
 * This is the actual call inside the verify method in the class
 * @param {object} header the raw header
 * @param {string} secretKey
 * @param {object} payload the full payload encoded in utf8
 * @return {boolean}
 */
export function verifyHandler(header: any, secretKey: string, payload: any): boolean {
  if (header['X-Hub-Signature-256']) {
    
    return header['X-Hub-Signature-256'] === getToken(secretKey, payload)
  }

  return false
}
