#!/usr/bin/env -S node --loader=@w5/jsext --trace-uncaught --expose-gc --unhandled-rejections=strict --experimental-import-meta-resolve
var T;

import index from '../index.js';

import test from 'ava';

import {
  join,
  dirname
} from 'path';

import uridir from '@w5/uridir';

import util from 'util';

T = new Proxy({}, {
  get: (_, name) => {
    var func;
    func = index[name];
    return (...args) => {
      return (result) => {
        return test(name, async(t) => {
          var r;
          r = func(...args);
          if (r instanceof Promise) {
            name = 'await ' + name;
          }
          console.log('`' + name + '(', args.map((i) => {
            return JSON.stringify(i);
          }).join(','), ')`', ' → `' + util.format(result) + '`\n');
          if (r instanceof Promise) {
            r = (await r);
          }
          t.deepEqual(r, result);
        });
      };
    };
  }
});

T.zipU64(1, 2, 3, 4)(Buffer.from([1, 2, 3, 4]));
