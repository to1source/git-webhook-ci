// tests/gitee.test.ts

import test from 'ava'

import { gitWebhookCi } from '../src/main'
import request from 'supertest'
import { SECRET_KEY } from './fixtures/secret'
import { getFakeCallback } from './fixtures/fake-callback'


test.cb(`Should able to use a gitee config to connect`, t => {
  const fn = getFakeCallback('gitee')

  gitWebhookCi({
    secret: SECRET_KEY,
    cmd: () => {

    }
  })

})
