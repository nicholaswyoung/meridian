import get from 'lodash.get';
import set from 'lodash.set';
import remove from 'lodash.remove';
import find from 'lodash.find';

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

  get relationships() {
    return this._relationships;
  }

  add(id, type) {
    if (id.constructor === this.constructor) {
      type = id.type;
      id = id.id;
    }

    this._relationships.push({ id: id, type: type });
    return this;
  }

  remove(id, type) {
    if (id.constructor === this.constructor) {
      type = id.type;
      id = id.id;
    }

    remove(this._relationships, { id: id, type: type });
    return this;
  }

  load(id, type) {
    return find(this._relationships, {
      id: id,
      type: type
    });
  }

  toJSON() {
    return {
      id: this._id,
      type: this._type,
      relationships: this._relationships,
      ...this._payload
    };
  }
  
  get(key) {
    return key ? get(this._payload, key) : this._payload;
  }

  set(key, value) {
    return set(this._payload, key, value);
  }
}
