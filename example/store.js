import { compose, createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import meridian from './middleware';

export default function configureStore(initialState = {}) {
  const stack = compose(
    applyMiddleware(
      meridian()
    )
  )(createStore);

  const store = stack(reducers, initialState);

  return store;
}
