import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { IDEAS } from '../data/ideas';
import { IDEA_SCORES, SCORE_METRICS } from '../data/scores';
import type { IdeaScores, RecTier, ScoreMetricId } from '../data/types';
import { TierBadge } from '../components/TierBadge';

type SortKey = ScoreMetricId | 'totalScore';
type SortDirection = 'asc' | 'desc';

const DEFAULT_SORT: { key: SortKey; direction: SortDirection } = {
  key: 'totalScore',
  direction: 'desc',
};

interface ScoreTableRow {
  id: number;
  title: string;
  slug: string;
  canonicalId?: number;
  recommendation: RecTier;
  isBatchHighlight: boolean;
  scores: IdeaScores;
  totalScore: number;
}

const DEDUPED_SOURCE_ROWS: Array<{
  id: number;
  title: string;
  slug: string;
  canonicalId: number;
  recommendation: RecTier;
}> = [
  {
    id: 14,
    title: 'Кодовые воспоминания',
    slug: 'kodovye-slova-v-syuzhete',
    canonicalId: 34,
    recommendation: 'strong-risky',
  },
  {
    id: 16,
    title: 'Ассоциативная цепь',
    slug: 'cepochka-associaciy',
    canonicalId: 40,
    recommendation: 'emotional-social',
  },
  {
    id: 31,
    title: 'Художник-свидетель',
    slug: 'risunok-svidetelya',
    canonicalId: 15,
    recommendation: 'strong-risky',
  },
  {
    id: 36,
    title: 'Запретные слова',
    slug: 'zapreshchennye-slova-taboo',
    canonicalId: 18,
    recommendation: 'top-validation',
  },
];

const SCORE_TABLE_ROWS: ScoreTableRow[] = [
  ...IDEAS.map((idea) => ({
    id: idea.id,
    title: idea.title,
    slug: idea.slug,
    recommendation: idea.recommendation,
    isBatchHighlight: idea.isBatchHighlight,
    scores: idea.scores,
    totalScore: idea.totalScore,
  })),
  ...DEDUPED_SOURCE_ROWS.map((row) => {
    const scores = IDEA_SCORES[row.id];
    return {
      ...row,
      isBatchHighlight: false,
      scores,
      totalScore: getTotalScore(scores),
    };
  }),
];

