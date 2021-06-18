/// <reference types="node" />
import EventEmitter from 'events';
import { configOptionType, resolvedPayloadType } from './types';
declare class BaseTools extends EventEmitter {
    protected options: configOptionType;
    constructor(options: configOptionType);
    /**
     * parsing the raw heading and keep them in original format (no lower case)
     * @param {*} req request object
     * @return {object}
     */
    protected parseHeader(req: any): any;
    /**
     * Extract the json payload
     * @param {object} req the request Object
     * @return {object} Promise
     */
    protected parsePayload(req: any): Promise<resolvedPayloadType>;
    /**
     * @param {object} res the respond object unable to get a correct type IncomingMessage?
     * @param {string} err error string, this might or might not have, therefore make it optional
     * @return {void} nothing
     */
    protected resError(res: any, err?: any): void;
}
export { BaseTools, configOptionType };
