export function ProsConsList({
  title,
  items,
  variant,
}: {
  title: string;
  items: string[];
  variant: 'pro' | 'con';
}) {
  const isPro = variant === 'pro';
  return (
    <section>
      <h3 className="mb-4 flex items-center gap-2 font-mono text-[0.8rem] uppercase tracking-[0.14em] text-muted">
        <span
          aria-hidden
          className={`inline-block h-2.5 w-2.5 rounded-sm ${
            isPro ? 'bg-tier-support' : 'bg-tier-emotional'
          }`}
        />
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-3 text-[0.95rem] leading-relaxed text-ink-soft"
          >
            <span
              aria-hidden
              className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                isPro ? 'bg-tier-support' : 'bg-tier-emotional'
              }`}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
