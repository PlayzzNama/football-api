const standingService = require('../services/standing.service');

const getStandings = async (req, res) => {
  const data = await standingService.getStandings(req.validated.query);

  res.status(200).json({
    success: true,
    data: {
      filters: data.filters,
      area: data.area,
      competition: data.competition,
      season: data.season,
      standings: data.standings,
    },
  });
};

module.exports = {
  getStandings,
};
