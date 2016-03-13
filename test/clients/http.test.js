import test from 'ava';
import httpClient, { canActivate } from '../../src/clients/http';

test('httpClient is a function', t => {
  t.is(typeof httpClient, 'function');
});

test('httpClient() requires an config object', async t => {
  try {
    await httpClient();
  } catch (err) {
    t.not(err, undefined);
  }
});

test('httpClient() returns a function', t => {
  t.is(typeof httpClient({ base: '//' }), 'function');
});
