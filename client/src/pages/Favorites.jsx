import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { favoritesApi } from '../api/services';
import { errorMessage } from '../api/http';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import TemplateCard from '../components/TemplateCard';
import useFavoriteToggle from '../components/useFavoriteToggle';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    favoritesApi
      .list()
      .then(setFavorites)
      .catch((err) => setError(errorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  // Removing from this page drops the card; a failed removal puts it back.
  const applyFavorite = useCallback((template, value) => {
    setFavorites((list) => {
      if (value) return list.some((t) => t.id === template.id) ? list.map((t) => (t.id === template.id ? { ...t, is_favorite: true } : t)) : [template, ...list];
      return list.filter((t) => t.id !== template.id);
    });
  }, []);

  const { toggle, pendingIds, error: favoriteError } = useFavoriteToggle(applyFavorite);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight">My Favorites</h1>
      <p className="mt-1 text-sm text-slate-600">Templates you have saved.</p>

      <div className="mt-6 space-y-4">
        <Alert>{error || favoriteError}</Alert>

        {loading ? (
          <Spinner label="Loading favorites" />
        ) : favorites.length === 0 && !error ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <p className="font-medium">You have not saved any templates yet</p>
            <p className="mt-1 text-sm text-slate-600">Use the Favorite button on a template to keep it here.</p>
            <Link to="/templates" className="btn-primary mt-5">
              Browse templates
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((template) => (
              <TemplateCard key={template.id} template={template} onToggleFavorite={toggle} pending={pendingIds.includes(template.id)} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
