import test from 'ava';
import { configureStore } from '../src/store';
import Resource from '../src/resource';

const db = configureStore();

test('configureStore should be a function', t => {
  t.is(typeof configureStore, 'function');
});

test('configureStore() should return an object', t => {
  t.is(typeof db, 'object');
});

test('configureStore() should expose save, find', t => {
  t.is(typeof db.save, 'function');
  t.is(typeof db.find, 'function');
});

test('save() should receive a Resource, serialize and save', async t => {
  const record = new Resource(678, 'product', {
    data: { title: 'Steiff Teddy Bear' }
  });

  const saved = await db.save(record);

  t.same(saved, record);
});

test('save() should populate `_refreshed_at`', async t => {
  const record = new Resource(678, 'product', {
    data: { title: 'Steiff Teddy Bear' }
  });

  t.is(typeof record._refreshed_at, 'undefined');

  const saved = await db.save(record);

  t.not(typeof record._refreshed_at, 'undefined');
  t.same(saved, record);
});

test('find() should retrieve existing documents', async t => {
    const record = new Resource(78, 'product', {
      data: { title: 'Steiff Teddy Bear' }
    });

    const saved = await db.save(record);
    
    t.same(saved, record);

    const result = await db.find(saved.id, saved.type);

    t.same(result.title, saved.title);
});

test('Resource.find() should return existing documents', async t => {
  const record = new Resource(598, 'singles', {
    title: 'Life Less Ordinary'
  });

  const saved = await db.save(record);
  const found = await db.find(598, 'singles');

  t.is(saved.get('title'), found.get('title'));
  t.is(found.get('xyz'), undefined);
});

test('find() with undefined id or type returns undefined', async t => {
  try {
    const notFound = await db.find(999, 'product');
  } catch (err) {
    t.not(err, undefined);
  }

  try {
    const notFoundII = await db.find(998);
  } catch (err) {
    t.not(err, undefined);
  }

  try {
    const notFoundIII = await db.find();
  } catch (err) {
    t.not(err, undefined);
  }
});

test('save() should return a valid Resource instance', async t => {
  const record = new Resource(587, 'singles', {
    title: 'Miss Hollywood'
  });

  const saved = await db.save(record);

  t.true(saved instanceof Resource);
  t.is(saved.get('title'), 'Miss Hollywood');
  t.is(saved.get('xyz'), undefined);
});
