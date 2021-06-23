// src/lib/option.ts
// base config option

// @NOTE here is a problem github use /payload as default now


// basically all the required options
export const defaultOptions: any = {
  port: 8081,
  provider: 'gitee',
  path: '/webhook',
  branch: 'refs/heads/master',
  cmd: 'git pull origin master --no-edit',
  pwd: process.cwd(),
  env: process.env, 
  error: () => {} // just a placeholder 
}
