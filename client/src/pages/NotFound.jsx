import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-md px-4 py-20 text-center">
      <h1 className="text-2xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-2 text-sm text-slate-600">The page you are looking for does not exist or has moved.</p>
      <Link to="/templates" className="btn-primary mt-6">
        Go to templates
      </Link>
    </main>
  );
}
