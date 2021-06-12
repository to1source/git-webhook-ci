// src/lib/server.ts
// create a barebone server
import { createServer } from 'http'

function createBareServer(config: any, callback: any, debug: any) {
  return createServer(callback)
            .listen(config.port, (): void => {
              debug(`${config.provider} webhook server start @ ${config.port}`)
            })
}

export default createBareServer
