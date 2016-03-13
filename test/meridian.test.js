import test from 'ava';
import { setup } from '../src';
import product from './fixtures/product';
import products from './fixtures/products';

const client = setup({
  base: 'http://localhost:4000'
});

test('sync()', async t => {
  const result = await client.sync(products);
});

test('sync() with existing record handles refresh', async t => {
  const multi  = await client.sync(products);
  const single = await client.sync(product);
});
