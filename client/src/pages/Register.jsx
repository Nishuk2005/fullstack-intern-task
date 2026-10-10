import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { errorMessage, fieldErrors } from '../api/http';
import Alert from '../components/Alert';
import FormField from '../components/FormField';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ name, email, password, confirm }) {
  const errors = {};
  if (name.trim().length < 2) errors.name = 'Name must be at least 2 characters';
  if (!EMAIL_RE.test(email.trim())) errors.email = 'Enter a valid email address';
  if (password.length < 8) errors.password = 'Password must be at least 8 characters';
  else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) errors.password = 'Use at least one letter and one number';
  if (confirm !== password) errors.confirm = 'Passwords do not match';
  return errors;
}

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = validate(form);
    setErrors(next);
    setFormError('');
    if (Object.keys(next).length) return;

    setSubmitting(true);
    try {
      await register({ name: form.name.trim(), email: form.email.trim(), password: form.password });
      navigate('/templates', { replace: true });
    } catch (err) {
      setErrors(fieldErrors(err));
      setFormError(errorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex max-w-md flex-col px-4 py-12 sm:py-16">
      <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
      <p className="mt-1 text-sm text-slate-600">Save templates you like and come back to them later.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <Alert>{formError}</Alert>
        <FormField id="name" label="Name" autoComplete="name" value={form.name} onChange={update} error={errors.name} />
        <FormField id="email" type="email" label="Email" autoComplete="email" value={form.email} onChange={update} error={errors.email} />
        <FormField
          id="password"
          type="password"
          label="Password"
          autoComplete="new-password"
          hint="At least 8 characters, with a letter and a number"
          value={form.password}
          onChange={update}
          error={errors.password}
        />
        <FormField id="confirm" type="password" label="Confirm password" autoComplete="new-password" value={form.confirm} onChange={update} error={errors.confirm} />
        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? 'Creating account' : 'Create account'}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-600">
        Already registered?{' '}
        <Link to="/login" className="font-semibold text-brand-600 hover:underline">
          Log in
        </Link>
      </p>
    </main>
  );
}
