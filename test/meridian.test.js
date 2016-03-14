import test from 'ava';
import { setup } from '../src';
import product from './fixtures/product';
import products from './fixtures/products';
import server from './support/server';

server.listen(4000);

const client = setup({
  base: 'http://localhost:4000'
});

test('sync()', async t => {
  const result = await client.sync(products, { raw: true });

  t.is(Object.keys(result).length, 2);
});

test('sync() with existing record handles refresh', async t => {
  const multi  = await client.sync(products, { raw: true });
  const single = await client.sync(product, { raw: true });

  t.not(single.products[0].refreshed_at, undefined);
});

test('sync() via http', async t => {
  const result = await client.sync({
    endpoint: '/products.json'
  });

  const keys = Object.keys(result);
  
  t.is(typeof result, 'object');
  t.not(keys.indexOf('products'), -1);
  t.not(keys.indexOf('categories'), -1);
});

test('sync() without required params', async t => {
  try {
    const result = await client.sync({});
  } catch (err) {
    t.not(err, undefined);
  }
});

test('sync() with bad endpoint', async t => {
  try {
    const result = await client.sync({
      endpoint: 'xxx'
    });
  } catch (err) {
    t.not(err, undefined);
  }
});

test('sync() with unauthorized endpoint', async t => {
  try {
    const result = await client.sync({
      endpoint: '/401'
    });
  } catch (err) {
    t.not(err, undefined);
    t.same(err, ['unauthorized req']);
  }
});

test('sync() with create', async t => {
  const result = await client.sync({
    endpoint: '/products',
    method: 'create',
    payload: {
      id: '1',
      type: 'phone',
      name: 'iPhone 6'
    }
  });
});

test('sync() with update', async t => {
  const result = await client.sync({
    endpoint: '/products/2',
    method: 'update',
    payload: {
      name: 'Steiff Teddy Bear'
    }
  });
});

test('sync() with delete', async t => {
  const result = await client.sync({
    endpoint: '/products/2',
    method: 'delete'
  });
});
