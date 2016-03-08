import { CALL_API } from './middleware';
import * as types from './constants';

export function loadProducts() {
  return {
    [CALL_API]: {
      endpoint: '/products.json',
      types: [
        types.LOAD_PRODUCTS_REQUEST,
        types.LOAD_PRODUCTS_SUCCESS,
        types.LOAD_PRODUCTS_FAILURE
      ]
    }
  };
}
