const { z } = require('zod');

const commaSeparatedNumbers = z
  .string()
  .regex(/^\d+(,\d+)*$/, 'Must be a comma-separated list of area IDs')
  .optional();

const getCompetitionsSchema = {
  query: z.object({
    areas: commaSeparatedNumbers,
  }),
};

module.exports = {
  getCompetitionsSchema,
};
