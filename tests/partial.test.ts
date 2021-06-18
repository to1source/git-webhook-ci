// tests/partial.test.ts
import test from 'ava'
import request from 'supertest'
// using this to do TBD-ish to develop the new features
// and testing the code part by part

import createServer from '../src/lib/server'
import { header, payload } from './fixtures/gitee.ts'

// @NOTE should sub class from the base-tools but this will do for now
function parseHeader(req): any {
  const headers = req.rawHeaders
  const ctn = headers.length
  const h = {}
  for (let i = 0; i < ctn; i += 2) {
    h[ headers[i] ] = headers[ i + 1]
  }

  return h
}

// simple callback handler
function cb(req: any, res: any): void {
  console.log(parseHeader(req))
  res.writeHead(200, { 'content-type': 'application/json' })
  res.end('{"ok":true}')
}

// just change the timestamp field
function getHeader(): any {
  return Object.assign({}, header, {'X-Gitee-Timestamp': Date.now()})
}


test.cb(`Try out the supertest with fake headers`, t => {
  t.plan(1)

  request(createServer(cb))
    .post('/')
    .set(getHeader())
    .send(payload)
    .expect(200, () => {
      t.pass()
      t.end()
    })
})
