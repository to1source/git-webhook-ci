// src/lib/option.ts
// base config option

// basically all the required options
export const defaultOptions: any = {
  port: 8081,
  provider: 'gitee',
  path: '/webhook',
  branch: 'refs/heads/master',
  cmd: 'git pull origin master --no-edit'
}
