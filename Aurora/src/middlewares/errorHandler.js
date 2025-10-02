// Maneja errores tipo 5**
module.exports = (err, req, res, next) => {
  console.error('[ERROR]', err);
  const msg = err?.message || 'Error interno del servidor';
  res.status(500).json({ error: msg });
};
