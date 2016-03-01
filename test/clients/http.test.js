import test from 'ava';
import { createClient } from '../../src/clients/http';

const client = createClient('http://localhost:4000');

test('createClient is a function', t => {
  t.is(typeof createClient, 'function');
});

test('createClient() returns a function', t => {
  t.is(typeof createClient('http://localhost:4000'), 'function');
});

test('createClient() accepts an initialization object', t => {
  t.is(typeof createClient({
    base: 'http://localhost:4000'
  }), 'function');
});
