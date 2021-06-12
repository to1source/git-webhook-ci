// src/provider/gitee/gitee-class.ts

import { BaseTools, configOptionType } from '../../lib/base-tools'

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
    if (req.url.split('?').shift() !== this.options.path || req.method !== 'POST') {
      return callback() // This is the only time we use the callback
    }
    this.parsePayload(req)
      .then(payload => {
        this.verify(payload)
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
  private verify(payload: any): Promise<any> {
    return new Promise((resolver: any, rejecter: any): void => {
      // Log('parsed payload', payload);
      if (payload.password === this.options.secret) {
        resolver(payload)
      } else {
        rejecter(new Error('Verify failed'))
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
    if (result.hook_name === 'push_hooks') {
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
