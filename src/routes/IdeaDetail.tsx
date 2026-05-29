import { Link, useParams } from 'react-router-dom';
import { IDEA_BY_SLUG, IDEAS } from '../data/ideas';
import { TIER_BY_ID, TIER_CLASSES } from '../data/meta';
import { ProsConsList } from '../components/ProsConsList';
import { TierBadge } from '../components/TierBadge';
import { hasCover } from '../components/IdeaImage';
import { useIdeaPersonalization } from '../hooks/useIdeaPersonalization';
import { FavoriteStarIcon } from '../components/FavoriteStarIcon';
import { withBasePath } from '../utils/assetPath';

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
  const coverSrc = withBasePath(idea.image);
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
              src={coverSrc}
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
                  className={`inline-flex min-h-8 items-center gap-1.5 rounded-full border bg-base/90 px-2.5 py-1.5 font-mono text-[0.72rem] font-700 uppercase tracking-[0.07em] text-ink shadow-[0_10px_24px_rgba(0,0,0,0.48),0_0_0_1px_rgba(242,168,95,0.22),0_0_18px_rgba(227,147,74,0.18)] backdrop-blur-md transition-colors ${
                    isFavorite
                      ? 'border-accent-bright/90 hover:border-accent-bright'
                      : 'border-accent-bright/70 hover:border-accent-bright'
                  }`}
                >
                  <span
                    className={`inline-flex items-center justify-center transition-colors ${
                      isFavorite
                        ? 'text-accent-bright drop-shadow-[0_0_6px_rgba(242,168,95,0.65)]'
                        : 'text-muted/55'
                    }`}
                    aria-hidden
                  >
                    <FavoriteStarIcon className="h-4 w-4" />
                  </span>
                  {isFavorite ? 'в избранном' : 'в избранное'}
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
