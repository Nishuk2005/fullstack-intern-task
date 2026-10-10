const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateRegister(body = {}) {
  const errors = {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (name.length < 2 || name.length > 80) errors.name = 'Name must be between 2 and 80 characters';
  if (!EMAIL_RE.test(email) || email.length > 255) errors.email = 'Enter a valid email address';
  if (password.length < 8) errors.password = 'Password must be at least 8 characters';
  else if (password.length > 72) errors.password = 'Password must be at most 72 characters';
  else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    errors.password = 'Password must contain at least one letter and one number';
  }

  return { errors, values: { name, email, password } };
}

function validateLogin(body = {}) {
  const errors = {};
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address';
  if (!password) errors.password = 'Password is required';

  return { errors, values: { email, password } };
}

function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

module.exports = { validateRegister, validateLogin, parseId };
