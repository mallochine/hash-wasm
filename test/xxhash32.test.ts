import fs from 'fs';
import { xxhash32 as origXXHash32, createXXHash32 } from '../lib';
import { ITypedArray } from '../lib/WASMInterface';
/* global test, expect */

const xxhash32 = async (
  data: string | Buffer | ITypedArray,
) => origXXHash32(data, 0x6789ABCD);

test('simple strings with 0 seed', async () => {
  expect(await origXXHash32('')).toBe('02cc5d05');
  expect(await origXXHash32('a')).toBe('550d7456');
  expect(await origXXHash32('a\x00')).toBe('19832f52');
  expect(await origXXHash32('abc')).toBe('32d153ff');
  expect(await origXXHash32('1234567890')).toBe('e8412d73');
});

test('simple strings', async () => {
  expect(await xxhash32('')).toBe('51c917a3');
  expect(await xxhash32('a')).toBe('88488ff7');
  expect(await xxhash32('1234567890')).toBe('e488df66');
  expect(await xxhash32('a\x00')).toBe('0e7c1075');
  expect(await xxhash32('abc')).toBe('344def81');
  expect(await xxhash32('message digest')).toBe('072766cd');
  expect(await xxhash32('abcdefghijklmnopqrstuvwxyz')).toBe('d4ea111e');
  expect(await xxhash32('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789')).toBe('7768b3a0');
  expect(await xxhash32('12345678901234567890123456789012345678901234567890123456789012345678901234567890')).toBe('6273ef9a');
});

test('unicode strings', async () => {
  expect(await xxhash32('😊')).toBe('6dcaa4fe');
  expect(await xxhash32('😊a😊')).toBe('421b3b97');
  const file = fs.readFileSync('./test/utf8.txt');
  expect(await xxhash32(file)).toBe('1807f963');
  expect(await xxhash32(file.toString())).toBe('1807f963');
});

test('Node.js buffers', async () => {
  expect(await xxhash32(Buffer.from([]))).toBe('51c917a3');
  expect(await xxhash32(Buffer.from(['a'.charCodeAt(0)]))).toBe('88488ff7');
  expect(await xxhash32(Buffer.from([0]))).toBe('666de50d');
  expect(await xxhash32(Buffer.from([0, 1, 0, 0, 2, 0]))).toBe('5fd527bb');
});

test('typed arrays', async () => {
  const arr = [0, 1, 2, 3, 4, 5, 255, 254];
  expect(await xxhash32(Buffer.from(arr))).toBe('7eebdfd4');
  const uint8 = new Uint8Array(arr);
  expect(await xxhash32(uint8)).toBe('7eebdfd4');
  expect(await xxhash32(new Uint16Array(uint8.buffer))).toBe('7eebdfd4');
  expect(await xxhash32(new Uint32Array(uint8.buffer))).toBe('7eebdfd4');
});

test('long strings', async () => {
  const SIZE = 5 * 1024 * 1024;
  const chunk = '012345678\x09';
  const str = (new Array(Math.floor(SIZE / chunk.length)).fill(chunk)).join('');
  expect(await xxhash32(str)).toBe('ee6e5c97');
});

test('long buffers', async () => {
  const SIZE = 5 * 1024 * 1024;
  const buf = Buffer.alloc(SIZE);
  buf.fill('\x00\x01\x02\x03\x04\x05\x06\x07\x08\xFF');
  expect(await xxhash32(buf)).toBe('d8416dcc');
});

test('chunked', async () => {
  const hash = await createXXHash32();
  expect(hash.digest()).toBe('02cc5d05');
  hash.init();
  hash.update('a');
  hash.update(new Uint8Array([0]));
  expect(hash.digest()).toBe('19832f52');
});

test('interlaced shorthand', async () => {
  const [hashA, hashB] = await Promise.all([
    origXXHash32('a'),
    origXXHash32('abc'),
  ]);
  expect(hashA).toBe('550d7456');
  expect(hashB).toBe('32d153ff');
});

test('interlaced create', async () => {
  const hashA = await createXXHash32();
  hashA.update('a');
  const hashB = await createXXHash32();
  hashB.update('abc');
  expect(hashA.digest()).toBe('550d7456');
  expect(hashB.digest()).toBe('32d153ff');
});

test('invalid parameters', async () => {
  await expect(origXXHash32('', -1)).rejects.toThrow();
  await expect(origXXHash32('', 'a' as any)).rejects.toThrow();
  await expect(origXXHash32('', 0xFFFFFFFF + 1)).rejects.toThrow();
  await expect(origXXHash32('', 0.1)).rejects.toThrow();
  await expect(origXXHash32('', Number.NaN)).rejects.toThrow();
});
