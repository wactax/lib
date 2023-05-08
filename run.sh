#!/usr/bin/env bash

DIR=$(realpath $0) && DIR=${DIR%/*}
cd $DIR
set -ex

yarn run build:debug
RUST_BACKTRACE=short yarn test 2>out.txt
glow -s dracula out.txt
