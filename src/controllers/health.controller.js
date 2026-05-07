const getHealth = async (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'football-api',
  });
};

module.exports = {
  getHealth,
};
