#!/usr/bin/env -S node --loader=@w5/jsext --trace-uncaught --expose-gc --unhandled-rejections=strict --experimental-import-meta-resolve
var T, li;

import I from '../index.js';

import avat from '@w5/avat';

import {
  join,
  dirname
} from 'path';

import uridir from '@w5/uridir';

import util from 'util';

T = avat(I);

li = [1, 2, 3, 4];

T.zipU64(...li)(Buffer.from(li));

li.push(54321);

T.unzipU64(I.zipU64(...li))(li);
