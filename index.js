'use strict';
const http = require('https');

module.exports = function (files, options) {
  return new Promise((resolve, reject) => {
    options = options || { public: true, description: '' };
    if (typeof files === 'string') files = { 'default': {'content': files} };
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

    const req = http.request({
      host: 'api.github.com',
      port: 443,
      path: '/gists',
      method: 'POST',
      headers: {
        'User-Agent': 'node-gist',
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
