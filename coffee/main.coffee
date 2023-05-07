#!/usr/bin/env coffee

> ../index.js > zipU64
  ava:test
  path > join dirname
  @w5/uridir

test(
  'zipU64'
  (t) =>
    t.deepEqual(
      zipU64([1,2,3,4]),
      Buffer.from [1,2,3,4]
    )
    return
)
