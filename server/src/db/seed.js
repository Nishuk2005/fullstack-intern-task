const db = require('./knex');
const ensureSchema = require('./schema');
const templates = require('./templatesData');

async function seedTemplates({ reset = false } = {}) {
  await ensureSchema();
  if (reset) {
    await db('favorites').del();
    await db('templates').del();
  }
  const [{ count }] = await db('templates').count({ count: '*' });
  if (Number(count) === 0) {
    await db('templates').insert(templates);
    return templates.length;
  }
  return 0;
}

module.exports = seedTemplates;

if (require.main === module) {
  seedTemplates({ reset: process.argv.includes('--reset') })
    .then((n) => {
      console.log(n ? `Seeded ${n} templates` : 'Templates already present, nothing to seed');
      return db.destroy();
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
