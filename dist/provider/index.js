// src/provider/index.ts
// group everything together and call from here
import giteeWebhook from './gitee';
import githubWebhook from './github';
import gitlabWebhook from './gitlab';
import wechatWebhook from './wechat';
/**
 * Wrap all the configuration check code here
 * Then init the instance and return it
 * @NOTE v.2 gitee now is the default
 * also it's now a named export
 */
export function getProvider(provider) {
    switch (provider) {
        case 'wechat':
            return wechatWebhook;
        case 'gitlab':
            return gitlabWebhook;
        case 'github':
            return githubWebhook;
        case 'gitee':
        default:
            return giteeWebhook;
    }
}
