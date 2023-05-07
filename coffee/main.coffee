#!/usr/bin/env coffee

> ../index.js > zipU64
  ava:test
  path > join dirname
  @w5/uridir

Eq = (func)=>
  (args...)=>
    (result)=>
      {name} = func
      test(
        name
        (t)=>
          r = func(...args)
          if r instanceof Promise
            name = 'await '+name
          console.log '    '+name+'(', args.map(
            (i)=>JSON.stringify i
          ).join(','), ')', '=',result
          if r instanceof Promise
            r = await r
          t.deepEqual(
            r
            result
          )
          return

      )


Eq(zipU64)([1,2,3,4])(
  Buffer.from [1,2,3,4]
)

