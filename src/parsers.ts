// Copyright 2020-present Marcel Joachim Kloubert <marcel.kloubert@gmx.net>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import { Middleware } from 'flitz';

/**
 * Creates a new middleware that parses submitted cookies
 * into 'cookies' property of request context as key/value pairs.
 * 
 * @returns {Middleware} The new middleware.
 */
export function cookies(): Middleware {
  return async (req, res, next) => {
    req.cookies = {};

    if (req.headers['cookie']) {
      const cookieList = req.headers['cookie']
        .split(';')
        .map(c => c.trim())
        .filter(c => c !== '');

      for (const c of cookieList) {
        let name: string;
        let value: string;

        const sep = c.indexOf('=');
        if (sep > -1) {
          name = c.substr(0, sep).trim();
          value = c.substr(sep + 1);
        } else {
          name = c;
          value = '';
        }

        req.cookies[name] = value;
      }
    }

    next();
  };
}
