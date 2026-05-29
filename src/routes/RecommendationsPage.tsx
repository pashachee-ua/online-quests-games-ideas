import { Link } from 'react-router-dom';
import { IDEAS } from '../data/ideas';
import { TIERS } from '../data/meta';
import { TierBadge } from '../components/TierBadge';
import { FeatureTile } from '../components/FeatureTile';
import type { RecTier } from '../data/types';

export function RecommendationsPage() {
  const topPicks = IDEAS.filter((i) => i.isTopPick);

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
      <header className="max-w-3xl">
        <p className="font-mono text-[0.76rem] uppercase tracking-[0.22em] text-accent-bright">
          Сводка
        </p>
        <h1 className="mt-4 font-display text-4xl font-600 leading-tight tracking-tight text-ink sm:text-6xl">
          Рекомендации
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted">
          Тиры и топ-кандидаты выведены из разделов «Preliminary Batch Takeaways»
          документа. Топ-кандидаты — идеи, отмеченные как наиболее подходящие для
          раннего validation launch. Бейджи читаются как шкала пригодности для
          первого запуска: от A «лучший выбор» до E «не самостоятельная игра».
        </p>
      </header>

      {/* Топ-кандидаты как тайлы с обложками */}
      <section className="mt-12">
        <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-accent-bright">
              Приоритет
            </span>
            <h2 className="font-display text-2xl font-600 text-ink">
              Топ-кандидаты
            </h2>
          </div>
          <span className="font-mono text-[0.8rem] text-muted">{topPicks.length}</span>
        </div>
        {topPicks.length === 0 ? (
          <p className="mt-6 rounded-lg border border-dashed border-line bg-surface/50 p-6 text-sm text-muted">
            Появятся после переноса идей и разметки тиров.
          </p>
        ) : (
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {topPicks.map((idea) => (
              <FeatureTile key={idea.id} idea={idea} size="sm" />
            ))}
          </div>
        )}
      </section>

      {/* Тиры */}
      <section className="mt-16 space-y-10">
        <h2 className="font-display text-2xl font-600 text-ink">Тиры</h2>
        {TIERS.map((tier) => {
          const items = IDEAS.filter((i) => i.recommendation === tier.id);
          return (
            <div key={tier.id} className="border-t border-line-soft pt-6">
              <div className="flex flex-wrap items-center gap-3">
                <TierBadge tier={tier.id as RecTier} />
                <h3 className="font-display text-lg font-600 text-ink">
                  {tier.label}
                </h3>
                <span className="font-mono text-[0.8rem] text-muted">
                  {items.length}
                </span>
              </div>
              <p className="mt-2 max-w-4xl text-[0.95rem] leading-relaxed text-muted">
                {tier.description}
              </p>
              {items.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {items.map((idea) => (
                    <li key={idea.id}>
                      <Link
                        to={`/idea/${idea.slug}`}
                        className="inline-block rounded-md border border-line bg-surface/60 px-2.5 py-1 text-sm text-ink-soft transition-colors hover:border-accent/50 hover:text-accent-bright"
                      >
                        {idea.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
