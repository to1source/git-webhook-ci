// src/lib/option.ts
// base config option

import configOptionType from './config-option-type'

export const defaultOptions: configOptionType = {
  provider: 'gitee', // For future use
  dir: '',
  path: '/webhook',
  port: 8081,
  branch: 'refs/heads/master',
  cmd: 'git pull origin master --no-edit'
}
