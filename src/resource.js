import get from 'lodash.get';
import set from 'lodash.set';
import remove from 'lodash.remove';
import find from 'lodash.find';
import findIndex from 'lodash.findindex';

export default class Resource {
  constructor(id, type, payload = {}) {
    this._id = id;
    this._type = type;
    this._payload = payload;
    this._relationships = [];
    this._refreshed_at = undefined;
  }

  static isResource(instance) {
    if (instance.constructor === this) {
      return true;
    }

    return false;
  }

  static toResource({ id, type }) {
    if (!id) {
      throw new Error('id parameter is required');
    }

    if (!type) {
      throw new Error('type parameter is required.');
    }

    return { id: id, type: type };
  }

  get id() {
    return this._id;
  }

  get type() {
    return this._type;
  }

  get refreshed_at() {
    return this._refreshed_at = new Date();
  }

  get relationships() {
    return this._relationships;
  }

  refresh() {
    this._refreshed_at = new Date();
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

  unload(id, type) {
    if (this.constructor.isResource(id)) {
      type = id.type;
      id = id.id;
    }

    const index = findIndex(this._relationships, {
      id: id,
      type: type
    });

    if (index !== -1) {
      this._relationships.splice(index, 1);
    }

    return this;
  }

  toJSON() {
    return {
      id: this._id,
      type: this._type,
      relationships: this._relationships,
      refreshed_at: this._refreshed_at,
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
