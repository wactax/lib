[‼️]: ✏️README.mdt

# @w5/lib

## Install

```
pnpm i -g @w5/lib
```

## Test

[coffee/main.coffee](./coffee/main.coffee) :

```coffee
#!/usr/bin/env coffee

> ../index.js
  ava:test
  path > join dirname
  @w5/uridir
  util

T = new Proxy(
  {}
  get:(_,name)=>
    func = index[name]
    (args...)=>
      (result)=>
        test(
          name
          (t)=>
            r = func(...args)
            if r instanceof Promise
              name = 'await '+name
            console.log '`'+name+'(', args.map(
              (i)=>JSON.stringify i
            ).join(','), ')`', ' → `'+util.format(result)+'`\n'
            if r instanceof Promise
              r = await r
            t.deepEqual(
              r
              result
            )
            return
        )
)

T.zipU64(1,2,3,4)(
  Buffer.from [1,2,3,4]
)
```

output :

`zipU64( 1,2,3,4 )`  → `<Buffer 01 02 03 04>`
