// src/lib/option.ts
// base config option

import configOptionType from './config-option-type'

// basically all the required options 
export const defaultOptions: configOptionType = {
  port: 8081,
  provider: 'gitee',
  path: '/webhook',
  branch: 'refs/heads/master',
  cmd: 'git pull origin master --no-edit'
}
