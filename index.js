'use strict';

const https = require('https');

const accessToken = "oauth2authtoken"

module.exports = function gist(files, options = { public: false, description: 'Overflow Output:' }) {
  return new Promise((resolve, reject) => {
    if (typeof files === 'string') files = { 'overflow.hs': {'content': files} };
    if (Array.isArray(files)) {
      const final = {};
      for (const file of files) final[file.name] = { content: file.content };
      files = final;
    }

    const body = {
      files,
      description: options.description,
      public: options.public
    };

    const req = https.request({
      host: 'api.github.com',
      port: 443,
      path: '/gists',
      method: 'POST',
      headers: {
        'Authorization': 'token ' + accessToken,
        'User-Agent': 'SaroGist Discord/Overflow',
        'Content-Type': 'application/json'
      }
    }, (res) => {
      res.body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        res.body += chunk;
      });
      res.on('end', () => {
        try {
          resolve(JSON.parse(res.body));
        } catch (err) {
          reject(err);
        }
      });
      res.on('error', reject);
    });

    req.end(JSON.stringify(body));
  });
};
