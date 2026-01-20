export const healthCheck = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Servicio activo',
    timestamp: new Date().toISOString()
  });
};