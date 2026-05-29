import { Link, Outlet } from 'react-router-dom';
import { Nav } from './Nav';
import { ScrollToTop } from './ScrollToTop';
import { SITE_TITLE } from '../data/meta';
import { IDEAS } from '../data/ideas';

const TOTAL = 72; // всего идей в документе (источник)

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollToTop />
      <header className="sticky top-0 z-30 border-b border-line/80 bg-base/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4 sm:px-8">
          <Link to="/" className="group flex items-baseline gap-3">
            <span className="font-display text-xl font-600 tracking-tight text-ink">
              {SITE_TITLE}
            </span>
            <span className="hidden font-mono text-[0.76rem] tracking-[0.1em] text-muted sm:inline">
              {String(IDEAS.length).padStart(2, '0')}/{TOTAL}
            </span>
          </Link>
          <Nav />
        </div>
      </header>

      <main id="content" className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-8 border-t border-line/80 bg-base-deep/60">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <p className="font-mono text-[0.76rem] uppercase tracking-[0.18em] text-muted">
            Досье · {IDEAS.length} из {TOTAL} механик
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            Внутренняя витрина для разработчиков платформы. Источник —{' '}
            <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.8em] text-ink-soft">
              docs/product/GAME_IDEAS_PROS_CONS.md
            </code>{' '}
            проекта online-quests. Идеи строго из документа; у топ-идей —
            сгенерированные обложки.
          </p>
        </div>
      </footer>
    </div>
  );
}
