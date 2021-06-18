import { BaseTools, configOptionType } from '../../lib/base-tools';
export declare class GitlabHandler extends BaseTools {
    constructor(options: configOptionType);
    /**
     * Main method
     * @param {object} req the request
     * @param {object} res the respond
     * @param {function} callback res with 404
     * @param {function} errorHandler optional error callback
     * @return {null} nothing
     */
    handler(req: any, res: any, callback: any): any;
    /**
     * Verify the password field
     * @param {object} payload Content
     * @param {object} headers headers looking for the X-Gitlab-Event: Push Hook
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
