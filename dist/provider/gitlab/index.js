// src/provider/gitlab/index.ts
import { GitlabHandler } from './gitlab-handler';
import { createServer, debugFn } from '../../lib';
const debug = debugFn('git-webhook-ci:gitlab');
// main method
function createGitlabServer(config, opt, callback, errorHandler = () => { }) {
    const gitlab = new GitlabHandler(config);
    gitlab.on('error', (err) => {
        debug('error', err);
        errorHandler(err);
    });
    // Listen on the push event - success
    gitlab.on('push', (result) => {
        const ref = result.payload.ref;
        if (config.branch === '*' || config.branch === ref) {
            callback(result, opt, ref);
        }
        else {
            errorHandler(ref);
            debug('Gitee webhook is not expecting this branch', ref);
        }
    });
    // return the http server
    return createServer((req, res) => {
        gitlab.handler(req, res, (err) => {
            debug('The url got called! [%s]', req.url, err);
            errorHandler(err);
            res.statusCode = 404;
            res.end('-- no such location --');
        });
    }, config, debug);
}
export default createGitlabServer;
