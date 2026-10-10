const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const db = require('../db/knex');
const HttpError = require('../utils/httpError');
const { validateRegister, validateLogin } = require('../utils/validators');

const SALT_ROUNDS = 10;

function signToken(user) {
  return jwt.sign({ sub: user.id }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
}

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email };
}

async function register(req, res) {
  const { errors, values } = validateRegister(req.body);
  if (Object.keys(errors).length) throw new HttpError(400, 'Validation failed', errors);

  const existing = await db('users').where({ email: values.email }).first('id');
  if (existing) throw new HttpError(409, 'An account with this email already exists', { email: 'Email already in use' });

  const password_hash = await bcrypt.hash(values.password, SALT_ROUNDS);
  const [id] = await db('users').insert({ name: values.name, email: values.email, password_hash });
  const user = { id, name: values.name, email: values.email };

  res.status(201).json({ token: signToken(user), user: publicUser(user) });
}

async function login(req, res) {
  const { errors, values } = validateLogin(req.body);
  if (Object.keys(errors).length) throw new HttpError(400, 'Validation failed', errors);

  const user = await db('users').where({ email: values.email }).first();
  const valid = user && (await bcrypt.compare(values.password, user.password_hash));
  if (!valid) throw new HttpError(401, 'Incorrect email or password');

  res.json({ token: signToken(user), user: publicUser(user) });
}

function me(req, res) {
  res.json({ user: req.user });
}

module.exports = { register, login, me };
