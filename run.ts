// /run.ts example

// Here we just run a github instance for testing purpose 
import { gitWebhookCi } from './src/main'

const config = {
  port: 4567,
  provider: 'github',
  cmd: (args: []): void => {
    console.log("Got callback")
    console.log(args)
  },
  error: (args: []): void => {
    console.error('ERROR!')
    console.error(args)
  } 
}

gitWebhookCi(config)