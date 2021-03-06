import flitz, { Flitz } from 'flitz';
import { Response } from 'supertest';
import { cookies } from './index';

type Parser = (res: Response, callback: (err: Error | null, body: any) => void) => void;

declare global {
  namespace NodeJS {
    interface Global {
      /**
       * That function is ONLY available in test files!
       */
      createTestApp(): Flitz;
      /**
       * That function is ONLY available in test files!
       */
      parseBody: Parser;
    }
  }
}

global.createTestApp = () => {
  const app = flitz();

  app.get('/echo', [cookies()], async (req, res) => {
    res.write(JSON.stringify(req.cookies));
    res.end();
  });

  return app;
};

global.parseBody = (res, callback) => {
  let data = Buffer.alloc(0);

  res.once('error', err => {
    callback(err, null);
  });

  res.on('data', (chunk: Buffer) => {
    data = Buffer.concat([data, chunk]);
  });

  res.once('end', () => {
    callback(null, data);
  });
};
