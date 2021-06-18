/**
 * This is for wechat mini-app push callback
 * Based on their PHP version
 */
import { BaseTools, configOptionType } from '../../lib';
export declare class WechatHandler extends BaseTools {
    constructor(options: configOptionType);
    /**
     * Main interface, this is different from the other because there is no filter
     * on what is coming, just verify it then pass the payload to the callback
     */
    handler(req: any, res: any, callback: any): void;
    private getParams;
    /**
     * This is different using the query parameter to compare
     * Another thing is - this is a one off verify process
     * once the wechat end verify this end is correct, it will
     * just send data over. Need to figure out a way to run this
     * verify before the actual listening
     */
    private verify;
}
