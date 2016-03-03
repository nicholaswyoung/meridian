import find from 'lodash.find';
import { isResource } from './matcher';
import Resource from './resource';

export function deserialize(payload = {}, options = {}) {
  return new Promise((resolve, reject) => {
    let {
      errors,
      included,
      data
    } = payload;

    if (errors) {
      return reject(errors);
    }

    const resources = [];

    if (included) {
      included = populate(included);
    }

    if (data) {
      data = populate(data, included);
    }

    function findOrCreate(id, type, attributes = {}) {
      let result = find(resources, { id: id, type: type });

      if (!result) {
        result = new Resource(id, type, attributes);
        resources.push(result);
      }

      return result;
    }

    function populate(payload = {}) {
      if (Array.isArray(payload)) {
        return payload.map(populate);
      }

      if (!isResource(payload)) {
        return;
      }

      let {
        id,
        type,
        relationships,
        ...attributes
      } = payload;

      const record = findOrCreate(id, type, attributes);

      if (relationships) {
        Object.keys(relationships).map(key => {
          const rel = 
            relationships[key].data || relationships[key];

          if (!isResource(rel)) {
            return;
          }

          record.add(rel.type, rel.id);
        });
      }

      return record;
    }

    resolve(resources);
  });
}
