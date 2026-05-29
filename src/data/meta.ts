import type { RecTier, TierMeta } from './types';

/**
 * Вступительный контекст из документа GAME_IDEAS_PROS_CONS.md (раздел Purpose /
 * Подход) и критерии-ориентиры из вступления. Это линза оценки, а не пер-идейные
 * баллы. Тексты приведены близко к источнику.
 */

export const SITE_TITLE = 'Идеи игр для онлайн-квеста';
export const SITE_SUBTITLE = 'Механики для тимбилдинга — обзор кандидатов';

export const PURPOSE =
  'Оценить идеи игр/механик для онлайн-квеста-тимбилдинга с учётом текущего контекста проекта: ' +
  'быстрый validation launch, host-led event, команды примерно 8–30 человек, браузерная платформа, ' +
  'real-time синхронизация, без лишней SaaS-сложности на старте.';

/** Раздел «Подход» из документа. */
export const APPROACH: string[] = [
  'Оцениваем не абстрактно «хорошая ли игра», а насколько идея подходит для первого проверочного онлайн-ивента.',
  'Важны: понятность правил, вовлечение всей команды, anti-alpha эффект, техническая сложность, пригодность для host-led flow, потенциал для разных сюжетов.',
  '«Корпоративное расследование» можно использовать как один из вариантов скина, но идеи оцениваются шире.',
];

/** Критерии-ориентиры (линза оценки из вступления, без числовых баллов). */
export const CRITERIA: { title: string; description: string }[] = [
  {
    title: 'Понятность правил',
    description: 'Насколько быстро команда понимает, что делать, без долгого онбординга.',
  },
  {
    title: 'Вовлечение всей команды',
    description: 'Участвуют ли все игроки, а не один-два активных.',
  },
  {
    title: 'Anti-alpha эффект',
    description: 'Мешает ли механика одному «альфа»-игроку решить всё в одиночку.',
  },
  {
    title: 'Техническая сложность',
    description: 'Дёшево ли реализовать в браузере для быстрого validation launch.',
  },
  {
    title: 'Пригодность для host-led flow',
    description: 'Насколько удобно ведущему модерировать и держать темп.',
  },
  {
    title: 'Потенциал для разных сюжетов',
    description: 'Можно ли переиспользовать механику в разных темах и скинах.',
  },
];

/** Метаданные тиров рекомендаций (порядок = приоритет отображения). */
export const TIERS: TierMeta[] = [
  {
    id: 'top-validation',
    rank: 'A',
    fitScore: 5,
    label: 'Лучше всего для первого запуска',
    short: 'Лучший',
    badgeLabel: 'Лучший выбор',
    description:
      'Самые подходящие идеи для раннего validation launch: понятные, командные, относительно дешёвые технически и хорошо показывают ценность платформы.',
  },
  {
    id: 'emotional-social',
    rank: 'B',
    fitScore: 4,
    label: 'Хорошо как отдельная фаза',
    short: 'Хорошо',
    badgeLabel: 'Хорошая фаза',
    description:
      'Хорошие эмоциональные, лёгкие или социальные механики. Лучше работают как разогрев, смена темпа или отдельный эпизод, а не всегда как главный каркас игры.',
  },
  {
    id: 'strong-risky',
    rank: 'C',
    fitScore: 3,
    label: 'Сильно, но рискованно',
    short: 'Риск',
    badgeLabel: 'Есть риск',
    description:
      'Потенциально сильные или атмосферные идеи, но для первого запуска они дороже, сложнее в модерации или требуют более аккуратного контента.',
  },
  {
    id: 'supporting',
    rank: 'D',
    fitScore: 2,
    label: 'Лучше как вспомогательный модуль',
    short: 'Модуль',
    badgeLabel: 'Как модуль',
    description:
      'Полезные supporting- и micro-механики. Их стоит брать как часть более крупной игры или короткий элемент, но не как центральную идею продукта.',
  },
  {
    id: 'narrative-pattern',
    rank: 'E',
    fitScore: 1,
    label: 'Не самостоятельная игра',
    short: 'Не игра',
    badgeLabel: 'Не игра',
    description:
      'Мета-механики и сценарные слои. Их полезно применять поверх других механик, но как отдельную игру для запуска они подходят слабее всего.',
  },
];

export const TIER_BY_ID: Record<RecTier, TierMeta> = TIERS.reduce(
  (acc, t) => {
    acc[t.id] = t;
    return acc;
  },
  {} as Record<RecTier, TierMeta>,
);

/** Статические Tailwind-классы по тиру (литералы — чтобы Tailwind их видел). */
export const TIER_CLASSES: Record<
  RecTier,
  {
    text: string;
    bg: string;
    border: string;
    rank: string;
    meter: string;
    verdictBg: string;
    verdictBorder: string;
    verdictDot: string;
    verdictTitle: string;
  }
> = {
  'top-validation': {
    text: 'text-emerald-100',
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-300/55',
    rank: 'bg-emerald-300 text-emerald-950',
    meter: 'bg-emerald-300',
    verdictBg: 'bg-emerald-500/10',
    verdictBorder: 'border-emerald-300/30',
    verdictDot: 'bg-emerald-300',
    verdictTitle: 'text-emerald-100',
  },
  'emotional-social': {
    text: 'text-sky-100',
    bg: 'bg-sky-500/15',
    border: 'border-sky-300/50',
    rank: 'bg-sky-300 text-sky-950',
    meter: 'bg-sky-300',
    verdictBg: 'bg-sky-500/10',
    verdictBorder: 'border-sky-300/30',
    verdictDot: 'bg-sky-300',
    verdictTitle: 'text-sky-100',
  },
  'strong-risky': {
    text: 'text-amber-100',
    bg: 'bg-amber-500/15',
    border: 'border-amber-300/50',
    rank: 'bg-amber-300 text-amber-950',
    meter: 'bg-amber-300',
    verdictBg: 'bg-amber-500/10',
    verdictBorder: 'border-amber-300/30',
    verdictDot: 'bg-amber-300',
    verdictTitle: 'text-amber-100',
  },
  supporting: {
    text: 'text-stone-100',
    bg: 'bg-stone-400/15',
    border: 'border-stone-300/40',
    rank: 'bg-stone-300 text-stone-950',
    meter: 'bg-stone-300',
    verdictBg: 'bg-stone-400/10',
    verdictBorder: 'border-stone-300/25',
    verdictDot: 'bg-stone-300',
    verdictTitle: 'text-stone-100',
  },
  'narrative-pattern': {
    text: 'text-zinc-200',
    bg: 'bg-zinc-500/15',
    border: 'border-zinc-400/40',
    rank: 'bg-zinc-400 text-zinc-950',
    meter: 'bg-zinc-400',
    verdictBg: 'bg-zinc-500/10',
    verdictBorder: 'border-zinc-400/25',
    verdictDot: 'bg-zinc-400',
    verdictTitle: 'text-zinc-200',
  },
};
