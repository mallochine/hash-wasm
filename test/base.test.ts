/* eslint-disable no-await-in-loop */
/* global test, expect */
import {
  md4, md5, sha1, sha256, sha384, sha3, xxhash32, xxhash64,
} from '../lib';

test('Sync cycle multiple algorithms', async () => {
  for (let i = 0; i < 1000; i++) {
    expect(await md4('a')).toBe('bde52cb31de33e46245e05fbdbd6fb24');
    expect(await md5('a')).toBe('0cc175b9c0f1b6a831c399e269772661');
    expect(await sha1('a')).toBe('86f7e437faa5a7fce15d1ddcb9eaeaea377667b8');
    expect(await sha256('a')).toBe('ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb');
    expect(await sha384('a')).toBe('54a59b9f22b0b80880d8427e548b7c23abd873486e1f035dce9cd697e85175033caa88e6d57bc35efae0b5afd3145f31');
    expect(await sha3('a', 224)).toBe('9e86ff69557ca95f405f081269685b38e3a819b309ee942f482b6a8b');
    expect(await xxhash32('a', 0x6789ABCD)).toBe('88488ff7');
    expect(await xxhash64('a')).toBe('d24ec4f1a98c6e5b');
  }
});

test('String() input', async () => {
  expect(await md5(String('a'))).toBe('0cc175b9c0f1b6a831c399e269772661');
});

test('Invalid inputs throw', async () => {
  await expect(md5(0 as any)).rejects.toThrow();
  await expect(md5(1 as any)).rejects.toThrow();
  await expect(md5(Number(1) as any)).rejects.toThrow();
  await expect(md5({} as any)).rejects.toThrow();
  await expect(md5([] as any)).rejects.toThrow();
  await expect(md5(null as any)).rejects.toThrow();
  await expect(md5(undefined as any)).rejects.toThrow();
});
