#!/usr/bin/env coffee

> ../index.js
  @w5/avat
  path > join dirname
  @w5/uridir
  util

T = avat index

T.zipU64(1,2,3,4)(
  Buffer.from [1,2,3,4]
)

