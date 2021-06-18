// src/lib/config-option-type
// just setup a type for the options to use

type configOptionType = {
  port: number,
  dir?: string,
  secret?: string,
  provider: string,
  path: string,
  branch: string,
  cmd: string,
  inited?: boolean
}

export { configOptionType }
