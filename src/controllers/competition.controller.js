const competitionService = require('../services/competition.service');

const getCompetitions = async (req, res) => {
  const data = await competitionService.getCompetitions(req.query);

  res.status(200).json({
    success: true,
    data: {
      count: data.count,
      filters: data.filters,
      competitions: data.competitions,
    },
  });
};

module.exports = {
  getCompetitions,
};
