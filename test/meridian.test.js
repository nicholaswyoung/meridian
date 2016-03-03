import test from 'ava';
import { setup } from '../src';
import product from './fixtures/product';
import products from './fixtures/products';

const client = setup();

test('sync()', async t => {
  const synced = await client.sync(product);

  t.is(synced.length, 2);
});
