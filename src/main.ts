// src/main.ts it was the main file so rename to main and the function rename as well

import { spawn } from 'child_process'

import { getProvider } from './provider'
import { defaultOptions } from './lib/option'
import { debugFn } from './lib'

const debug = debugFn('git-webhook-ci:main')
const blackhole = debugFn('git-webhook-ci:blackhole:main')

/**
 * create a callback to execute
 * @param {string} cmd
 */
function createCallback(cmd: Array<any>): any {
  // the signature just matching the cmd callback and create a problem here
  return function callback(payload: any, opt: any) {
    // don't really want to show this because it's pointless
    blackhole(payload)

    const ps = spawn(cmd[0], cmd.filter((_: any, i: number): boolean => i > 0), opt)

    ps.stdout.on('data', data => {
      debug("cmd stdout:", data)
    })
    ps.stderr.on('data', data => {
      debug("cmd stderr:", data)
    })
    ps.on('end', code => {
      debug(`cmd exited with ${code}`)
    })
  }
}

/**
 * Finally the main method
 * @param {object} config
 * @return {function} for calls
 */
export function gitWebhookCi(options: any): any {
  // yeah type safe ... you still need to do validation
  if (typeof options !== 'object') {
    throw new Error('Expecting options to be an object')
  }

  const config = Object.assign({}, defaultOptions, options)
  if (!config.secret || config.secret === '') {
    throw new Error('You must provide the secret!')
  }

  if (typeof config.cmd !== 'string' && typeof config.cmd !== 'function') {
    throw new Error('Cmd must be a string or a function!')
  }

  debug(config)

  const createHandler = getProvider(config.provider)
  // Return without Promise, because there is no need to
  return createHandler(
    config,
    {
      env: Object.assign({}, process.env),
      cwd: config.dir ? config.dir : process.cwd()
    },
    typeof config.cmd === 'function' ? config.cmd : createCallback(config.cmd.split(' '))
  )
}
