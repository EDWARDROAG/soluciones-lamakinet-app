const healthCheck = (req, res) => {
  res.json({
    status: 'OK',
    message: 'API funcionando correctamente'
  });
};

module.exports = { healthCheck };
