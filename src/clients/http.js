import {
  createFetch,
  base,
  method,
  header,
  parseJSON
} from 'http-client';

export default function httpClient(options = {}) {
  if (!canActivate(options)) {
    return Promise.reject(new Error('invalid client options.'));
  }

  options = {
    method: 'get',
    type: 'application/vnd.api+json',
    field: 'jsonData',
    ...options
  };

  return createFetch(
    base(options.base),
    method(options.method),
    header('Content-Type', options.type),
    header('Accept', options.type),
    parseJSON(options.field)
  ); 
}

export function canActivate(options = {}) {
  if (options.base) { return true; }
  return false;
}
