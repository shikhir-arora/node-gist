# Node Gist

- If you really want to use this, **fork** this project, get a OAuth2 [Access Token](https://gistauth.netlify.com) with the Gist scope enabled ([sarogist](https://github.com/shikhir-arora/sarogist) is linked as an example to do so).

- Edit the top of the `index.js` file on your forked repo and set the `const accessToken = ""` appropriately. 

- In your `package.json` for your project, require your forked repo.For example, to require this one: `"snekgist": "shikhir-arora/node-gist"` sooo... `"snekgist": "your-github-username/node-gist"` --> *see? let's keep it basic here!*

- Use as normal. The default behavior is Gist's are set to private (secret) as they likely should be.

*...yes, this was just intended to be used with [karma-simple](https://github.com/shikhir-arora/karma-simple) or some of my projects, so I didn't go through any effort to send your access token, and instead require you to fork and edit this. Ah well, there have been harder things in life, I'd hope!* 🙃 

```js
const gist = require('snekgist');

gist('hello').then(res => {
  console.log(res.html_url);
});
```
