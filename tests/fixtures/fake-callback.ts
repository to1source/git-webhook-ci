// tests/fixtures/fake-callback.ts
import { getToken as giteeGetToken } from '../../src/provider/gitee/verify'
import { header as giteeHeader, payload as giteePayload } from './gitee'
import { header as gitlabHeader, payload as gitlabPayload } from './gitlab'
import { SECRET_KEY } from './secret'

// this will create a fake callback to the webhook listener with specific payload
export function getFakeData(provider: string): any {
  switch(provider) {
    case 'gitee':
      const ts = Date.now()
      const token = giteeGetToken(SECRET_KEY, ts)

      return {
        header: Object.assign({}, giteeHeader, {
          'X-Gitee-Token': token,
          'X-Gitee-Timestamp': ts
        }),
        payload: giteePayload
      }
    case 'gitlab':
      

    default:
      throw new Error(`Unknown provider ${provider}`)
  }
}
