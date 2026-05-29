import { FavoriteStarIcon } from './FavoriteStarIcon';
import { useIdeaPersonalization } from '../hooks/useIdeaPersonalization';

export function IdeaPersonalMarkers({
  ideaId,
  className = '',
}: {
  ideaId: number;
  className?: string;
}) {
  const { hasNote, isFavorite } = useIdeaPersonalization(ideaId);

  if (!hasNote && !isFavorite) return null;

  return (
    <span className={`inline-flex flex-wrap items-center gap-1.5 ${className}`}>
      {isFavorite && (
        <span
          className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-accent-bright/90 bg-base/90 px-2.5 py-1.5 font-mono text-[0.72rem] font-700 uppercase tracking-[0.07em] text-ink shadow-[0_10px_24px_rgba(0,0,0,0.48),0_0_0_1px_rgba(242,168,95,0.22),0_0_18px_rgba(227,147,74,0.18)] backdrop-blur-md"
          title="В избранном"
        >
          <FavoriteStarIcon className="h-4 w-4 text-accent-bright drop-shadow-[0_0_6px_rgba(242,168,95,0.65)]" />
          в избранном
        </span>
      )}
      {hasNote && (
        <span
          className="rounded-md border border-ink/20 bg-base/55 px-1.5 py-0.5 font-mono text-[0.64rem] font-600 uppercase tracking-[0.07em] text-ink-soft"
          title="Есть заметка"
        >
          заметка
        </span>
      )}
    </span>
  );
}
