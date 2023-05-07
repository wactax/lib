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

Eq = (func, ...args) => {
  return (result) => {
    return test(func.name, async(t) => {
      return t.deepEqual((await func(...args)), result);
    });
  };
};

Eq(zipU64, [1, 2, 3, 4])(Buffer.from([1, 2, 3, 4]));
