//Con expresiones regulares valida si es UUID
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isUUID(s) {
  return UUID_RE.test(String(s));
}

function sanitizeTitle(s) {
  return s.trim().replace(/\s+/g, ' ');
}

function validateYear(y) {
  const n = Number(y);
  if (!Number.isInteger(n)) {
    return { error: 'year debe ser un entero.' };
  }
  const current = new Date().getFullYear();
  if (n < -3000 || n > current) {
    return { error: `year fuera de rango permitido (-3000..${current}).` };
  }
  return { value: n };
}

module.exports = { isUUID, sanitizeTitle, validateYear };
