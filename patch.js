import autoe from "@w5/utf8/autoe.js";

const { zipU64: _zipU64, passwordHash: _passwordHash } = nativeBinding;

nativeBinding.zipU64 = (...args) => _zipU64(args);

nativeBinding.passwordHash = (...args) => _passwordHash(args.map(autoe));
