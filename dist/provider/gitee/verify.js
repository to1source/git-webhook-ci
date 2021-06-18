// src/provider/gitee/secret.ts
// see here: https://gitee.com/help/articles/4290#article-header3
import { createHmac } from 'crypto';
// use the debug to find out what went wrong
import { debugFn } from '../../lib/helpers';
const debug = debugFn('git-webhook-ci:gitee:verify');
/**
 * create the secret key to compare
 * @param {string} secretKey the secret key set during sestting up the webhook
 * @param {number} timestamp this timestamp send from the git provider server
 */
export function getToken(secretKey, timestamp) {
    const secret_enc = Buffer.from(secretKey, 'utf8');
    const string_to_sign = `${timestamp}\n${secret_enc}`;
    const hmac = createHmac('sha256', secret_enc);
    const data = hmac.update(string_to_sign);
    return encodeURIComponent(data.digest('base64'));
}
/**
 * gitee has it's own payload structure therefore we need to check if we have those things in the header
 * @param {*} header the parsed header from req
 * @param {string} secretKey the secret key provided when setup the webhook
 * @return {boolean}
 */
export function verifyHandler(header, secretKey) {
    if (header['User-Agent'] === 'git-oschina-hook') {
        debug('User-Agent passed', header['User-Agent']);
        const expected = ['X-Gitee-Token', 'X-Gitee-Timestamp', 'X-Gitee-Event'].filter(key => header[key] !== undefined).length;
        if (expected === 3) {
            debug('Expected header passed');
            if (header['X-Gitee-Token'] === getToken(secretKey, parseInt(header['X-Gitee-Timestamp']))) {
                return true;
            }
            else {
                debug('verify the x-gitee-token failed');
            }
        }
    }
    return false;
}
