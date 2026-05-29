export function FavoriteStarIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2.75l2.72 5.52 6.09.88-4.4 4.3 1.04 6.07L12 16.65 6.55 19.52l1.04-6.07-4.4-4.3 6.09-.88L12 2.75z" />
    </svg>
  );
}
