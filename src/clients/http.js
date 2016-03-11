import {
  createFetch,
  base,
  method,
  header,
  parseJSON
} from 'http-client';

export function configureClient(options = {}) {
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
    method: 'GET',
    ...options
  };

  options.method = options.method.toUpperCase();

  return createFetch(
    base(options.base),
    method(options.method),
    header('Accept', options.headers.accept),
    header('Content-Type', options.headers.type),
    parseJSON('jsonData')
  );
}
