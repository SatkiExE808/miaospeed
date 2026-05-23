# Personal build — SatkiExE808/miaospeed

This is a personal build fork of [`MiaoMagic/miaospeed`](https://github.com/MiaoMagic/miaospeed).
Upstream README is preserved as [`README.md`](README.md).

## What's different

1. The 7 build-required `embeded/` files are committed as **self-build stubs** so this repo compiles out of the box. None of them are usable with the closed-source `miaoko` frontend — they're for standalone use only:
   - `utils/embeded/BUILDTOKEN.key` — random per-build signing token (publicly visible by design per upstream README).
   - `preconfigs/embeded/miaokoCA/miaoko.{crt,key}` — self-signed, **NOT** the real miaoko CA.
   - `preconfigs/embeded/ca-certificates.crt` — Mozilla root bundle (from Debian's `ca-certificates`).
   - `preconfigs/embeded/speedtesturl` — one URL per line, used by SpeedTest "DYNAMIC ALL_INTL" mode.
   - `engine/embeded/{predefined,default_geoip,default_ip}.js` — minimal stubs.
2. The upstream CI (`.github/workflows/test-build.yml`) is replaced with [`build.yml`](.github/workflows/build.yml). This one needs **no secrets**: it builds `core` + `meta` variants for `linux/{amd64,arm64}` and `darwin/{amd64,arm64}` on every push to `master`, and creates a GitHub Release with downloadable binaries when you push a `v*` tag.

## License

AGPLv3 (same as upstream). Modifications kept in plain commits for compliance.
