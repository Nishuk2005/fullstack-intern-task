import { useCallback, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { favoritesApi } from '../api/services';
import { errorMessage } from '../api/http';
import { useAuth } from '../context/AuthContext';

// Shared by the list pages. `apply(template, nextValue)` updates the page's own state.
export default function useFavoriteToggle(apply) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [pendingIds, setPendingIds] = useState([]);
  const [error, setError] = useState('');

  const toggle = useCallback(
    async (template) => {
      if (!isAuthenticated) {
        navigate('/login', { state: { from: location.pathname } });
        return;
      }

      const next = !template.is_favorite;
      setError('');
      setPendingIds((ids) => [...ids, template.id]);
      apply(template, next);

      try {
        if (next) await favoritesApi.add(template.id);
        else await favoritesApi.remove(template.id);
      } catch (err) {
        // A 409 on add means the server already has it, so the optimistic state is correct.
        if (!(next && err.response?.status === 409)) {
          apply(template, !next);
          setError(errorMessage(err));
        }
      } finally {
        setPendingIds((ids) => ids.filter((id) => id !== template.id));
      }
    },
    [apply, isAuthenticated, location.pathname, navigate]
  );

  return { toggle, pendingIds, error };
}
