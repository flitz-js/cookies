[![npm](https://img.shields.io/npm/v/@flitz/cookies.svg)](https://www.npmjs.com/package/@flitz/cookies) [![supported flitz version](https://img.shields.io/static/v1?label=flitz&message=0.8.3%2B&color=blue)](https://github.com/flitz-js/flitz) [![last build](https://img.shields.io/github/workflow/status/flitz-js/cookies/Publish)](https://github.com/flitz-js/cookies/actions?query=workflow%3APublish) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/flitz-js/cookies/pulls)

# @flitz/cookies

> A cookie middleware for [flitz](https://github.com/flitz-js/flitz).

## Install

Run

```bash
npm install --save @flitz/cookies
```

from the folder, where your `package.json` is stored.

## Usage

```javascript
const flitz = require('flitz');
const cookies = require('@flitz/cookies');

const run = async () => {
  const app = flitz();

  app.get('/', [ cookies() ], async (req, res) => {
    res.write( JSON.stringify(req.cookies) );
    res.end();
  });

  await app.listen(3000);
};

run();
```

Or the TypeScript way:

```typescript
import flitz from 'flitz';
import { cookies } from '@flitz/cookies';

const run = async () => {
  const app = flitz();

  app.get('/', [ cookies() ], async (req, res) => {
    res.write( JSON.stringify(req.cookies) );
    res.end();
  });

  await app.listen(3000);
};

run();
```

## TypeScript

TypeScript is optionally supported. The module contains its own [definition files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html).

## License

MIT © [Marcel Kloubert](https://github.com/mkloubert)
