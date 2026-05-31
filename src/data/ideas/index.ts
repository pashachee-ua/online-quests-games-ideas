import type { GameIdea, IdeaScores, RawGameIdea } from '../types';
import { IDEA_SCORES, SCORE_METRICS } from '../scores';
import { batch1 } from './batch-1';
import { batch2 } from './batch-2';
import { batch3 } from './batch-3';
import { batch4 } from './batch-4';
import { batch5 } from './batch-5';
import { batch6 } from './batch-6';
import { batch7 } from './batch-7';
import { batch8 } from './batch-8';
import { batch9 } from './batch-9';

/**
 * Реестр всех идей. Наполняется порциями — один файл на батч документа
 * (batch-1.ts … batch-9.ts). Каждый batch-файл экспортирует массив уникальных
 * идей своего диапазона; здесь они собираются в единый отсортированный список.
 *
 * Батч — это группировка из исходного документа (для прослеживаемости), на сайте
 * она не используется.
 */
const batches: RawGameIdea[][] = [
  batch1,
  batch2,
  batch3,
  batch4,
  batch5,
  batch6,
  batch7,
  batch8,
  batch9,
];

function getTotalScore(scores: IdeaScores): number {
  const total = SCORE_METRICS.reduce((sum, metric) => sum + scores[metric.id], 0);
  return Math.round((total / SCORE_METRICS.length) * 10) / 10;
}

function validateScores(idea: RawGameIdea, scores: IdeaScores | undefined) {
  if (!scores) {
    throw new Error(`Missing scores for idea #${idea.id}: ${idea.title}`);
  }

  for (const metric of SCORE_METRICS) {
    const value = scores[metric.id];
    if (!Number.isInteger(value) || value < 1 || value > 10) {
      throw new Error(
        `Invalid ${metric.id} score for idea #${idea.id}: expected integer 1..10`,
      );
    }
  }
}

function enrichIdea(idea: RawGameIdea): GameIdea {
  const scores = IDEA_SCORES[idea.id];
  validateScores(idea, scores);

  return {
    ...idea,
    scores,
    totalScore: getTotalScore(scores),
  };
}

const rawIdeas = batches.flat();
const duplicateIds = rawIdeas
  .map((idea) => idea.id)
  .filter((id, index, ids) => ids.indexOf(id) !== index);

if (duplicateIds.length > 0) {
  throw new Error(`Duplicate idea ids: ${duplicateIds.join(', ')}`);
}

export const IDEAS: GameIdea[] = rawIdeas
  .map(enrichIdea)
  .sort((a, b) => a.id - b.id);

export const SOURCE_SCORE_IDS = Object.keys(IDEA_SCORES).map(Number);

const expectedSourceIds = Array.from({ length: 84 }, (_, index) => index + 1);
const missingSourceScoreIds = expectedSourceIds.filter(
  (id) => !SOURCE_SCORE_IDS.includes(id),
);
const outOfRangeScoreIds = SOURCE_SCORE_IDS.filter(
  (id) => id < 1 || id > expectedSourceIds.length,
);

if (missingSourceScoreIds.length > 0) {
  throw new Error(
    `Missing source scores for ids: ${missingSourceScoreIds.join(', ')}`,
  );
}

if (outOfRangeScoreIds.length > 0) {
  throw new Error(
    `Scores exist for out-of-range source ids: ${outOfRangeScoreIds.join(', ')}`,
  );
}

export const IDEA_BY_SLUG: Record<string, GameIdea> = IDEAS.reduce(
  (acc, idea) => {
    acc[idea.slug] = idea;
    return acc;
  },
  {} as Record<string, GameIdea>,
);
