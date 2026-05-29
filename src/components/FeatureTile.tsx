import { Link } from 'react-router-dom';
import type { GameIdea } from '../data/types';
import { hasCover } from './IdeaImage';
import { IdeaPersonalMarkers } from './IdeaPersonalMarkers';
import { TierBadge } from './TierBadge';
import { withBasePath } from '../utils/assetPath';

/**
 * Кинематографичный тайл top-идеи: обложка как фон, заголовок поверх затемнения.
 * `size` управляет высотой и кеглем — для «ломаной» editorial-раскладки.
 */
export function FeatureTile({
  idea,
  size = 'md',
  className = '',
}: {
  idea: GameIdea;
  size?: 'lead' | 'md' | 'sm';
  className?: string;
}) {
  const cover = hasCover(idea);
  const coverSrc = withBasePath(idea.image);

  const heights =
    size === 'lead'
      ? 'min-h-[60vh] sm:min-h-[66vh]'
      : size === 'md'
        ? 'min-h-[20rem]'
        : 'min-h-[15rem]';
  const titleSize =
    size === 'lead'
      ? 'text-4xl sm:text-6xl lg:text-7xl'
      : size === 'md'
        ? 'text-2xl sm:text-3xl'
        : 'text-xl sm:text-2xl';

  return (
    <Link
      to={`/idea/${idea.slug}`}
      className={`group relative flex h-full flex-col justify-end overflow-hidden rounded-xl border border-line bg-surface-2 ${heights} ${className}`}
    >
      {/* Cover */}
      {cover ? (
        <img
          src={coverSrc}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(40rem 24rem at 78% -10%, rgba(227,147,74,0.22), transparent 60%)',
          }}
        />
      )}

      {/* Legibility gradient */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-base via-base/55 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(to top, rgba(227,147,74,0.16), transparent 45%)',
        }}
      />

      {/* Number + tier, top */}
      <div className="absolute left-0 right-0 top-0 flex items-start justify-between gap-3 p-4 sm:p-5">
        <span className="font-mono text-[0.8rem] tracking-[0.1em] text-ink/80">
          {String(idea.id).padStart(2, '0')}
        </span>
        <span className="flex flex-wrap items-center justify-end gap-2">
          <IdeaPersonalMarkers ideaId={idea.id} className="justify-end" />
          {idea.isBatchHighlight && (
            <span className="rounded-full border border-accent/55 bg-base/50 px-2 py-0.5 font-mono text-[0.66rem] uppercase tracking-wide text-accent-bright backdrop-blur-sm">
              ★ практичный выбор
            </span>
          )}
        </span>
      </div>

      {/* Title block */}
      <div className="relative z-10 p-5 sm:p-7">
        <TierBadge tier={idea.recommendation} size={size === 'lead' ? 'md' : 'sm'} />
        <h3
          className={`mt-2.5 font-display font-600 leading-[1.04] tracking-tight text-ink ${titleSize}`}
        >
          {idea.title}
        </h3>
        {size === 'lead' && (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {idea.concept}
          </p>
        )}
      </div>
    </Link>
  );
}
