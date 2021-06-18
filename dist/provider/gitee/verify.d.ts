/**
 * create the secret key to compare
 * @param {string} secretKey the secret key set during sestting up the webhook
 * @param {number} timestamp this timestamp send from the git provider server
 */
export declare function getToken(secretKey: string, timestamp: number): string;
/**
 * gitee has it's own payload structure therefore we need to check if we have those things in the header
 * @param {*} header the parsed header from req
 * @param {string} secretKey the secret key provided when setup the webhook
 * @return {boolean}
 */
export declare function verifyHandler(header: any, secretKey: string): boolean;
