#!/usr/bin/env coffee


> @w5/avat
  path > join dirname
  @w5/uridir
  util

T = avat await import('../index.js')

li = [1,2,3,4]

T.zipU64(...li)(Buffer.from li)

n = 54321
li.push n

T.unzipU64(I.zipU64(...li))(li)

bin = Buffer.from [0x20, 0xd4, 0x31]
T.u64Bin(n)(bin)

T.binU64(bin)(n)
