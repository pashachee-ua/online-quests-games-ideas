import { Link } from 'react-router-dom';
import { IDEAS } from '../data/ideas';
import { PURPOSE, SITE_SUBTITLE, SITE_TITLE } from '../data/meta';
import { FeatureTile } from '../components/FeatureTile';
import { IdeaRow } from '../components/IdeaRow';

const SOURCE_TOTAL = 84;

export function HomeList() {
  const topPicks = IDEAS.filter((i) => i.isTopPick);
  // Lead = практичный выбор среди топ-идей, иначе первая топ-идея.
  const lead =
    topPicks.find((i) => i.isBatchHighlight) ?? topPicks[0] ?? IDEAS[0];
  const featured = topPicks.filter((i) => i.id !== lead?.id);
  const rest = IDEAS.filter((i) => !i.isTopPick);

  if (IDEAS.length === 0) return <EmptyState />;

  return (
    <div>
      {/* ── Hero: заголовок + строка-дело, без статов ──────────────────── */}
      <section className="mx-auto max-w-7xl px-5 pt-14 sm:px-8 sm:pt-20">
        <p className="rise font-mono text-[0.76rem] uppercase tracking-[0.22em] text-accent-bright">
          {SITE_SUBTITLE}
        </p>
        <h1
          className="rise mt-4 max-w-5xl font-display text-5xl font-600 leading-[1.0] tracking-tight text-ink sm:text-7xl"
          style={{ animationDelay: '0.05s' }}
        >
          Идеи игр для{' '}
          <span className="italic text-accent">онлайн-квеста</span>
        </h1>
        <div
          className="rise mt-7 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-start sm:justify-between"
          style={{ animationDelay: '0.12s' }}
        >
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            {PURPOSE}
          </p>
          <p className="shrink-0 font-mono text-[0.8rem] uppercase tracking-[0.14em] text-muted sm:text-right">
            Досье · {IDEAS.length} уник. из {SOURCE_TOTAL} ID
            <br />
            {topPicks.length} топ-кандидатов
          </p>
        </div>
      </section>

      {/* ── Lead: одна крупная топ-идея с обложкой ─────────────────────── */}
      {lead && (
        <section className="mx-auto mt-12 max-w-7xl px-5 sm:mt-16 sm:px-8">
          <FeatureTile idea={lead} size="lead" className="rise" />
        </section>
      )}

      {/* ── Featured rail: остальные топ-идеи кинематографичными тайлами ── */}
      {featured.length > 0 && (
        <section className="mx-auto mt-5 max-w-7xl px-5 sm:px-8">
          <SectionLabel
            kicker="Приоритет"
            title="Топ-кандидаты"
            count={topPicks.length}
          />
          <div className="mt-5 grid auto-rows-[minmax(15rem,auto)] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:auto-rows-[minmax(16rem,auto)]">
            {featured.map((idea, i) => {
              const layout = getFeaturedTileLayout(i, featured.length);

              return (
                <FeatureTile
                  key={idea.id}
                  idea={idea}
                  size={layout.size}
                  className={layout.className}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* ── Index: длинный хвост плотным реестром ──────────────────────── */}
      {rest.length > 0 && (
        <section className="mx-auto mt-16 max-w-7xl px-5 pb-24 sm:px-8">
          <SectionLabel
            kicker="Реестр"
            title="Все остальные механики"
            count={rest.length}
          />
          <p className="mt-3 font-mono text-[0.74rem] uppercase tracking-[0.12em] text-muted">
            ID док. — номер идеи в исходном списке документа
          </p>
          <div className="mt-4 overflow-hidden rounded-lg border border-line bg-surface/25">
            {rest.map((idea) => (
              <IdeaRow key={idea.id} idea={idea} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function getFeaturedTileLayout(
  index: number,
  total: number,
): { size: 'md' | 'sm'; className: string } {
  const remainder = total % 5;
  const finalGroupStart = total - remainder;

  if (remainder > 0 && index >= finalGroupStart) {
    const finalIndex = index - finalGroupStart;
    const finalPatterns: Record<number, Array<2 | 3 | 6>> = {
      1: [6],
      2: [3, 3],
      3: [2, 2, 2],
      4: [3, 3, 3, 3],
    };
    const span = finalPatterns[remainder][finalIndex];

    return getTileLayoutBySpan(span);
  }

  const span = index % 5 < 2 ? 3 : 2;

  return getTileLayoutBySpan(span);
}

function getTileLayoutBySpan(
  span: 2 | 3 | 6,
): { size: 'md' | 'sm'; className: string } {
  if (span === 6) return { className: 'lg:col-span-6', size: 'md' };
  if (span === 3) return { className: 'lg:col-span-3', size: 'md' };
  return { className: 'lg:col-span-2', size: 'sm' };
}

function SectionLabel({
  kicker,
  title,
  count,
}: {
  kicker: string;
  title: string;
  count: number;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-accent-bright">
          {kicker}
        </span>
        <h2 className="font-display text-2xl font-600 text-ink">{title}</h2>
      </div>
      <span className="font-mono text-[0.8rem] text-muted">{count}</span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
      <p className="font-display text-2xl text-ink">{SITE_TITLE}</p>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted">
        Идеи переносятся из документа порциями. Скоро они появятся здесь.
      </p>
      <Link
        to="/about"
        className="mt-6 inline-block font-mono text-sm text-accent"
      >
        о витрине →
      </Link>
    </div>
  );
}
