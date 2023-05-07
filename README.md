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
```

output :

`zipU64( 1,2,3,4 )`  → `<Buffer 01 02 03 04>`

`unzipU64( <Buffer 01 02 03 04 b1 a8 03> )`  → `[ 1, 2, 3, 4, 54321 ]`
