// src/lib/config-option-type
// just setup a type for the options to use

type configOptionType = {
  port: number,
  dir?: string,
  provider: string,
  path: string,
  branch: string,
  cmd: string
}

export default configOptionType
