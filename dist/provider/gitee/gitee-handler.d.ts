import { BaseTools, configOptionType } from '../../lib/base-tools';
export declare class GiteeHandler extends BaseTools {
    constructor(options: configOptionType);
    /**
     * Main method, the only one that get call
     * @param {object} req the request
     * @param {object} res the respond
     * @param {function} callback res with 404
     * @return {null} nothing
     */
    handler(req: any, res: any, callback: any): any;
    /**
     * Verify the password field
     * @param {object} payload Content
     * @return {object} promise
     */
    private verify;
    /**
     * @param {object} res the respond
     * @param {object} result the payload
     * @return {null} nothing
     */
    private resSuccess;
}
