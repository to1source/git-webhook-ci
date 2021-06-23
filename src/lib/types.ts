// src/lib/config-option-type
// just setup a type for the options to use

type configOptionType = {
  port: number,
  secret: string,
  provider: string,
  path: string,
  branch: string,
  cmd: string | any,
  // @TODO
  pwd?: string,
  env?: any, 
  error?: any,
  inited?: boolean
}

type resolvedPayloadType = {
  header: any,
  payload: any
}

export { configOptionType, resolvedPayloadType }
