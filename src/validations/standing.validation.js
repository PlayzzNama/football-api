const { z } = require('zod');

const isRealIsoDate = (value) => {
  const date = new Date(`${value}T00:00:00.000Z`);

  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

const competitionRef = z
  .string({
    error: 'competition is required',
  })
  .regex(/^[a-zA-Z0-9]+$/, 'Must be a competition ID or code')
  .transform((value) => value.toUpperCase());

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Must use YYYY-MM-DD format')
  .refine(isRealIsoDate, 'Must be a real calendar date');

const positiveIntegerString = (fieldName) =>
  z
    .string()
    .regex(/^\d+$/, `${fieldName} must be a positive integer`)
    .transform((value) => Number(value))
    .refine((value) => value > 0, `${fieldName} must be greater than 0`);

const getStandingsSchema = {
  query: z.object({
    competition: competitionRef,
    season: z
      .string()
      .regex(/^\d{4}$/, 'season must use YYYY format')
      .optional(),
    matchday: positiveIntegerString('matchday').optional(),
    date: isoDate.optional(),
  }),
};

module.exports = {
  getStandingsSchema,
};