export function ScoresPage() {
  const [sort, setSort] = useState(DEFAULT_SORT);

  const sortedIdeas = useMemo(() => {
    return [...SCORE_TABLE_ROWS].sort((a, b) =>
      compareRows(a, b, sort.key, sort.direction),
    );
  }, [sort]);

  function handleSort(key: SortKey) {
    setSort((current) => {
      if (current.key === key) {
        return {
          key,
          direction: current.direction === 'desc' ? 'asc' : 'desc',
        };
      }

      return { key, direction: 'desc' };
    });
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
      <header className="max-w-3xl">
        <p className="font-mono text-[0.76rem] uppercase tracking-[0.22em] text-accent-bright">
          Сводная таблица
        </p>
        <h1 className="mt-4 font-display text-4xl font-600 leading-tight tracking-tight text-ink sm:text-6xl">
          Баллы идей
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted">
          Первичная Codex-оценка по пяти показателям. Итоговый балл — среднее
          значение, округленное до одного знака. Чем выше «Реализация», тем
          проще быстро и качественно собрать web validation launch. Таблица
          показывает все 84 исходных ID; явные дубли ведут на каноническую
          страницу механики.
        </p>
      </header>

      <section className="mt-10 overflow-hidden rounded-xl border border-line bg-surface/35">
        <div className="overflow-x-auto">
          <table className="min-w-[72rem] border-collapse text-left text-sm">
            <thead className="border-b border-line bg-base/70">
              <tr>
                <th className="px-4 py-3 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
                  ID
                </th>
                <th className="px-4 py-3 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
                  Идея
                </th>
                <th className="px-4 py-3 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
                  Тир
                </th>
                {SCORE_METRICS.map((metric) => (
                  <SortableHeader
                    key={metric.id}
                    label={metric.label}
                    title={metric.description}
                    sortKey={metric.id}
                    currentKey={sort.key}
                    direction={sort.direction}
                    onSort={handleSort}
                  />
                ))}
                <SortableHeader
                  label="Итог"
                  title="Среднее пяти показателей"
                  sortKey="totalScore"
                  currentKey={sort.key}
                  direction={sort.direction}
                  onSort={handleSort}
                  alignRight
                />
              </tr>
            </thead>
            <tbody>
              {sortedIdeas.map((idea) => (
                <tr
                  key={idea.id}
                  className="border-b border-line-soft transition-colors last:border-b-0 hover:bg-surface/70"
                >
                  <td className="px-4 py-3 font-mono text-[0.8rem] text-muted">
                    {String(idea.id).padStart(2, '0')}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/idea/${idea.slug}`}
                      className="font-display text-base font-600 text-ink transition-colors hover:text-accent-bright"
                    >
                      {idea.title}
                    </Link>
                    {idea.canonicalId && (
                      <span className="ml-2 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-muted">
                        → #{String(idea.canonicalId).padStart(2, '0')}
                      </span>
                    )}
                    {idea.isBatchHighlight && (
                      <span className="ml-2 text-accent" title="Практичный выбор">
                        ★
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <TierBadge tier={idea.recommendation} size="sm" />
                  </td>
                  {SCORE_METRICS.map((metric) => (
                    <ScoreCell key={metric.id} value={idea.scores[metric.id]} />
                  ))}
                  <td className="px-4 py-3 text-right font-display text-xl font-600 text-ink">
                    {idea.totalScore.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function SortableHeader({
  label,
  title,
  sortKey,
  currentKey,
  direction,
  onSort,
  alignRight = false,
}: {
  label: string;
  title: string;
  sortKey: SortKey;
  currentKey: SortKey;
  direction: SortDirection;
  onSort: (key: SortKey) => void;
  alignRight?: boolean;
}) {
  const active = currentKey === sortKey;

  return (
    <th
      className={`px-4 py-3 font-mono text-[0.7rem] uppercase tracking-[0.12em] ${
        alignRight ? 'text-right' : 'text-left'
      }`}
      title={title}
    >
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className={`inline-flex items-center gap-1.5 transition-colors ${
          active ? 'text-accent-bright' : 'text-muted hover:text-ink'
        }`}
      >
        <span>{label}</span>
        <span aria-hidden>{active ? (direction === 'desc' ? '↓' : '↑') : '↕'}</span>
      </button>
    </th>
  );
}

function ScoreCell({ value }: { value: number }) {
  return (
    <td className="px-4 py-3">
      <div className="flex min-w-20 items-center gap-2">
        <span className="w-5 text-right font-mono text-[0.8rem] text-ink-soft">
          {value}
        </span>
        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-base-deep">
          <span
            className="block h-full rounded-full bg-accent"
            style={{ width: `${value * 10}%` }}
          />
        </span>
      </div>
    </td>
  );
}

function getTotalScore(scores: IdeaScores): number {
  const total = SCORE_METRICS.reduce((sum, metric) => sum + scores[metric.id], 0);
  return Math.round((total / SCORE_METRICS.length) * 10) / 10;
}

function getSortValue(idea: ScoreTableRow, key: SortKey): number {
  return key === 'totalScore' ? idea.totalScore : idea.scores[key];
}

function compareRows(
  a: ScoreTableRow,
  b: ScoreTableRow,
  key: SortKey,
  direction: SortDirection,
) {
  const primary = getSortValue(a, key) - getSortValue(b, key);
  if (primary !== 0) return direction === 'asc' ? primary : -primary;

  return (
    b.totalScore - a.totalScore ||
    b.scores.mechanics - a.scores.mechanics ||
    b.scores.implementation - a.scores.implementation ||
    a.id - b.id
  );
}
