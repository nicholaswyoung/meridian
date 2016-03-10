export function isResource(payload = {}) {
  if (payload.type && payload.id) {
    return true;
  }

  return false;
}
