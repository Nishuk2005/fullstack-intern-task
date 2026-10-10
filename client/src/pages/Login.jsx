import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { errorMessage, fieldErrors } from '../api/http';
import Alert from '../components/Alert';
import FormField from '../components/FormField';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/templates';

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!EMAIL_RE.test(form.email.trim())) next.email = 'Enter a valid email address';
    if (!form.password) next.password = 'Enter your password';
    setErrors(next);
    setFormError('');
    if (Object.keys(next).length) return;

    setSubmitting(true);
    try {
      await login({ email: form.email.trim(), password: form.password });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setErrors(fieldErrors(err));
      setFormError(errorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex max-w-md flex-col px-4 py-12 sm:py-16">
      <h1 className="text-2xl font-bold tracking-tight">Log in</h1>
      <p className="mt-1 text-sm text-slate-600">Welcome back. Log in to see your favorites.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <Alert>{formError}</Alert>
        <FormField id="email" type="email" label="Email" autoComplete="email" value={form.email} onChange={update} error={errors.email} />
        <FormField id="password" type="password" label="Password" autoComplete="current-password" value={form.password} onChange={update} error={errors.password} />
        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? 'Logging in' : 'Log in'}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-600">
        New here?{' '}
        <Link to="/register" className="font-semibold text-brand-600 hover:underline">
          Create an account
        </Link>
      </p>
    </main>
  );
}
