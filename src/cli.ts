#!/usr/bin/env node
/**
 * Run from cli
 * dir: '',
 * path: '/webhook',
 * port: 8081,
 * branch: 'refs/heads/master',
 * cmd: 'git pull origin master --no-edit'
 */
// import { configOptionType } from './lib'
import { gitWebhookCi } from './main'
import meow from 'meow'

const helpText: string = `
  Usage
    $ node git-webhook-ci <path>

    $ node git-webhook-ci <path> --secret secret-from-github

    $ node git-webhook-ci <path> --secret secret-from-github --cmd 'git pull origin develop'

  For wechat

    $ node git-webhook-ci <path> -secret wechat-token --inited true --cmd 'some cmd'
`
const flags: any = {
  port: {
    type: 'number',
    alias: 'po',
    default: 8081
  },
  provider: {
    type: 'string',
    alias: 'pr',
    default: 'github'
  },
  dir: {
    type: 'string',
    alias: 'd'
  },
  path: {
    type: 'string',
    alias: 'p',
    default: '/webhook'
  },
  branch: {
    type: 'string',
    alias: 'b',
    default: 'refs/heads/master'
  },
  secret: {
    type: 'string',
    alias: 's',
    default: ''
  },
  cmd: {
    type: 'string',
    alias: 'c',
    default: 'git pull origin master --no-edit'
  },
  inited: {
    type: 'boolean',
    alias: 'i',
    default: false
  }
}

const cli = meow(helpText, {
  flags,
  importMeta: import.meta // it was complainting about this ...
})

// Wrap into a method to call
const serve = function(p: string, flags: any): any {
  if (!p || p === '') {
    throw new Error('You must provide the <path>! Check usage for more detail.')
  }
  const config = Object.assign({ __caller__: 'meow' }, { dir: p }, flags)

  return gitWebhookCi(config)
}
// Run it
serve(cli.input[0], cli.flags)
