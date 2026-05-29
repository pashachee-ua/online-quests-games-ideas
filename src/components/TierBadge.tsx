import type { RecTier } from '../data/types';
import { TIER_BY_ID, TIER_CLASSES } from '../data/meta';

export function TierBadge({
  tier,
  size = 'md',
  className = '',
}: {
  tier: RecTier;
  size?: 'sm' | 'md';
  className?: string;
}) {
  const meta = TIER_BY_ID[tier];
  const c = TIER_CLASSES[tier];
  const label = size === 'sm' ? meta.short : meta.badgeLabel;
  const badgeSize =
    size === 'sm'
      ? 'min-h-[1.9rem] gap-2 px-2.5 py-1 text-[0.68rem]'
      : 'min-h-[2.15rem] gap-2.5 px-3 py-1.5 text-[0.76rem]';
  const rankSize =
    size === 'sm'
      ? 'h-[1.25rem] min-w-[1.25rem] rounded-[0.25rem] text-[0.62rem]'
      : 'h-[1.5rem] min-w-[1.5rem] rounded text-[0.68rem]';
  const meterSize = size === 'sm' ? 'hidden sm:flex' : 'flex';

  return (
    <span
      className={`inline-flex items-center rounded-md border ${c.border} ${c.bg} ${c.text} ${badgeSize} align-middle font-mono font-600 leading-none tracking-[0.06em] shadow-sm backdrop-blur-sm ${className}`}
      aria-label={`${meta.rank}: ${meta.badgeLabel}`}
      title={meta.label}
    >
      <span
        className={`inline-flex shrink-0 items-center justify-center leading-none ${rankSize} ${c.rank}`}
        aria-hidden
      >
        {meta.rank}
      </span>
      <span className="whitespace-nowrap pt-px leading-none">{label}</span>
      <span
        className={`${meterSize} h-2 items-center gap-0.5 self-center`}
        aria-hidden
      >
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={`block h-2 w-1.5 rounded-[1px] ${
              index < meta.fitScore ? c.meter : 'bg-ink/15'
            }`}
          />
        ))}
      </span>
    </span>
  );
}
