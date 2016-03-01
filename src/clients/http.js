import {
  createFetch,
  base,
  header,
  parseJSON
} from 'http-client';

export function createClient(options = {}) {
  if (typeof options === 'string') {
    options = {
      base: options
    };
  }

  options = {
    headers: {
      accept: 'application/vnd.api+json',
      type: 'application/vnd.api+json',
    },
    body: {},
    ...options
  };

  return createFetch(
    base(options.base),
    header('Accept', options.headers.accept),
    header('Content-Type', options.headers.type),
    parseJSON()
  );
}
