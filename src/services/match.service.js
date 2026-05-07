const footballDataService = require('./football-data.service');

const getMatches = async (filters = {}) => {
  return footballDataService.getFromFootballData('/matches', filters);
};

module.exports = {
  getMatches,
};
