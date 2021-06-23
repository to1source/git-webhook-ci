// src/provider/github/github-handler.ts
// V.2 ditch the external github-webhook-handler
import { BaseTools, configOptionType } from '../../lib/base-tools'
import { verifyHandler } from './verify'
import { debugFn } from '../../lib/helpers'

const debug = debugFn('git-webhook-ci:github:handler')

export class GiteeHandler extends BaseTools {

  constructor(options: configOptionType) {
    super(options)
  }

  // How to make this into the parent method 
  public handler(req: any, res: any, callback: any): any {
    debug(`github handler called`)
    return super.handler(req, res, this.verify)
      .then(result => {
        this.resSuccess(req, res, result)
      })
      .catch(err => {
        return callback(err)
      })
  }

  // github token verify method 
  private verify(obj: any, opt: any): Promise<any> {
    return new Promise((resolver: any, rejecter: any): void => {
      const { header, payload } = obj 
      if (verifyHandler(header, opt.secret, payload)) {
        resolver(payload)
      } else {
        rejecter(new Error('Github verify failed'))
      }
    })
  }

  private resSuccess(req: any, res: any, result: any) {
    res.writeHead(200, { 'content-type': 'application/json' })
    // this might be different take a look at the github module 
    res.end('{"ok":true}')
    if (result.hook_name === 'push_hooks') { // @TODO check if this is still correct
      this.emit('push', {
        payload: result,
        host: req.headers.host,
        event: result.hook_name
      })
    } else {
      this.emit('error', {
        msg: 'Not the event we are expecting',
        event: result.hook_name
      })
    }
  }
  
}
