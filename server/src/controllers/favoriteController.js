const db = require('../db/knex');
const HttpError = require('../utils/httpError');
const { parseId } = require('../utils/validators');

function templateIdFrom(req) {
  const id = parseId(req.params.templateId);
  if (!id) throw new HttpError(400, 'Template id must be a positive integer');
  return id;
}

async function add(req, res) {
  const templateId = templateIdFrom(req);

  const template = await db('templates').where({ id: templateId }).first('id');
  if (!template) throw new HttpError(404, 'Template not found');

  const existing = await db('favorites').where({ user_id: req.user.id, template_id: templateId }).first('id');
  if (existing) throw new HttpError(409, 'Template is already in your favorites');

  await db('favorites').insert({ user_id: req.user.id, template_id: templateId });
  res.status(201).json({ message: 'Added to favorites', templateId });
}

async function remove(req, res) {
  const templateId = templateIdFrom(req);
  const removed = await db('favorites').where({ user_id: req.user.id, template_id: templateId }).del();
  if (!removed) throw new HttpError(404, 'Template is not in your favorites');
  res.json({ message: 'Removed from favorites', templateId });
}

async function list(req, res) {
  const rows = await db('favorites as f')
    .join('templates as t', 't.id', 'f.template_id')
    .where('f.user_id', req.user.id)
    .orderBy('f.created_at', 'desc')
    .orderBy('f.id', 'desc')
    .select('t.id', 't.name', 't.description', 't.thumbnail_url', 't.category');

  res.json({ favorites: rows.map((t) => ({ ...t, is_favorite: true })) });
}

module.exports = { add, remove, list };
