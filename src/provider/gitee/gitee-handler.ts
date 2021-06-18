// src/provider/gitee/gitee-class.ts

import { BaseTools, configOptionType } from '../../lib/base-tools'
import { verifyHandler } from './verify'

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
    if (req.method !== 'POST' || req.url.split('?').shift() !== this.options.path) {
      return callback() // This is the only time we use the callback
    }
    this.parsePayload(req)
      .then(obj => {
        this.verify(obj)
          .then(result => {
            this.resSuccess(res, req, result)
          })
          .catch((err: any) => {
            this.resError(res, err)
          })
      })
  }

  /**
   * Verify the password field
   * @param {object} payload Content
   * @return {object} promise
   */
  private verify(obj: any): Promise<any> {
    return new Promise((resolver: any, rejecter: any): void => {
      const { header, payload } = obj
      if (verifyHandler(header, this.options.secret)) {
        resolver(payload)
      } else {
        rejecter(new Error('Gitee verify failed'))
      }
    })
  }

  /**
   * @param {object} res the respond
   * @param {object} result the payload
   * @return {null} nothing
   */
  private resSuccess(res: any, req: any, result: any) {
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
