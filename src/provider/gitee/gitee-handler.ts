// src/provider/gitee/gitee-class.ts

import { BaseTools, configOptionType } from '../../lib/base-tools'
import { verifyHandler } from './verify'
import { debugFn } from '../../lib/helpers'

const debug = debugFn('git-webhook-ci:gitee:handler')

export class GiteeHandler extends BaseTools {

  constructor(options: configOptionType) {
    super(options)
  }

  /**
   * Main method, the only one that get call
   * @param {object} req the request
   * @param {object} res the respond
   * @param {function} callback res with 404
   * @return {null} nothing
   */
  public handler(req: any, res: any, callback: any): any {
    debug(`got call here`)
    return super.handler(req, res, this.verify)
      .then(result => {
        this.resSuccess(req, res, result)
      })
      .catch(err => {
        return callback(err)
      })
  }

  /**
   * Verify the password field
   * @param {object} payload Content
   * @return {object} promise
   */
  private verify(obj: any, opt: any): Promise<any> {
    return new Promise((resolver: any, rejecter: any): void => {
      const { header, payload } = obj
      if (verifyHandler(header, opt.secret)) {
        resolver(payload)
      } else {
        rejecter(new Error('Gitee verify failed'))
      }
    })
  }

  /**
   * @param {object} req the request 
   * @param {object} res the respond
   * @param {object} result the payload
   * @return {null} nothing
   */
  private resSuccess(req: any, res: any, result: any) {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end('{"ok":true}')
    // Check the result if this is what we wanted
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
