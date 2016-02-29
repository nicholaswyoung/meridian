import levelup from 'levelup';
import sublevel from 'level-sublevel';
import memdown from 'memdown';

export function configureStore(options = {}) {
  let configured;

  options = {
    db: memdown,
    keyEncoding: 'json',
    valueEncoding: 'json',
    ...options
  };

  if (configured) {
    return configured;
  }

  configured = sublevel(levelup(options));
  return configured;
}
