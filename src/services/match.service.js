const footballDataService = require('./football-data.service');

const addOneDay = (date) => {
  const nextDate = new Date(`${date}T00:00:00.000Z`);
  nextDate.setUTCDate(nextDate.getUTCDate() + 1);

  return nextDate.toISOString().slice(0, 10);
};

const normalizeMatchFilters = (filters) => {
  if (filters.dateFrom && filters.dateTo && filters.dateFrom === filters.dateTo) {
    return {
      ...filters,
      dateTo: addOneDay(filters.dateTo),
    };
  }

  return filters;
};

const getMatches = async (filters = {}) => {
  return footballDataService.getFromFootballData(
    '/matches',
    normalizeMatchFilters(filters),
  );
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
