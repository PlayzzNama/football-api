const matchService = require('../services/match.service');

const getMatches = async (req, res) => {
  const data = await matchService.getMatches(req.validated.query);

  res.status(200).json({
    success: true,
    data: {
      filters: data.filters,
      resultSet: data.resultSet,
      matches: data.matches,
    },
  });
};

module.exports = {
  getMatches,
};
