const fs = require('fs/promises');
const path = require('path');
const database = require('../src/config/database');
const env = require('../src/config/env');

const migrationsDir = path.join(__dirname, '..', 'migrations');

const run = async () => {
  if (!env.databaseUrl) {
    throw new Error('DATABASE_URL is required to run migrations');
  }

  const pool = database.getPool();
  const client = await pool.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        filename TEXT PRIMARY KEY,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    const files = (await fs.readdir(migrationsDir))
      .filter((file) => file.endsWith('.sql'))
      .sort();

    for (const file of files) {
      const alreadyApplied = await client.query(
        'SELECT filename FROM schema_migrations WHERE filename = $1',
        [file],
      );

      if (alreadyApplied.rows.length > 0) {
        console.log(`Skipping ${file}`);
        continue;
      }

      const sql = await fs.readFile(path.join(migrationsDir, file), 'utf8');

      await client.query('BEGIN');

      try {
        await client.query(sql);
        await client.query(
          'INSERT INTO schema_migrations (filename) VALUES ($1)',
          [file],
        );
        await client.query('COMMIT');
        console.log(`Applied ${file}`);
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      }
    }
  } finally {
    client.release();
  }

  await database.closeDatabase();
};

run().catch(async (error) => {
  console.error(error);
  await database.closeDatabase();
  process.exit(1);
});
