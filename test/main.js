#!/usr/bin/env -S node --loader=@w5/jsext --trace-uncaught --expose-gc --unhandled-rejections=strict --experimental-import-meta-resolve
var I, T, bin, li, n, s;

import avat from '@w5/avat';

import {
  join,
  dirname
} from 'path';

import uridir from '@w5/uridir';

import util from 'util';

I = (await import('../index.js'));

T = avat(I);

bin = Buffer.from('2323233165', 'hex');

console.log(I.cookieEncode(bin));

s = 'c';

T.z85Dump(s)(bin);

T.z85Load(bin)(Buffer.from(s, 'utf8'));

li = [1, 2, 3, 4];

T.zipU64(...li)(Buffer.from(li));

n = 54321;

li.push(n);

T.unzipU64(I.zipU64(...li))(li);

bin = Buffer.from([0x20, 0xd4, 0x31]);

T.u64Bin(n)(bin);

T.binU64(bin)(n);

T.passwordHash('1', 'b')(Buffer.from('be2e7e763d74cf76a0a9632e701c6262', 'hex'));
