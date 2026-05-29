import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-28 text-center sm:px-8">
      <p className="font-display text-8xl font-600 text-accent/25">404</p>
      <h1 className="mt-4 font-display text-3xl font-600 text-ink">
        Страница не найдена
      </h1>
      <Link
        to="/"
        className="mt-6 inline-block font-mono text-sm text-accent hover:text-accent-bright"
      >
        ← ко всем идеям
      </Link>
    </div>
  );
}
