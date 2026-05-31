import type { GameIdea } from '../data/types';
import { SCORE_METRICS } from '../data/scores';

export function IdeaScoreSummary({ idea }: { idea: GameIdea }) {
  return (
    <section className="mt-8 rounded-xl border border-line bg-surface/55 p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-mono text-[0.8rem] uppercase tracking-[0.14em] text-accent-bright">
            Оценки
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Первичная Codex-оценка по шкале 1–10.
          </p>
        </div>
        <div className="text-right">
          <div className="font-display text-4xl font-600 leading-none text-ink">
            {idea.totalScore.toFixed(1)}
          </div>
          <div className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">
            итог
          </div>
        </div>
      </div>

      <dl className="mt-5 grid gap-3 sm:grid-cols-5">
        {SCORE_METRICS.map((metric) => {
          const value = idea.scores[metric.id];
          return (
            <div key={metric.id} title={metric.description}>
              <dt className="flex items-baseline justify-between gap-2 font-mono text-[0.72rem] uppercase tracking-[0.09em] text-muted">
                <span>{metric.shortLabel}</span>
                <span className="text-ink-soft">{value}</span>
              </dt>
              <dd className="mt-2 h-2 overflow-hidden rounded-full bg-base-deep/80">
                <span
                  className="block h-full rounded-full bg-accent-bright"
                  style={{ width: `${value * 10}%` }}
                />
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
