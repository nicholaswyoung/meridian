import test from 'ava';
import httpClient, {
  canActivate,
  mapAction
} from '../../src/clients/http';

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

test('canActivate() should fail without proper params', t => {
  t.is(canActivate({ method: 'create', base: '//' }), true);
  t.is(canActivate({ base: '//' }), true);
  t.is(canActivate(), false);
  t.is(canActivate({ method: 'get' }), false);
});

test('mapAction ingests both objects and strings', t => {
  t.is(mapAction('create'), 'post');
  t.is(mapAction({ method: 'create' }), 'post');
});

test('mapAction maps action specifiers to HTTP methods', t => {
  t.is(mapAction(), 'get');
});
