import { Link } from 'react-router-dom';
import type { GameIdea } from '../data/types';
import { IdeaPersonalMarkers } from './IdeaPersonalMarkers';
import { TierBadge } from './TierBadge';
import { useIdeaPersonalization } from '../hooks/useIdeaPersonalization';

/**
 * Плотная строка реестра-«дела». Масштабируется до десятков идей без монотонной
 * сетки карточек. Ховер — янтарная заливка слева + сдвиг.
 */
export function IdeaRow({ idea }: { idea: GameIdea }) {
  const { isFavorite } = useIdeaPersonalization(idea.id);

  return (
    <Link
      to={`/idea/${idea.slug}`}
      className={`group relative grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-2 border-b py-5 pl-5 pr-4 transition-colors last:border-b-0 sm:grid-cols-[5rem_minmax(13rem,18rem)_1fr_auto] sm:gap-x-6 sm:py-5 sm:pl-6 sm:pr-5 ${
        isFavorite
          ? 'border-accent/60 bg-accent/10 shadow-[inset_0_0_0_1px_rgba(227,147,74,0.2)] hover:bg-accent/15'
          : 'border-line-soft hover:bg-surface/60'
      }`}
    >
      {/* Amber edge on hover */}
      <span
        aria-hidden
        className={`absolute left-0 top-3 bottom-3 w-1.5 origin-top rounded-r-full transition-transform duration-300 ${
          isFavorite
            ? 'scale-y-100 bg-accent-bright shadow-[0_0_14px_rgba(242,168,95,0.6)]'
            : 'scale-y-0 bg-accent group-hover:scale-y-100'
        }`}
      />

      <span
        className="flex flex-col gap-0.5 font-mono"
        title="ID идеи в исходном документе"
      >
        <span className="text-[0.64rem] uppercase tracking-[0.12em] text-muted">
          ID док.
        </span>
        <span className="text-[0.95rem] font-600 text-ink-soft">
          {String(idea.id).padStart(2, '0')}
        </span>
      </span>

      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <h3 className="flex min-w-0 items-center gap-2 font-display text-xl font-600 leading-tight text-ink transition-colors group-hover:text-accent-bright">
          {idea.title}
          {idea.isBatchHighlight && (
            <span className="text-accent" title="Практичный выбор" aria-hidden>
              ★
            </span>
          )}
        </h3>
        <IdeaPersonalMarkers ideaId={idea.id} />
      </div>

      <p className="hidden truncate text-[0.95rem] leading-relaxed text-muted sm:block">
        {idea.concept}
      </p>

      <TierBadge
        tier={idea.recommendation}
        size="sm"
        className="col-start-2 justify-self-start sm:col-start-auto sm:justify-self-end"
      />
    </Link>
  );
}
