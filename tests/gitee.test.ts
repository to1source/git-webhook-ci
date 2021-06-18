// tests/gitee.test.ts

import test from 'ava'
import request from 'supertest'

import { gitWebhookCi } from '../src/main'
import { SECRET_KEY } from './fixtures/secret'
import { getFakeData } from './fixtures/fake-callback'


test.cb(`Should able to use a gitee config to listen to the webhook event`, t => {
  t.plan(1)

  const { header, payload } = getFakeData('gitee')

  request(
    gitWebhookCi({
      secret: SECRET_KEY,
      cmd: (...args) => {

        console.log(args)

        t.pass()
        t.end()
      }
    })
  )
  .post('/webhook')
  .set(header)
  .send(payload)


})
