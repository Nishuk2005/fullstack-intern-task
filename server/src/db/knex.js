const fs = require('fs');
const path = require('path');
const knex = require('knex');
const config = require('../config');

const dbPath = path.resolve(config.dbFile);
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = knex({
  client: 'better-sqlite3',
  connection: { filename: dbPath },
  useNullAsDefault: true,
});

module.exports = db;
