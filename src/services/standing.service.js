const footballDataService = require('./football-data.service');

const getStandings = async ({ competition, ...filters }) => {
  return footballDataService.getFromFootballData(
    `/competitions/${competition}/standings`,
    filters,
  );
};

module.exports = {
  getStandings,
};
