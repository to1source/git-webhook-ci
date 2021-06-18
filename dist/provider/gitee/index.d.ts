import { configOptionType } from '../../lib';
/**
 * The main method to handle the server create and run the whole service for gitee
 * @param {configOptionType} config for the overall setup of the system
 * @param {object} opt this provide the environment variables to the cmd to execute later
 * @param {function} callback
 * @param {function} errorHandler optional
 * @return {http server instance}
 */
declare function createGiteeServer(config: configOptionType, opt: any, callback: any, errorHandler?: any): any;
export default createGiteeServer;
