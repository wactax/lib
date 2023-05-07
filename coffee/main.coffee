#!/usr/bin/env coffee

> ../index.js > zipU64
  ava:test
  path > join dirname
  @w5/uridir

Eq = (func, args...)=>
  (result)=>
    test(
      func.name
      (t)=>
        t.deepEqual(
          await func(...args)
          result
        )

    )


Eq(
  zipU64
  [1,2,3,4]
)(
  Buffer.from [1,2,3,4]
)

