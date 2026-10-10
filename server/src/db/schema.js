const db = require('./knex');

async function ensureSchema() {
  await db.raw('PRAGMA foreign_keys = ON');

  if (!(await db.schema.hasTable('users'))) {
    await db.schema.createTable('users', (t) => {
      t.increments('id').primary();
      t.string('name', 80).notNullable();
      t.string('email', 255).notNullable().unique();
      t.string('password_hash', 255).notNullable();
      t.timestamp('created_at').defaultTo(db.fn.now());
    });
  }

  if (!(await db.schema.hasTable('templates'))) {
    await db.schema.createTable('templates', (t) => {
      t.increments('id').primary();
      t.string('name', 120).notNullable();
      t.text('description').notNullable();
      t.string('thumbnail_url', 500).notNullable();
      t.string('category', 60).notNullable().index();
    });
  }

  if (!(await db.schema.hasTable('favorites'))) {
    await db.schema.createTable('favorites', (t) => {
      t.increments('id').primary();
      t.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
      t.integer('template_id').notNullable().references('id').inTable('templates').onDelete('CASCADE');
      t.timestamp('created_at').defaultTo(db.fn.now());
      t.unique(['user_id', 'template_id']);
    });
  }
}

module.exports = ensureSchema;
