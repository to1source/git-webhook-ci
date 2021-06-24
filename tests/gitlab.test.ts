// tests/gitee.test.ts

import test from 'ava'
import request from 'supertest'

import { gitWebhookCi } from '../src/main'
import { SECRET_KEY } from './fixtures/secret'
import { getFakeData } from './fixtures/fake-callback'

test.cb(`Should able to use a gitlab config to connect`, t => {
  t.plan(1)

  const { header, payload } = getFakeData('gitlab')

  request(
    gitWebhookCi({
      provider: 'gitlab',
      secret: SECRET_KEY,
      cmd: function gitLabCallback() {
        console.log(`TEST CMD CALLED`)
        t.pass()
        t.end()
      }
    })
  )
  .post('/webhook')
  .set(header)
  .send(payload)
  .expect(200, () => {
    // t.pass() <-- this pass is never called?
    //t.end()
  })
})
