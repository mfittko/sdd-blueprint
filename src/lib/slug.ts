const NON_ALPHANUMERIC = /[^a-z0-9]+/g;
const TRIM_DASH = /^-+|-+$/g;
const COMBINING_MARKS = /[\u0300-\u036f]/g;

export function createSlug(source: string): string {
  if (!source) {
    throw new Error('Cannot create slug from empty value');
  }

  const base = source
    .toLowerCase()
    .normalize('NFKD')
    .replace(COMBINING_MARKS, '')
    .replace(NON_ALPHANUMERIC, '-')
    .replace(TRIM_DASH, '');

  if (!base) {
    throw new Error('Slug normalisation removed all characters');
  }

  return base;
}
