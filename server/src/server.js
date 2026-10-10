const app = require('./app');
const config = require('./config');
const ensureSchema = require('./db/schema');
const seedTemplates = require('./db/seed');

async function start() {
  await ensureSchema();
  const seeded = await seedTemplates();
  if (seeded) console.log(`Seeded ${seeded} templates`);

  app.listen(config.port, () => {
    console.log(`API listening on port ${config.port}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});
