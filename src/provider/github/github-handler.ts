// src/provider/github/github-handler.ts
// V.2 ditch the external github-webhook-handler
import { BaseTools, configOptionType } from '../../lib/base-tools'
import { verifyHandler } from './verify'
import { debugFn } from '../../lib/helpers'

const debug = debugFn('git-webhook-ci:github:handler')

export class GiteeHandler extends BaseTools {

  constructor(options: configOptionType) {
    super(options)
  }


  
}
