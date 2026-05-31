/**
 * Типы данных витрины идей.
 *
 * Источник контента — `docs/product/GAME_IDEAS_PROS_CONS.md` соседнего проекта
 * online-quests. У каждой идеи в документе есть только Суть / Плюсы / Минусы /
 * Вывод (числовых оценок по критериям НЕТ). Тиры и top-флаги выведены из
 * разделов «Preliminary Batch N Takeaways».
 */

/** Тиры рекомендаций — взяты из секций Takeaways после каждого батча. */
export type RecTier =
  | 'top-validation' // «наиболее подходящие для раннего validation launch»
  | 'emotional-social' // «лучшие для эмоциональных / лёгких / социальных фаз»
  | 'strong-risky' // «сильные, но технически/контентно рискованные / атмосферные»
  | 'supporting' // «полезные supporting / micro-механики»
  | 'narrative-pattern'; // «мета-паттерны и сценарные слои, не самостоятельные игры»

export interface GameIdea {
  /** Номер идеи из документа (1..84). */
  id: number;
  /** Стабильный слаг для URL (латиница, kebab-case). */
  slug: string;
  /** Название как в документе («Фрагменты», «Just One», «Wavelength»). */
  title: string;
  /** Номер батча документа (1..9). */
  batch: number;
  /** Суть — один абзац. */
  concept: string;
  /** Плюсы — список как в документе. */
  pros: string[];
  /** Минусы — список как в документе. */
  cons: string[];
  /** Вывод — один абзац. */
  verdict: string;
  /** Тир рекомендации из Takeaways батча. */
  recommendation: RecTier;
  /** Идея входит в список «наиболее подходящие для validation». */
  isTopPick: boolean;
  /** «Самый практичный кандидат» батча (Takeaways выделяет 1–2 на батч). */
  isBatchHighlight: boolean;
  /** Путь к сгенерированной обложке; если его нет, UI покажет fallback-заглушку. */
  image?: string;
}

/** Описание одного тира для бейджей и страницы рекомендаций. */
export interface TierMeta {
  id: RecTier;
  /** A..E: читабельный уровень пригодности для первого запуска. */
  rank: 'A' | 'B' | 'C' | 'D' | 'E';
  /** 1..5: визуальная шкала пригодности, где 5 = лучший кандидат. */
  fitScore: 1 | 2 | 3 | 4 | 5;
  label: string;
  short: string;
  badgeLabel: string;
  description: string;
}
