import test from 'ava';
import { deserialize } from '../src/serializer';
import Resource from '../src/resource';
import product from './fixtures/product';
import products from './fixtures/products';

test('deserialize() resource', async t => {
  const graph = await deserialize(product);

  t.is(Array.isArray(graph), true);
  t.is(graph.length, 2);
});

test('deserialize() collection', async t => {
  const graph = await deserialize(products);

  t.is(Array.isArray(graph), true);
  t.is(graph.length, 4);
});
