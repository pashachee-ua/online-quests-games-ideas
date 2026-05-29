import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Все идеи', end: true },
  { to: '/recommendations', label: 'Рекомендации', end: false },
  { to: '/about', label: 'Контекст', end: false },
];

export function Nav() {
  return (
    <nav
      aria-label="Основная навигация"
      className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-7"
    >
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          end={l.end}
          className={({ isActive }) =>
            `wipe pb-1 text-[0.95rem] tracking-wide transition-colors duration-200 ${
              isActive
                ? 'wipe-active text-ink'
                : 'text-ink-soft/80 hover:text-ink'
            }`
          }
        >
          {l.label}
        </NavLink>
      ))}
    </nav>
  );
}
