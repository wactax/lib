#!/usr/bin/env coffee

> @w5/avat
  path > join dirname
  @w5/uridir
  @w5/utf8/utf8e.js
  @w5/utf8/utf8d.js
  util

I = await import('../index.js')

T = avat I

T.tld('x.x.tax')('x.tax')

T.ipBin('127.0.0.1')(Buffer.from '7f000001','hex')

T.xxh32('xx')(Buffer.from '9c28d008','hex')

T.xxh64('xx')(Buffer.from 'bd1e84f06c741aa7','hex')

bin = Buffer.from '2323233165','hex'

T.xxh3B36(bin) '7akxEKnAegk'

z85 = 'S9l+a]'

T.cookieEncode(bin) z85
T.cookieDecode(z85) bin

z85_encoded = 'bo[A/###1g'

T.z85Dump(bin) z85_encoded

T.z85Load(z85_encoded) bin

li = [1,2,3,4]

T.zipU64(...li)(Buffer.from li)

n = 54321
li.push n

T.unzipU64(I.zipU64(...li))(li)

bin = Buffer.from [0x20, 0xd4, 0x31]
T.u64Bin(n)(bin)

T.binU64(bin)(n)

T.passwordHash('1','b')(Buffer.from('be2e7e763d74cf76a0a9632e701c6262', 'hex'))

