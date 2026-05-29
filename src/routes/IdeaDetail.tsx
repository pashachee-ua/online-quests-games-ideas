import { Link, useParams } from 'react-router-dom';
import { IDEA_BY_SLUG, IDEAS } from '../data/ideas';
import { TIER_BY_ID, TIER_CLASSES } from '../data/meta';
import { ProsConsList } from '../components/ProsConsList';
import { TierBadge } from '../components/TierBadge';
import { hasCover } from '../components/IdeaImage';
import { useIdeaPersonalization } from '../hooks/useIdeaPersonalization';

export function IdeaDetail() {
  const { slug } = useParams();
  const idea = slug ? IDEA_BY_SLUG[slug] : undefined;

  if (!idea) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
        <h1 className="font-display text-3xl font-600 text-ink">Идея не найдена</h1>
        <p className="mt-3 text-muted">
          Возможно, она ещё не перенесена из документа.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block font-mono text-sm text-accent"
        >
          ← ко всем идеям
        </Link>
      </div>
    );
  }

  const tier = TIER_BY_ID[idea.recommendation];
  const tierClass = TIER_CLASSES[idea.recommendation];
  const cover = hasCover(idea);
  const index = IDEAS.findIndex((i) => i.id === idea.id);
  const prev = index > 0 ? IDEAS[index - 1] : undefined;
  const next = index < IDEAS.length - 1 ? IDEAS[index + 1] : undefined;
  const {
    clearNote,
    hasNote,
    isFavorite,
    note,
    setNote,
    toggleFavorite,
  } = useIdeaPersonalization(idea.id);
  const noteId = `idea-note-${idea.id}`;

  return (
    <article>
      {/* ── Cover hero (full-bleed, затемнение, заголовок поверх) ───────── */}
      <header className="relative">
        <div className="relative min-h-[44vh] w-full overflow-hidden sm:min-h-[56vh]">
          {cover ? (
            <img
              src={idea.image}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div
              aria-hidden
              className="absolute inset-0 bg-surface-2"
              style={{
                backgroundImage:
                  'radial-gradient(40rem 24rem at 78% -10%, rgba(227,147,74,0.22), transparent 60%)',
              }}
            />
          )}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-base via-base/65 to-base/30"
          />

          <div className="relative z-10 mx-auto flex min-h-[44vh] max-w-5xl flex-col justify-end px-5 pb-8 pt-20 sm:min-h-[56vh] sm:px-8 sm:pb-10">
            <Link
              to="/"
              className="inline-flex w-fit items-center rounded-md border border-line bg-base/40 px-3 py-2 font-mono text-[0.9rem] font-600 text-ink-soft backdrop-blur-sm transition-colors hover:border-accent/50 hover:bg-accent-soft/50 hover:text-accent-bright"
            >
              ← все идеи
            </Link>
            <div className="mt-auto pt-8">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[0.8rem] text-ink/80">
                <span>#{String(idea.id).padStart(2, '0')}</span>
                {idea.isBatchHighlight && (
                  <span className="rounded-full border border-accent/50 bg-base/40 px-2 py-0.5 uppercase tracking-wide text-accent-bright backdrop-blur-sm">
                    ★ практичный выбор
                  </span>
                )}
              </div>
              <h1 className="mt-3 font-display text-4xl font-600 leading-[1.04] tracking-tight text-ink sm:text-6xl">
                {idea.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <TierBadge tier={idea.recommendation} />
                <span className="text-sm text-ink-soft">{tier.label}</span>
                <button
                  type="button"
                  aria-pressed={isFavorite}
                  onClick={toggleFavorite}
                  className={`inline-flex min-h-12 items-center gap-3 rounded-md border px-3.5 py-2 font-mono text-[0.8rem] font-600 uppercase tracking-[0.08em] shadow-sm backdrop-blur-sm transition-colors ${
                    isFavorite
                      ? 'border-accent/70 bg-accent-soft/90 text-accent-bright hover:border-accent'
                      : 'border-accent/45 bg-base/55 text-ink-soft hover:border-accent/70 hover:bg-accent-soft/60 hover:text-accent-bright'
                  }`}
                >
                  <span
                    className={`inline-flex h-8 w-8 items-center justify-center ${
                      isFavorite
                        ? 'text-accent-bright'
                        : 'text-accent'
                    }`}
                    aria-hidden
                  >
                    <FavoriteStarIcon className="h-7 w-7" />
                  </span>
                  {isFavorite ? 'В избранном' : 'В избранное'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 pb-10 sm:px-8 sm:pb-16">
        {/* Суть */}
        <section className="mt-10">
          <h2 className="font-mono text-[0.8rem] uppercase tracking-[0.14em] text-muted">
            Суть
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-ink sm:text-xl">
            {idea.concept}
          </p>
        </section>

        <section className="mt-8 rounded-lg border border-line bg-surface/55 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <label
                htmlFor={noteId}
                className="font-mono text-[0.8rem] uppercase tracking-[0.14em] text-accent-bright"
              >
                Личная заметка
              </label>
              <p className="mt-1 text-sm text-muted">
                Сохраняется в этом браузере.
              </p>
            </div>
            {hasNote && (
              <button
                type="button"
                onClick={clearNote}
                className="rounded-md border border-line bg-base/45 px-3 py-2 font-mono text-[0.8rem] uppercase tracking-[0.08em] text-muted transition-colors hover:border-accent/45 hover:text-accent-bright"
              >
                Очистить
              </button>
            )}
          </div>
          <textarea
            id={noteId}
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Что важно помнить про эту идею?"
            rows={5}
            className="mt-4 min-h-32 w-full resize-y rounded-md border border-line bg-base/70 px-3 py-3 text-sm leading-relaxed text-ink placeholder:text-muted transition-colors focus:border-accent focus:outline-none"
          />
        </section>

        {/* Плюсы / Минусы */}
        <div className="mt-12 grid gap-10 border-t border-line pt-10 sm:grid-cols-2 sm:gap-12">
          <ProsConsList title="Плюсы" items={idea.pros} variant="pro" />
          <ProsConsList title="Минусы" items={idea.cons} variant="con" />
        </div>

        {/* Вывод */}
        <section
          className={`mt-12 rounded-xl border ${tierClass.verdictBorder} ${tierClass.verdictBg} p-6`}
        >
          <h2
            className={`flex items-center gap-2.5 font-mono text-[0.8rem] uppercase tracking-[0.14em] ${tierClass.verdictTitle}`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${tierClass.verdictDot}`}
              aria-hidden
            />
            Вывод
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-ink-soft">
            {idea.verdict}
          </p>
        </section>

        {/* prev / next */}
        <nav className="mt-14 flex items-stretch justify-between gap-4 border-t border-line pt-6">
          {prev ? (
            <Link
              to={`/idea/${prev.slug}`}
              className="group max-w-[46%] rounded-md border border-transparent p-2 text-left transition-colors hover:border-line hover:bg-surface/45"
            >
              <span className="block font-mono text-[0.84rem] font-600 uppercase tracking-wide text-muted transition-colors group-hover:text-accent-bright">
                ← предыдущая
              </span>
              <span className="font-display text-ink transition-colors group-hover:text-accent-bright">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={`/idea/${next.slug}`}
              className="group max-w-[46%] rounded-md border border-transparent p-2 text-right transition-colors hover:border-line hover:bg-surface/45"
            >
              <span className="block font-mono text-[0.84rem] font-600 uppercase tracking-wide text-muted transition-colors group-hover:text-accent-bright">
                следующая →
              </span>
              <span className="font-display text-ink transition-colors group-hover:text-accent-bright">
                {next.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </article>
  );
}

function FavoriteStarIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2.75l2.72 5.52 6.09.88-4.4 4.3 1.04 6.07L12 16.65 6.55 19.52l1.04-6.07-4.4-4.3 6.09-.88L12 2.75z" />
    </svg>
  );
}
