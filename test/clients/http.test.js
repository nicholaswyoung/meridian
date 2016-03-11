import test from 'ava';
import { configureClient } from '../../src/clients/http';

const client = configureClient('http://localhost:4000');

test('configureClient is a function', t => {
  t.is(typeof configureClient, 'function');
});

test('configureClient() returns a function', t => {
  t.is(typeof configureClient('http://localhost:4000'), 'function');
});

test('configureClient() accepts an initialization object', t => {
  t.is(typeof configureClient({
    base: 'http://localhost:4000'
  }), 'function');
});
