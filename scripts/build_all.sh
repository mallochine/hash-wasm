#!/bin/bash

emcc -O3 -s WASM=1 \
  -s INITIAL_MEMORY=256KB -s TOTAL_STACK=128KB -s MODULARIZE=1 -s STANDALONE_WASM=1 /app/src/md4.c -o /app/wasm/md4.wasm

emcc -O3 -s WASM=1 \
  -s INITIAL_MEMORY=256KB -s TOTAL_STACK=128KB -s MODULARIZE=1 -s STANDALONE_WASM=1 /app/src/md5.c -o /app/wasm/md5.wasm

emcc -O3 -s WASM=1 \
  -s INITIAL_MEMORY=256KB -s TOTAL_STACK=128KB -s MODULARIZE=1 -s STANDALONE_WASM=1 /app/src/crc32.c -o /app/wasm/crc32.wasm

emcc -O3 -s WASM=1 \
  -s INITIAL_MEMORY=256KB -s TOTAL_STACK=128KB -s MODULARIZE=1 -s STANDALONE_WASM=1 /app/src/sha1.c -o /app/wasm/sha1.wasm

emcc -O3 -s WASM=1 \
  -s INITIAL_MEMORY=256KB -s TOTAL_STACK=128KB -s MODULARIZE=1 -s STANDALONE_WASM=1 /app/src/sha256.c -o /app/wasm/sha256.wasm

emcc -O3 -s WASM=1 \
  -s INITIAL_MEMORY=256KB -s TOTAL_STACK=128KB -s MODULARIZE=1 -s STANDALONE_WASM=1 /app/src/sha512.c -o /app/wasm/sha512.wasm

emcc -O3 -s WASM=1 \
  -s INITIAL_MEMORY=256KB -s TOTAL_STACK=128KB -s MODULARIZE=1 -s STANDALONE_WASM=1 /app/src/sha3.c -o /app/wasm/sha3.wasm

emcc -O3 -s WASM=1 \
  -s INITIAL_MEMORY=256KB -s TOTAL_STACK=128KB -s MODULARIZE=1 -s STANDALONE_WASM=1 /app/src/xxhash32.c -o /app/wasm/xxhash32.wasm

emcc -O3 -s WASM=1 \
  -s INITIAL_MEMORY=256KB -s TOTAL_STACK=128KB -s MODULARIZE=1 -s STANDALONE_WASM=1 /app/src/xxhash64.c -o /app/wasm/xxhash64.wasm
