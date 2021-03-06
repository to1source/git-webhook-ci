// src/provider/gitee/index.ts

// the actual execution

import { GiteeHandler } from './gitee-handler'
import { createServer, configOptionType, debugFn } from '../../lib'

const debug = debugFn('git-webhook-ci:gitee')

/**
 * The main method to handle the server create and run the whole service for gitee
 * @param {configOptionType} config for the overall setup of the system
 * @param {function} callback
 * @param {function} errorHandler optional
 * @return {http server instance}
 */
function createGiteeServer(config: configOptionType, callback: any, errorHandler: any = () => {}): any {

  const gitee: GiteeHandler = new GiteeHandler(config)
  // just debug it out
  gitee.on('error', (err: any) => {
    debug('ERROR', err)
    errorHandler(err)
  })

  gitee.on('push', (result: any) => {
    const ref = result.payload.ref // ref is the branch name
    if (config.branch === '*' || config.branch === ref) {
      callback(result, config, ref)
    } else {
      errorHandler(ref)
      debug('Gitee webhook is not expecting this branch', ref)
    }
  })

  // return the server instance
  return createServer(
    (req: any, res: any) => {

      debug(`server callback executed`)

      gitee.handler(req, res, (err: any) => {
        debug('The url got called! [%s]', req.url, err)
        errorHandler(req.url, err)

        res.statusCode = 404
        res.end('-- no such location --')
      })
    },
    config,
    debug
  )
}

export default createGiteeServer
