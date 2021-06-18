// src/provider/github/index.ts
// Github is using another external npm to handle it
import { createServer, debugFn } from '../../lib';
import githubWebhook from 'github-webhook-handler';
const debug = debugFn('git-webhook-ci:github');
// main method
function createGithubServer(config, opt, callback, errorHandler = () => { }) {
    const handler = githubWebhook({
        path: config.path,
        secret: config.secret
    });
    handler.on('error', err => {
        errorHandler(err);
        debug('Error:', err.message);
    });
    // On received push event
    handler.on('push', result => {
        const ref = result.payload.ref;
        if (config.branch === '*' || config.branch === ref) {
            callback(result, opt, ref);
        }
        else {
            const errorStr = `Received a push event for ${result.payload.repository.name} to ${ref}`;
            debug(errorStr);
            errorHandler(errorStr);
        }
    });
    return createServer((req, res) => {
        handler(req, res, (err) => {
            debug(`The url got called! ${req.url}`, err);
            errorHandler(err);
            res.statusCode = 404;
            res.end('-- no such location --');
        });
    }, config, debug);
}
export default createGithubServer;
