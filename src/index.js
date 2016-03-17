import find from 'lodash.find';
import groupby from 'lodash.groupby';
import pluralize from 'pluralize';
import { configureStore } from './store';
import httpClient, { canActivate } from './clients/http';
import { deserialize } from './serializer';

export function setup(options = {}) {
  options = {
    clients: {
      http: {
        callback: httpClient,
        canActivate: canActivate
      }
    },
    ...options
  };

  const { clients, ...globs } = options;
  const store = configureStore(globs);
  
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

  function render(resources) {
    return groupby(resources, resource => {
      return pluralize(resource.type);
    });
  }

  function sync(req = {}, locals = {}) {
    locals = {
      client: 'http',
      raw: false,
      ...globs,
      ...locals
    };

    const client = options.clients[locals.client] || undefined;
    const dispatch = client.callback({ ...locals, ...req });

    const chain = (...args) => {
      return deserialize(...args).then(map).then(render);
    }

    if (!client) {
      return Promise.reject(
        new Error('No Client is defined with that name.')
      );
    }

    if (locals.raw) {
      return chain(req, options);
    }

    return dispatch(req).then(payload => {
      return chain(payload, locals);
    });
  }

  return {
    sync: sync,
    store: store
  };
}
