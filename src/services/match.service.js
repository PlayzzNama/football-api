const footballDataService = require('./football-data.service');

const getMatches = async (filters = {}) => {
  return footballDataService.getFromFootballData('/matches', filters);
};

const getLiveMatches = async (filters = {}) => {
  return footballDataService.getFromFootballData('/matches', {
    ...filters,
    status: 'IN_PLAY,PAUSED,EXTRA_TIME,PENALTY_SHOOTOUT',
  });
};

module.exports = {
  getLiveMatches,
  getMatches,
};
