import get from 'lodash.get';
import set from 'lodash.set';

export default class Model {
  constructor(id, type, payload = {}) {
    this._id = id;
    this._type = type;
    this._payload = payload;
    this._relationships = [];
  }

  get id() {
    return this._id;
  }

  get type() {
    return this._type;
  }

  get _document() {
    return {
      id: this._id,
      type: this._type,
      ...this._payload
    };
  }
  
  get(key) {
    return get(this._payload, key);
  }

  set(key, value) {
    return set(this._payload, key, value);
  }

  save(db) {
    const storage = db.sublevel(this.type);

    return new Promise((resolve, reject) => {
      storage.put(this.id, this._document, err => {
        if (err) {
          return reject(err);
        }

        resolve(this);
      });
    })
  }

  static find(db, id, type) {
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

  static findOrCreate(db, id, type, payload = {}) {
    return this.find(db, id, type).then(record => {
      return record;
    }).catch(() => {
      return new this(id, type, payload).save(db);
    });
  }
}
