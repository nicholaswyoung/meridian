import { configureStore } from './store';
import Model from './model';

export const db = configureStore();

export function parse(payload = {}) {
  let result = {};
  return Promise.resolve(result);
}
