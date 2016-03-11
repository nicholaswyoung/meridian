import { setup } from '../src';

export const CALL_API = Symbol('CALL API');
export const engine = setup({
  client: { base: '' }
});

export default function api() {
  return store => next => action => {
    const options = action[CALL_API];

    if (typeof options === 'undefined') {
      return next(action);
    }

    const {
      endpoint,
      types: [requestType, successType, errorType]
    } = options

    return engine.sync(endpoint).then(response => {
      return next({
        type: successType,
        response: response
      });
    }).catch(err => {
      return next({
        type: errorType,
        err: err
      });
    });
  };
}
