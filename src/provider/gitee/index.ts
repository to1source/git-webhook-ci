// src/provider/gitee/index.ts

// the actual execution

import { GiteeHandler } from './gitee-handler'
import debug from 'debug'
import createServer from '../../lib/server'
import configOptionType from '../../lib/config-option-type'

const debugFn = debug('git-webhook-ci:gitee')

function createGiteeServer(config: configOptionType, opt: any, callback: any) {

  const gitee: GiteeHandler = new GiteeHandler(config)
  // just debug it out
  gitee.on('error', err => {
    debug('error', err)
  })

  gitee.on('push', (result: any) => {
    const ref = result.payload.ref // ref is the branch name 
    if (config.branch === '*' || config.branch === ref) {
      callback(result, opt, ref)
    } else {
      debugFn('Gitee webhook is not expecting this branch', ref)
    }
  })

  // return the server instance
  return createServer(
    config,
    (req: any, res: any) => {
      gitee.handler(req, res, (err: any) => {
        res.statusCode = 404
        debugFn('The url got called! [%s]', req.url, err)
        res.end('-- no such location --')
      })
    },
    debugFn
  )
}

export default createGiteeServer
