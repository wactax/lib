import { createRequire } from "module";
import { dirname, sep } from "path";
const __dirname = dirname(decodeURIComponent(import.meta.url.slice(sep=='/'? 7:8)));
const require = createRequire(import.meta.url);/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

/* auto-generated by NAPI-RS */

import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

const { platform, arch } = process

let nativeBinding = null
let localFileExisted = false
let loadError = null

function isMusl() {
  // For Node 10
  if (!process.report || typeof process.report.getReport !== 'function') {
    try {
      const lddPath = require('child_process').execSync('which ldd').toString().trim();
      return readFileSync(lddPath, 'utf8').includes('musl')
    } catch (e) {
      return true
    }
  } else {
    const { glibcVersionRuntime } = process.report.getReport().header
    return !glibcVersionRuntime
  }
}

switch (platform) {
  case 'android':
    switch (arch) {
      case 'arm64':
        localFileExisted = existsSync(join(__dirname, 'lib.android-arm64.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./lib.android-arm64.node')
          } else {
            nativeBinding = require('@w5/lib-android-arm64')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'arm':
        localFileExisted = existsSync(join(__dirname, 'lib.android-arm-eabi.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./lib.android-arm-eabi.node')
          } else {
            nativeBinding = require('@w5/lib-android-arm-eabi')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on Android ${arch}`)
    }
    break
  case 'win32':
    switch (arch) {
      case 'x64':
        localFileExisted = existsSync(
          join(__dirname, 'lib.win32-x64-msvc.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./lib.win32-x64-msvc.node')
          } else {
            nativeBinding = require('@w5/lib-win32-x64-msvc')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'ia32':
        localFileExisted = existsSync(
          join(__dirname, 'lib.win32-ia32-msvc.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./lib.win32-ia32-msvc.node')
          } else {
            nativeBinding = require('@w5/lib-win32-ia32-msvc')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'arm64':
        localFileExisted = existsSync(
          join(__dirname, 'lib.win32-arm64-msvc.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./lib.win32-arm64-msvc.node')
          } else {
            nativeBinding = require('@w5/lib-win32-arm64-msvc')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on Windows: ${arch}`)
    }
    break
  case 'darwin':
    localFileExisted = existsSync(join(__dirname, 'lib.darwin-universal.node'))
    try {
      if (localFileExisted) {
        nativeBinding = require('./lib.darwin-universal.node')
      } else {
        nativeBinding = require('@w5/lib-darwin-universal')
      }
      break
    } catch {}
    switch (arch) {
      case 'x64':
        localFileExisted = existsSync(join(__dirname, 'lib.darwin-x64.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./lib.darwin-x64.node')
          } else {
            nativeBinding = require('@w5/lib-darwin-x64')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'arm64':
        localFileExisted = existsSync(
          join(__dirname, 'lib.darwin-arm64.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./lib.darwin-arm64.node')
          } else {
            nativeBinding = require('@w5/lib-darwin-arm64')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on macOS: ${arch}`)
    }
    break
  case 'freebsd':
    if (arch !== 'x64') {
      throw new Error(`Unsupported architecture on FreeBSD: ${arch}`)
    }
    localFileExisted = existsSync(join(__dirname, 'lib.freebsd-x64.node'))
    try {
      if (localFileExisted) {
        nativeBinding = require('./lib.freebsd-x64.node')
      } else {
        nativeBinding = require('@w5/lib-freebsd-x64')
      }
    } catch (e) {
      loadError = e
    }
    break
  case 'linux':
    switch (arch) {
      case 'x64':
        if (isMusl()) {
          localFileExisted = existsSync(
            join(__dirname, 'lib.linux-x64-musl.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./lib.linux-x64-musl.node')
            } else {
              nativeBinding = require('@w5/lib-linux-x64-musl')
            }
          } catch (e) {
            loadError = e
          }
        } else {
          localFileExisted = existsSync(
            join(__dirname, 'lib.linux-x64-gnu.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./lib.linux-x64-gnu.node')
            } else {
              nativeBinding = require('@w5/lib-linux-x64-gnu')
            }
          } catch (e) {
            loadError = e
          }
        }
        break
      case 'arm64':
        if (isMusl()) {
          localFileExisted = existsSync(
            join(__dirname, 'lib.linux-arm64-musl.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./lib.linux-arm64-musl.node')
            } else {
              nativeBinding = require('@w5/lib-linux-arm64-musl')
            }
          } catch (e) {
            loadError = e
          }
        } else {
          localFileExisted = existsSync(
            join(__dirname, 'lib.linux-arm64-gnu.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./lib.linux-arm64-gnu.node')
            } else {
              nativeBinding = require('@w5/lib-linux-arm64-gnu')
            }
          } catch (e) {
            loadError = e
          }
        }
        break
      case 'arm':
        localFileExisted = existsSync(
          join(__dirname, 'lib.linux-arm-gnueabihf.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./lib.linux-arm-gnueabihf.node')
          } else {
            nativeBinding = require('@w5/lib-linux-arm-gnueabihf')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on Linux: ${arch}`)
    }
    break
  default:
    throw new Error(`Unsupported OS: ${platform}, architecture: ${arch}`)
}

if (!nativeBinding) {
  if (loadError) {
    throw loadError
  }
  throw new Error(`Failed to load native binding`)
}

;
import autoe from "@w5/utf8/autoe.js";
import { u8merge } from "@w5/u8";

const { zipU64: _zipU64 } = nativeBinding;

nativeBinding.zipU64 = (...args) => _zipU64(args);

const wrap = (w) =>
	new Proxy(
		{},
		{
			get: (_, name) => {
				const func = nativeBinding[name];
				nativeBinding[name] = w(func);
				return;
			},
		},
	);

const Autoe = wrap((func) => (s) => func(autoe(s)));

const AutoeLi = wrap((func) => (...args) => func(u8merge(...args.map(autoe))));

AutoeLi.passwordHash;
AutoeLi.cookieEncode;
AutoeLi.xxh64;
AutoeLi.xxh32;
AutoeLi.xxh3B36;

Autoe.tld;
Autoe.z85Dump;
Autoe.z85Load;

export const cookieDecode = nativeBinding.cookieDecode;
export const cookieEncode = nativeBinding.cookieEncode;
export const xxh64 = nativeBinding.xxh64;
export const xxh32 = nativeBinding.xxh32;
export const xxh3B36 = nativeBinding.xxh3B36;
export const ipBin = nativeBinding.ipBin;
export const tld = nativeBinding.tld;
export const randomBytes = nativeBinding.randomBytes;
export const z85Dump = nativeBinding.z85Dump;
export const z85Load = nativeBinding.z85Load;
export const u64Bin = nativeBinding.u64Bin;
export const binU64 = nativeBinding.binU64;
export const zipU64 = nativeBinding.zipU64;
export const unzipU64 = nativeBinding.unzipU64;
export const passwordHash = nativeBinding.passwordHash;