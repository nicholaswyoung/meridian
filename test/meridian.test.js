import test from 'ava';
import { setup } from '../src';
import product from './fixtures/product';
import products from './fixtures/products';

const client = setup();

test('sync()', async t => {
  const result = await client.sync(products);
  
  t.is(Object.keys(result).length, 2);
});
