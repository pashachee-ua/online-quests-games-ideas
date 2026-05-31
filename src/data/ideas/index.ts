import type { GameIdea } from '../types';
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
const batches: GameIdea[][] = [
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

export const IDEAS: GameIdea[] = batches.flat().sort((a, b) => a.id - b.id);

export const IDEA_BY_SLUG: Record<string, GameIdea> = IDEAS.reduce(
  (acc, idea) => {
    acc[idea.slug] = idea;
    return acc;
  },
  {} as Record<string, GameIdea>,
);
