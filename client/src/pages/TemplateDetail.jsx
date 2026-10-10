import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { templatesApi } from '../api/services';
import { assetUrl, errorMessage } from '../api/http';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import useFavoriteToggle from '../components/useFavoriteToggle';

export default function TemplateDetail() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    templatesApi
      .get(id)
      .then(setTemplate)
      .catch((err) => setError(err.response?.status === 404 ? 'This template does not exist.' : errorMessage(err)))
      .finally(() => setLoading(false));
  }, [id, isAuthenticated]);

  const applyFavorite = useCallback((_, value) => {
    setTemplate((t) => (t ? { ...t, is_favorite: value } : t));
  }, []);

  const { toggle, pendingIds, error: favoriteError } = useFavoriteToggle(applyFavorite);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Link to="/templates" className="text-sm font-medium text-brand-600 hover:underline">
        Back to templates
      </Link>

      <div className="mt-4 space-y-4">
        <Alert>{error || favoriteError}</Alert>
        {loading && <Spinner label="Loading template" />}

        {template && (
          <article className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <img src={assetUrl(template.thumbnail_url)} alt={`${template.name} preview`} className="aspect-[8/5] w-full bg-slate-100 object-cover" />
            <div className="p-6">
              <p className="text-xs font-medium text-brand-600">{template.category}</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight">{template.name}</h1>
              <p className="mt-3 max-w-prose leading-relaxed text-slate-600">{template.description}</p>
              <button
                type="button"
                onClick={() => toggle(template)}
                disabled={pendingIds.includes(template.id)}
                aria-pressed={template.is_favorite}
                className={`mt-6 ${template.is_favorite ? 'btn border border-brand-500 bg-brand-50 text-brand-700 hover:bg-brand-100' : 'btn-primary'}`}
              >
                {template.is_favorite ? 'Remove from favorites' : 'Add to favorites'}
              </button>
            </div>
          </article>
        )}
      </div>
    </main>
  );
}
