const ABSOLUTE_URL_RE = /^[a-z][a-z\d+.-]*:/i;

/**
 * Преобразует путь к ассету так, чтобы он корректно работал в GitHub Pages
 * подпапке (например, /repo-name/...), но не трогает внешние URL.
 */
export function withBasePath(assetPath?: string): string | undefined {
  if (!assetPath) {
    return assetPath;
  }

  if (
    ABSOLUTE_URL_RE.test(assetPath) ||
    assetPath.startsWith('//') ||
    assetPath.startsWith('data:')
  ) {
    return assetPath;
  }

  if (!assetPath.startsWith('/')) {
    return assetPath;
  }

  const base = import.meta.env.BASE_URL;
  if (base === '/') {
    return assetPath;
  }

  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  if (assetPath === normalizedBase || assetPath.startsWith(`${normalizedBase}/`)) {
    return assetPath;
  }

  return `${normalizedBase}${assetPath}`;
}
