// src/provider/gitlab/gitlab-handler.ts

import { BaseTools, configOptionType } from '../../lib/base-tools'

export class GitlabHandler extends BaseTools {

  constructor(options: configOptionType) {
    super(options)
  }

  /**
   * Main method
   * @param {object} req the request
   * @param {object} res the respond
   * @param {function} callback res with 404
   * @param {function} errorHandler optional error callback
   * @return {null} nothing
   */
  public handler(req: any, res: any, callback: any): any {
    if (req.url.split('?').shift() !== this.options.path || req.method !== 'POST') {
      return callback() // The only time we use the callback
    }
    this.parsePayload(req).then(payload => {
      const headers = req.headers // JSON.stringify(req.headers, replacer);
      // cache = null;
      this.verify(payload, headers)
        .then(payload => {
          this.resSuccess(res, req, payload)
        })
        .catch((err: any) => {
          this.resError(res, err)
        })
    })
  }

  /**
   * Verify the password field
   * @param {object} payload Content
   * @param {object} headers headers looking for the X-Gitlab-Event: Push Hook
   * @return {object} promise
   */
  private verify(payload: any, headers: any): Promise<any> {
    const eventName = 'X-Gitlab-Event'.toLowerCase()
    const token = 'X-Gitlab-Token'.toLowerCase()
    // Console.log('headers', headers, typeof headers);
    return new Promise((resolver, rejecter) => {
      if (headers[eventName] === 'Push Hook' && headers[token] === this.options.secret) {
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
  private resSuccess(res: any, req: any, payload: any): void {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end('{"ok":true}')
    // Check the result if this is what we wanted
    if (payload.object_kind === 'push') {
      this.emit('push', {
        payload: payload,
        host: req.headers.host,
        event: payload.object_kind
      })
    } else {
      this.emit('error', {
        msg: 'Not the event we are expecting',
        event: payload.object_kind
      })
    }
  }
}
