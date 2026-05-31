import { APPROACH, CRITERIA, PURPOSE, SITE_TITLE } from '../data/meta';

export function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="font-mono text-[0.76rem] uppercase tracking-[0.22em] text-accent-bright">
        Контекст
      </p>
      <h1 className="mt-4 font-display text-4xl font-600 leading-tight tracking-tight text-ink sm:text-6xl">
        О витрине
      </h1>

      <section className="mt-10">
        <h2 className="font-mono text-[0.8rem] uppercase tracking-[0.14em] text-muted">
          Цель
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">{PURPOSE}</p>
      </section>

      <section className="mt-10 border-t border-line pt-8">
        <h2 className="font-mono text-[0.8rem] uppercase tracking-[0.14em] text-muted">
          Подход
        </h2>
        <ul className="mt-4 space-y-3">
          {APPROACH.map((p, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-ink-soft">
              <span
                aria-hidden
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 border-t border-line pt-8">
        <h2 className="font-mono text-[0.8rem] uppercase tracking-[0.14em] text-muted">
          Критерии-ориентиры
        </h2>
        <p className="mt-2 text-[0.95rem] text-muted">
          Это линза оценки из вступления документа. Числовые баллы на сайте —
          отдельная первичная Codex-оценка по текущим критериям проекта.
        </p>
        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          {CRITERIA.map((c) => (
            <div
              key={c.title}
              className="rounded-lg border border-line bg-surface/60 p-4"
            >
              <dt className="font-display font-600 text-ink">{c.title}</dt>
              <dd className="mt-1 text-[0.95rem] leading-relaxed text-muted">
                {c.description}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12 rounded-xl border border-line bg-surface/60 p-5 text-[0.95rem] leading-relaxed text-muted">
        <p>
          <span className="font-600 text-ink-soft">Источник.</span>{' '}
          Весь контент «{SITE_TITLE}» взят из документа{' '}
          <code className="rounded bg-raised px-1.5 py-0.5 font-mono text-[0.85em] text-ink-soft">
            docs/product/GAME_IDEAS_PROS_CONS.md
          </code>{' '}
          проекта online-quests. Идеи строго из документа — ничего нового не
          добавлено, а явные дубли скрыты из реестра. Для части топ-идей уже
          подключены сгенерированные обложки. Числовые показатели являются
          рабочей оценкой для сравнения и сортировки, а не исходными данными из
          документа.
        </p>
      </section>
    </div>
  );
}
