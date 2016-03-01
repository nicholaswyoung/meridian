import levelup from 'levelup';
import sublevel from 'level-sublevel';
import memdown from 'memdown';
import Model from './model';

export function configureStore(options = {}) {
  let db;

  options = {
    db: memdown,
    keyEncoding: 'json',
    valueEncoding: 'json',
    ...options
  };

  if (db) {
    return db;
  }

  db = sublevel(levelup(options));

  function save(model) {
    const {
      id,
      type,
      ...attributes
    } = model;

    const storage = db.sublevel(type);

    return new Promise((resolve, reject) => {
      storage.put(id, model.toJSON(), err => {
        if (err) {
          return reject(err);
        }

        resolve(model);
      });
    });
  }

  function find(id, type) {
    const storage = db.sublevel(type);

    return new Promise((resolve, reject) => {
      storage.get(id, (err, value) => {
        if (err) {
          return reject(err);
        }

        const {
          id,
          type,
          ...attributes
        } = value;

        resolve(new Model(id, type, attributes));
      });
    });
  }

  return {
    save: save,
    find: find 
  };
}
