import tv4 from 'tv4';
import schema from './schema';

export function validate(payload = {}) {
  return new Promise((resolve, reject) => {
    const check = tv4.validateMultiple(payload, schema);
    
    if (!check.valid) {
      return reject({ ...check });
    }

    resolve(check);
  });
}
