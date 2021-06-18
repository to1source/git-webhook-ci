/**
 * super simple http server using build-in node http
 * @param {function} callback
 * @param {object} config
 * @param {function} debug
 * @return {http.Server}
 */
declare function createBareServer(callback: any, config?: any, debug?: any): any;
export default createBareServer;
