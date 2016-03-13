import { setup } from '../src';

export const CALL_API = Symbol('CALL API');
export const engine = setup({
  base: 'http://localhost:4000'
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

    return engine.sync({
      endpoint: endpoint
    }).then(response => {
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
