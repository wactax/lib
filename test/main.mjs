#!/usr/bin/env -S node --loader=@w5/jsext --trace-uncaught --expose-gc --unhandled-rejections=strict --experimental-import-meta-resolve
var Eq;

import {
  zipU64
} from '../index.js';

import test from 'ava';

import {
  join,
  dirname
} from 'path';

import uridir from '@w5/uridir';

Eq = (func) => {
  return (...args) => {
    return (result) => {
      var name;
      ({name} = func);
      return test(name, async(t) => {
        var r;
        r = func(...args);
        if (r instanceof Promise) {
          name = 'await ' + name;
        }
        console.log('    ' + name + '(', args.map((i) => {
          return JSON.stringify(i);
        }).join(','), ')', '=', result);
        if (r instanceof Promise) {
          r = (await r);
        }
        t.deepEqual(r, result);
      });
    };
  };
};

Eq(zipU64)([1, 2, 3, 4])(Buffer.from([1, 2, 3, 4]));
