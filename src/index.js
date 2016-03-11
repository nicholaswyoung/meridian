import groupby from 'lodash.groupby';
import pluralize from 'pluralize';
import { configureStore } from './store';
import { configureClient } from './clients/http';
import { deserialize } from './serializer';

export function setup(options = {}) {
  options = {
    store: {},
    client: {},
    ...options
  };

  const store  = configureStore(options.store);
  const client = configureClient(options.client);

  function handle(resource) {
    return store.find(resource).then(res => {
      return res;
    }).catch(() => {
      return store.save(resource);
    });
  }

  function map(resources) {
    return Promise.all(resources.map(handle));
  }

  function sync(endpoint, options = {}) {
    const chain = (...args) => {
      return deserialize(...args).then(map).then(render);
    }

    if (typeof endpoint === 'object') {
      return chain(endpoint, options);
    }

    return request(endpoint, options).then(payload => {
      return chain(payload, options);
    }).then(map).then(render);
  }

  function render(resources) {
    return groupby(resources, resource => {
      return pluralize(resource.type);
    });
  }

  function request(endpoint, options) {
    return client(endpoint, options).then(response => {
      if (!response.ok) {
        throw new Error(response);
      }

      return response.jsonData;
    });
  }

  return {
    sync: sync,
    store: store
  };
}
