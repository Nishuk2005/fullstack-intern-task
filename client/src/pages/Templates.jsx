import { useCallback, useEffect, useState } from 'react';
import { templatesApi } from '../api/services';
import { errorMessage } from '../api/http';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import TemplateCard from '../components/TemplateCard';
import useFavoriteToggle from '../components/useFavoriteToggle';

export default function Templates() {
  const { isAuthenticated } = useAuth();
  const [templates, setTemplates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('All');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    templatesApi.categories().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput.trim()), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    templatesApi
      .list({ search: search || undefined, category: category === 'All' ? undefined : category })
      .then((data) => !cancelled && setTemplates(data))
      .catch((err) => !cancelled && setError(errorMessage(err)))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
    // isAuthenticated is included so favorite flags refresh after login or logout
  }, [search, category, isAuthenticated]);

  const applyFavorite = useCallback((template, value) => {
    setTemplates((list) => list.map((t) => (t.id === template.id ? { ...t, is_favorite: value } : t)));
  }, []);

  const { toggle, pendingIds, error: favoriteError } = useFavoriteToggle(applyFavorite);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Templates</h1>
        <p className="text-sm text-slate-600">Pick a starting point for your next site, dashboard or campaign.</p>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {['All', ...categories].map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setCategory(name)}
              aria-pressed={category === name}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                category === name
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-72">
          <label htmlFor="search" className="sr-only">
            Search templates
          </label>
          <input
            id="search"
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search templates"
            className="field"
          />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <Alert>{error || favoriteError}</Alert>

        {loading ? (
          <Spinner label="Loading templates" />
        ) : templates.length === 0 && !error ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <p className="font-medium">No templates match your search</p>
            <p className="mt-1 text-sm text-slate-600">Try a different keyword or choose another category.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} onToggleFavorite={toggle} pending={pendingIds.includes(template.id)} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
