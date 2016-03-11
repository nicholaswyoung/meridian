import { combineReducers } from 'redux';
import * as types from './constants';

const defaultState = {
  products: [],
  categories: []
};

function products(state = defaultState, action) {
  switch (action.type) {
    case types.LOAD_PRODUCTS_SUCCESS:
      return { ...action.response };
    default:
      return { ...state };
  }
}

export default combineReducers({
  products: products
});
