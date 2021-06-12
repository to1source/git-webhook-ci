// src/provider/wechat/index.ts


import { WechatHandler } from './wechat-handler'
import { createServer, configOptionType, debugFn } from '../../lib'

const debug = debugFn('git-webhook-ci:wechat')


function createWechatServer(config: configOptionType, opt: any, callback: any, errorHandler: any = () => {}): any {
  const wechat: WechatHandler = new WechatHandler(config)

  /* This is not implemented, there is no need at the moment
  wechat.on('error', err => {
    debug('error', err);
  });
  */
  wechat.on('push', result => {
    callback(result, opt)
  })

  return createServer(
    config,
    (req: any, res: any): void => {
      wechat.handler(req, res, (err:any): void => {
        errorHandler(err)
        debug('The url got called! [%s]', req.url, err)

        res.statusCode = 404
        res.end('-- no such location --')
      })
    },
    debug
  )
}

export default createWechatServer
