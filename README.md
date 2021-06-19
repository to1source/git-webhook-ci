# git-webhook-ci
> A Git (github/gitee) webhook callback server to fetch new code (poor man CI)

This little tool is born out of real projects. Keep having to deploy and setup demo site etc. Why bother if you own the git account?
You just need a new cert from github, add this to your project, and setup accordingly, and Viola, you get your own poor man CI :)

## Installation

```sh
  $ npm install --save git-webhook-ci
```

or

```sh
  $ yarn add git-webhook-ci
```

## Configuration and usage

Create a js file (normally on your project root directory). Let's call it `webhook.js`.

```js
const gitWebhook = require('git-webhook-ci');
const config = {
  "provider": "github", // from version 2 you MUST provide this
  "secret": "your-github-webhook-secret",
  "path": "/webhook",
  "port": 8081,
  "branch": "refs/heads/master", // New in 0.4.1 you can pass * wildcard to listen to all branches
  "cmd": "git pull origin master --no-edit",
  "error": (err) => {
    // do thing with your error
  }
}

gitWebhook(config);
```

### Full configuration properties

| Property name | Description   | Default  | Type |
| ------------- | ------------- | ---------| -----|
| dir           | Where the git root directory is, default to where it gets call | `process.cwd()` | String |
| secret        | A secret key pass to encrypt data between github and your server | '' | String |
| path          | The path where the web hook call to your server | `/webhook` | String |
| port          | The port number where this callback server running on | `8081` | Integer |
| branch        | The branch where you will trigger action when received event from github. You can pass `*` wildcard to listen to all the branches  | `refs/heads/master` | String |
| cmd           | The command to execute when callback happens. You can also pass this as a function (see above for signature) and especially useful when you use `*` for branch  | `git pull origin master --no-edit` | String |
| error         | expect a function and you can handle the error yourself. Or enable DEBUG=git-webhook-ci:error to see the error |
| inited        | only available with `wechat` provider | `false` | Boolean |

### Debug option

Internally we use `debug` to track what's going on. So you can just pass the env during the start up of the script to debug your setup.

```sh
  DEBUG=* node ./webhook.js
```

If you do that, you will see a huge amount of info. All our debug flags are prefixed with `git-webhook-ci`,
and here is the list of all the keys we use in this npm.

- git-webhook-ci:error - This is the most likely you will use, to see the error message
- git-webhook-ci:main - You will see the configuration option being pass to the main method
- git-webhook-ci:gitlab
- git-webhook-ci:github
- git-webhook-ci:gitee
- git-webhook-ci:wechat

For example:

```sh
  DEBUG=git-webhook-ci:main,git-webhook-ci:error node ./webhook.js
```

Then you will only see the main (top interface) and the Wechat internal debug messages.

## CLI

We drop the cli support since V.2 due to the large amount of configuration options. You can try to write your own follow [this example](docs/02-cli.md)

## License

WTFPL - Joel Chu (c) 2021
