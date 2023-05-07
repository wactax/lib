#!/usr/bin/env coffee

> ../index.js:I
  @w5/avat
  path > join dirname
  @w5/uridir
  util

T = avat I

li = [1,2,3,4]

T.zipU64(...li)(Buffer.from li)

li.push 54321

T.unzipU64(I.zipU64(...li))(li)

