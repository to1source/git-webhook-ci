// src/lib/config-option-type
// just setup a type for the options to use

type configOptionType = {
  port: number,
  secret: string,
  provider: string,
  path: string,
  branch: string,
  cmd: string,
  // @TODO should we put the cwd and env here as well?
  error?: any,
  inited?: boolean,
  dir?: string
}

type resolvedPayloadType = {
  header: any,
  payload: any
}

export { configOptionType, resolvedPayloadType }
