import { Link } from 'react-router-dom';
import { assetUrl } from '../api/http';

function HeartIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 4.5 6.4 4.5c2.1 0 3.6 1.2 5.6 3.3 2-2.1 3.5-3.3 5.6-3.3 3.7 0 5.5 3.9 4 7.3C19.5 16.4 12 21 12 21z" />
    </svg>
  );
}

export default function TemplateCard({ template, onToggleFavorite, pending }) {
  const { id, name, description, category, thumbnail_url: thumbnail, is_favorite: isFavorite } = template;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
      <Link to={`/templates/${id}`} className="block aspect-[8/5] overflow-hidden bg-slate-100">
        <img src={assetUrl(thumbnail)} alt={`${name} preview`} loading="lazy" className="h-full w-full object-cover" />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium text-brand-600">{category}</p>
        <h3 className="mt-1 text-base font-semibold">
          <Link to={`/templates/${id}`} className="hover:underline">
            {name}
          </Link>
        </h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">{description}</p>

        <button
          type="button"
          onClick={() => onToggleFavorite(template)}
          disabled={pending}
          aria-pressed={isFavorite}
          className={`mt-4 w-full ${isFavorite ? 'btn border border-brand-500 bg-brand-50 text-brand-700 hover:bg-brand-100' : 'btn-ghost'}`}
        >
          <HeartIcon filled={isFavorite} />
          {isFavorite ? 'Favorited' : 'Favorite'}
        </button>
      </div>
    </article>
  );
}
