const databaseService = require('../services/database.service');

const getHealth = async (req, res) => {
  const database = await databaseService.checkDatabaseHealth();

  res.status(200).json({
    status: 'ok',
    service: 'football-api',
    dependencies: {
      database,
    },
  });
};

module.exports = {
  getHealth,
};
