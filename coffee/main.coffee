#!/usr/bin/env coffee

> @w5/avat
  path > join dirname
  @w5/uridir
  @w5/utf8/utf8e.js
  @w5/utf8/utf8d.js
  util

I = await import('../index.js')


T = avat I

bin = Buffer.from '2323233165','hex'

T.cookieEncode(bin) '!'
console.log '<<',I.cookieDecode('!')

# s = 'c'
#
# T.z85Dump(
#   s
# ) bin
#
# T.z85Load(bin) Buffer.from s,'utf8'
#
# li = [1,2,3,4]
#
# T.zipU64(...li)(Buffer.from li)
#
# n = 54321
# li.push n
#
# T.unzipU64(I.zipU64(...li))(li)
#
# bin = Buffer.from [0x20, 0xd4, 0x31]
# T.u64Bin(n)(bin)
#
# T.binU64(bin)(n)
#
# T.passwordHash('1','b')(Buffer.from('be2e7e763d74cf76a0a9632e701c6262', 'hex'))
#
