const _zipU64 = nativeBinding.zipU64;
nativeBinding.zipU64 = (...args) => _zipU64(args);
