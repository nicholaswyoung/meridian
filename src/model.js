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

  toJSON() {
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
}
