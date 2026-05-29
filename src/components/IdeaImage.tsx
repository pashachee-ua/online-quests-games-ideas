import type { GameIdea } from '../data/types';
import { withBasePath } from '../utils/assetPath';

export function hasCover(idea: GameIdea): boolean {
  return Boolean(idea.image) && !idea.image!.endsWith('/placeholder.svg');
}

/**
 * Обложка идеи. Если есть сгенерированный cover — показываем его; иначе тёмная
 * заглушка в стиле «дела» с крупным номером.
 */
export function IdeaImage({
  idea,
  className = '',
}: {
  idea: GameIdea;
  className?: string;
}) {
  const coverSrc = withBasePath(idea.image);

  if (hasCover(idea)) {
    return (
      <figure
        className={`relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-line bg-surface ${className}`}
      >
        <img
          src={coverSrc}
          alt={`Обложка идеи «${idea.title}»`}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5"
        />
      </figure>
    );
  }

  return (
    <div
      className={`relative flex aspect-[16/10] w-full items-end overflow-hidden rounded-lg border border-line bg-surface-2 ${className}`}
      role="img"
      aria-label={`Заглушка изображения для идеи «${idea.title}»`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            'radial-gradient(30rem 20rem at 80% -20%, rgba(227,147,74,0.16), transparent 60%)',
        }}
      />
      <span
        aria-hidden
        className="absolute right-4 top-3 font-mono text-5xl font-600 text-accent/20"
      >
        {String(idea.id).padStart(2, '0')}
      </span>
      <div className="relative z-10 p-4">
        <span className="block font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent-bright">
          обложка появится позже
        </span>
        <span className="font-display text-lg font-600 text-ink">
          {idea.title}
        </span>
      </div>
    </div>
  );
}
