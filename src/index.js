import { configureStore } from './store';
import { deserialize } from './serializer';

export function setup(options = {}) {
  const store = configureStore(options);

  function map(resources) {
    return Promise.all(resources.map(res => {
      return store.save(res);
    }));
  }

  function sync(payload = {}, options = {}) {
    return deserialize(payload, options).then(resources => {
      return map(resources);
    });
  }

  return {
    sync: sync,
    store: store
  };
}
