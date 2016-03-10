import test from 'ava';
import product from './fixtures/product';
import { validate } from '../src/validator';

test('validate() with a valid document', async t => {
  const result = await validate(product);
  t.is(result.valid, true);
});

test('validate() with an invalid document', async t => {
  const input = product;
  delete input.data;

  try {
    const result = await validate(input);
  } catch(err) {
    t.not(err, undefined);
    t.not(err.errors, undefined);
  }
});
