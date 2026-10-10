const jwt = require('jsonwebtoken');
const config = require('../config');
const db = require('../db/knex');
const HttpError = require('../utils/httpError');

function readToken(req) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');
  return scheme === 'Bearer' && token ? token : null;
}

async function resolveUser(token) {
  const payload = jwt.verify(token, config.jwtSecret);
  const user = await db('users').where({ id: payload.sub }).first('id', 'name', 'email');
  return user || null;
}

async function requireAuth(req, res, next) {
  try {
    const token = readToken(req);
    if (!token) throw new HttpError(401, 'Authentication required');
    const user = await resolveUser(token);
    if (!user) throw new HttpError(401, 'Account no longer exists');
    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return next(new HttpError(401, 'Invalid or expired token'));
    }
    next(err);
  }
}

async function optionalAuth(req, res, next) {
  try {
    const token = readToken(req);
    if (token) req.user = await resolveUser(token);
  } catch (err) {
    req.user = undefined;
  }
  next();
}

module.exports = { requireAuth, optionalAuth };
