const db = require('../db/knex');
const HttpError = require('../utils/httpError');
const { parseId } = require('../utils/validators');

async function favoriteIdSet(userId) {
  if (!userId) return new Set();
  const rows = await db('favorites').where({ user_id: userId }).select('template_id');
  return new Set(rows.map((r) => r.template_id));
}

async function list(req, res) {
  const { search, category } = req.query;
  const query = db('templates').select('id', 'name', 'description', 'thumbnail_url', 'category').orderBy('id');

  if (typeof category === 'string' && category.trim() && category !== 'All') {
    query.where('category', category.trim());
  }
  if (typeof search === 'string' && search.trim()) {
    const term = `%${search.trim().toLowerCase()}%`;
    query.where((qb) => {
      qb.whereRaw('lower(name) like ?', [term]).orWhereRaw('lower(description) like ?', [term]);
    });
  }

  const [rows, favorites] = await Promise.all([query, favoriteIdSet(req.user && req.user.id)]);
  res.json({ templates: rows.map((t) => ({ ...t, is_favorite: favorites.has(t.id) })) });
}

async function categories(req, res) {
  const rows = await db('templates').distinct('category').orderBy('category');
  res.json({ categories: rows.map((r) => r.category) });
}

async function getOne(req, res) {
  const id = parseId(req.params.id);
  if (!id) throw new HttpError(400, 'Template id must be a positive integer');

  const template = await db('templates').where({ id }).first();
  if (!template) throw new HttpError(404, 'Template not found');

  const favorites = await favoriteIdSet(req.user && req.user.id);
  res.json({ template: { ...template, is_favorite: favorites.has(id) } });
}

module.exports = { list, categories, getOne };
