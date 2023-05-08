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
