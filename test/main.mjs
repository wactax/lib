#!/usr/bin/env -S node --loader=@w5/jsext --trace-uncaught --expose-gc --unhandled-rejections=strict --experimental-import-meta-resolve
var T;

import index from '../index.js';

import avat from '@w5/avat';

import {
  join,
  dirname
} from 'path';

import uridir from '@w5/uridir';

import util from 'util';

T = avat(index);

T.zipU64(1, 2, 3, 4)(Buffer.from([1, 2, 3, 4]));
