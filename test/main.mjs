  //!/usr/bin/env coffee
import {
  zipU64
} from '../index.js';

import test from 'ava';

import {
  join,
  dirname
} from 'path';

import uridir from '@w5/uridir';

test('zipU64', (t) => {
  t.deepEqual(zipU64([1, 2, 3, 4]), Buffer.from([1, 2, 3, 4]));
});
