/**
 * Типы данных витрины идей.
 *
 * Источник контента — `docs/product/GAME_IDEAS_PROS_CONS.md` соседнего проекта
 * online-quests. У каждой идеи в документе есть Суть / Плюсы / Минусы /
 * Вывод. Тиры и top-флаги выведены из разделов «Preliminary Batch N Takeaways».
 * Числовые оценки — первичная Codex-оценка для удобной сортировки.
 */

/** Тиры рекомендаций — взяты из секций Takeaways после каждого батча. */
export type RecTier =
  | 'top-validation' // «наиболее подходящие для раннего validation launch»
  | 'emotional-social' // «лучшие для эмоциональных / лёгких / социальных фаз»
  | 'strong-risky' // «сильные, но технически/контентно рискованные / атмосферные»
  | 'supporting' // «полезные supporting / micro-механики»
  | 'narrative-pattern'; // «мета-паттерны и сценарные слои, не самостоятельные игры»

export interface IdeaScores {
  /** Насколько механика вовлекает всех участников команды. */
  engagement: number;
  /** Насколько сильную атмосферу/эмоцию может дать идея. */
  atmosphere: number;
  /** Насколько быстро и качественно идею можно реализовать для web validation launch. */
  implementation: number;
  /** Насколько идея ощущается свежей и отличимой от типовых активностей. */
  originality: number;
  /** Насколько сильная, ясная и переиспользуемая игровая механика лежит в основе. */
  mechanics: number;
}

export type ScoreMetricId = keyof IdeaScores;

export interface RawGameIdea {
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

export interface GameIdea extends RawGameIdea {
  /** Первичная Codex-оценка идеи по 5 показателям. */
  scores: IdeaScores;
  /** Среднее пяти score-показателей, округленное до 1 знака. */
  totalScore: number;
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
