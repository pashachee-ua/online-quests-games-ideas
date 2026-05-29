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
          className="rounded-md border border-accent/50 bg-accent-soft/80 px-1.5 py-0.5 font-mono text-[0.64rem] font-600 uppercase tracking-[0.07em] text-accent-bright"
          title="В избранном"
        >
          ★ избр.
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
