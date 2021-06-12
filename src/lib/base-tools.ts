// src/lib/base-tools

// typescript is really a fucking joke

import EventEmitter from 'events'

export class BaseTools extends EventEmitter {
  options: any

  constructor(options: any) {
    super()
    this.options = options
  }

  /**
   * Extract the json payload
   * @param {object} req the request Object
   * @return {object} Promise
   */
  parsePayload(req: any): Promise<any> {
      return new Promise((resolver: any): void => {
        let body: Array<any> = []
        req
          .on('data', (chunk: any) => {
            body.push(chunk)
          })
          .on('end', () => {
            const json: string = Buffer.concat(body).toString()
            resolver(JSON.parse(json))
          })
      })
  }

   /**
    * @param {object} res the respond object
    * @param {string} msg to throw
    * @return {void} nothing
    */
  
}
