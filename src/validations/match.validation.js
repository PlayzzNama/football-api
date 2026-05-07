const { z } = require('zod');

const isRealIsoDate = (value) => {
  const date = new Date(`${value}T00:00:00.000Z`);

  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Must use YYYY-MM-DD format')
  .refine(isRealIsoDate, 'Must be a real calendar date');

const commaSeparatedCompetitionRefs = z
  .string()
  .regex(
    /^[a-zA-Z0-9]+(,[a-zA-Z0-9]+)*$/,
    'Must be a comma-separated list of competition IDs or codes',
  )
  .transform((value) => value.toUpperCase());

const matchStatus = z.preprocess(
  (value) => (typeof value === 'string' ? value.toUpperCase() : value),
  z.enum([
    'SCHEDULED',
    'TIMED',
    'IN_PLAY',
    'PAUSED',
    'EXTRA_TIME',
    'PENALTY_SHOOTOUT',
    'FINISHED',
    'SUSPENDED',
    'POSTPONED',
    'CANCELLED',
    'AWARDED',
  ]),
);

const getMatchesSchema = {
  query: z
    .object({
      dateFrom: isoDate.optional(),
      dateTo: isoDate.optional(),
      status: matchStatus.optional(),
      competitions: commaSeparatedCompetitionRefs.optional(),
    })
    .superRefine((query, ctx) => {
      if (query.dateFrom && query.dateTo && query.dateFrom > query.dateTo) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['dateFrom'],
          message: 'dateFrom must be before or equal to dateTo',
        });
      }
    }),
};

module.exports = {
  getMatchesSchema,
};
