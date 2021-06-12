// src/lib/base-tools

// typescript is really a fucking joke

import configOptionType from './config-option-type'
import EventEmitter from 'events'

class BaseTools extends EventEmitter {

  // class constructor
  constructor(protected options: configOptionType) {
    super()
  }

  /**
   * Extract the json payload
   * @param {object} req the request Object
   * @return {object} Promise
   */
  protected parsePayload(req: any): Promise<any> {
      return new Promise((resolver: any, rejecter: any): void => {
        let body: Array<any> = []
        req
          .on('data', (chunk: any) => {
            body.push(chunk)
          })
          .on('end', () => {
            const json: string = Buffer.concat(body).toString()
            resolver(JSON.parse(json))
          })
          .on('error', rejecter) // just throw the rejecter in to handle it
      })
  }

   /**
    * @param {object} res the respond object unable to get a correct type IncomingMessage?
    * @param {string} err error string, this might or might not have, therefore make it optional
    * @return {void} nothing
    */
  protected resError(res: any, err?: any): void  {
    res.writeHead(400, { 'content-type': 'application/json' })
    res.end(
      JSON.stringify({
        error: err
      })
    )
    this.emit('error', new Error(err))
  }
}

export { BaseTools, configOptionType }
