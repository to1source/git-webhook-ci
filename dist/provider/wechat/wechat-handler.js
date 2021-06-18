/**
 * This is for wechat mini-app push callback
 * Based on their PHP version
 */
/*
https://mp.weixin.qq.com/debug/wxadoc/dev/api/custommsg/callback_help.html

private function checkSignature()
{
    $signature = $_GET["signature"];
    $timestamp = $_GET["timestamp"];
    $nonce = $_GET["nonce"];

    $token = TOKEN;
    $tmpArr = array($token, $timestamp, $nonce);
    sort($tmpArr, SORT_STRING);
    $tmpStr = implode( $tmpArr );
    $tmpStr = sha1( $tmpStr );

    if( $tmpStr == $signature ){
        return true;
    }else{
        return false;
    }
}
*/
import { BaseTools, debugFn } from '../../lib';
import { URL } from 'url';
import sha1 from 'sha1';
const debug = debugFn('git-webhook-ci:wechat');
export class WechatHandler extends BaseTools {
    constructor(options) {
        super(options);
    }
    /**
     * Main interface, this is different from the other because there is no filter
     * on what is coming, just verify it then pass the payload to the callback
     */
    handler(req, res, callback) {
        if (this.options.inited !== true) {
            const echostr = this.verify(req);
            if (!echostr) {
                debug('verify with wechat server failed');
                return callback('verify failed');
            }
            debug(`verify with wechat echostr '${echostr}' correct`);
            res.writeHead(200, { 'content-type': 'text/html' });
            res.end(echostr);
            return;
        }
        // The implementation is different
        this.parsePayload(req)
            .then(payload => {
            res.writeHead(200, { 'content-type': 'application/json' });
            res.end('{"ok": true}');
            // Just reuse the same naming
            this.emit('push', {
                payload,
                host: req.headers.host,
                event: 'wechat-push'
            });
        });
    }
    // get the params from url
    getParams(url) {
        const u = new URL(url);
        const params = ['signature', 'timestamp', 'nonce', 'echostr'];
        return params.map((param) => {
            return { [param]: u.searchParams.get(param) };
        }).reduce((a, b) => Object.assign(a, b), {});
    }
    /**
     * This is different using the query parameter to compare
     * Another thing is - this is a one off verify process
     * once the wechat end verify this end is correct, it will
     * just send data over. Need to figure out a way to run this
     * verify before the actual listening
     */
    verify(req) {
        const { signature, timestamp, nonce, echostr } = this.getParams(req.url);
        const $token = this.options.secret;
        let $tmpArr = [$token, timestamp, nonce];
        $tmpArr.sort();
        return sha1($tmpArr.join('')) === signature ? echostr : false;
    }
}
