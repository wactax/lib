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
```

output :

`tld( "x.x.tax" )` 
  → `x.tax`

`ipBin( "127.0.0.1" )` 
  → `<Buffer 7f 00 00 01>`

`xxh32( "xx" )` 
  → `<Buffer 9c 28 d0 08>`

`xxh64( "xx" )` 
  → `<Buffer bd 1e 84 f0 6c 74 1a a7>`

`xxh3B36( <Buffer 23 23 23 31 65> )` 
  → `7akxEKnAegk`

`cookieEncode( <Buffer 23 23 23 31 65> )` 
  → `S9l+a]`

`cookieDecode( "S9l+a]" )` 
  → `<Buffer 23 23 23 31 65>`

`z85Dump( <Buffer 23 23 23 31 65> )` 
  → `bo[A/###1g`

`z85Load( "bo[A/###1g" )` 
  → `<Buffer 23 23 23 31 65>`

`zipU64( 1,2,3,4 )` 
  → `<Buffer 01 02 03 04>`

`unzipU64( <Buffer 01 02 03 04 b1 a8 03> )` 
  → `[ 1, 2, 3, 4, 54321 ]`

`u64Bin( 54321 )` 
  → `<Buffer 20 d4 31>`

`binU64( <Buffer 20 d4 31> )` 
  → `54321`

`await passwordHash( "1","b" )` 
  → `<Buffer be 2e 7e 76 3d 74 cf 76 a0 a9 63 2e 70 1c 62 62>`
