const footballDataService = require('./football-data.service');

const getCompetitions = async (filters = {}) => {
  return footballDataService.getFromFootballData('/competitions', filters);
};

module.exports = {
  getCompetitions,
};
