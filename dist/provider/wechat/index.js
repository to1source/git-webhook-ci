// src/provider/wechat/index.ts
import { WechatHandler } from './wechat-handler';
import { createServer, debugFn } from '../../lib';
const debug = debugFn('git-webhook-ci:wechat');
function createWechatServer(config, opt, callback, errorHandler = () => { }) {
    const wechat = new WechatHandler(config);
    /* This is not implemented, there is no need at the moment
    wechat.on('error', err => {
      debug('error', err);
    });
    */
    wechat.on('push', result => {
        callback(result, opt);
    });
    return createServer((req, res) => {
        wechat.handler(req, res, (err) => {
            errorHandler(err);
            debug('The url got called! [%s]', req.url, err);
            res.statusCode = 404;
            res.end('-- no such location --');
        });
    }, config, debug);
}
export default createWechatServer;
