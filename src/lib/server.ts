// src/lib/server.ts
// create a barebone server
import { createServer } from 'http'

/**
 * super simple http server using build-in node http
 * @param {function} callback
 * @param {object} config
 * @param {function} debug
 * @return {http.Server}
 */
function createBareServer(callback: any, config: any = {}, debug: any = () => {}): any {
  const srv = createServer(callback)
  if (process.env.NODE_ENV === 'test') {

    return srv
  }
  if (!config.port) {
    throw new Error(`Expect a config.port property!`)
  }

  return srv.listen(config.port, (): void => {
            try {
              debug(`${config.provider} webhook server start @ ${config.port}`)
            } catch(e) {}
         })
}

export default createBareServer
