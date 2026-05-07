const footballDataService = require('./football-data.service');

const getCompetitions = async () => {
  return footballDataService.getFromFootballData('/competitions');
};

module.exports = {
  getCompetitions,
};
