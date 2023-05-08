#!/usr/bin/env -S node --loader=@w5/jsext --trace-uncaught --expose-gc --unhandled-rejections=strict --experimental-import-meta-resolve
var I, T, bin, li, n;

import avat from '@w5/avat';

import {
  join,
  dirname
} from 'path';

import uridir from '@w5/uridir';

import util from 'util';

I = (await import('../index.js'));

console.log('>>>', (await I.passwordHash('1', 'b')));

T = avat(I);

li = [1, 2, 3, 4];

T.zipU64(...li)(Buffer.from(li));

n = 54321;

li.push(n);

T.unzipU64(I.zipU64(...li))(li);

bin = Buffer.from([0x20, 0xd4, 0x31]);

T.u64Bin(n)(bin);

T.binU64(bin)(n);
