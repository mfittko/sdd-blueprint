import { describe, expect, it } from 'vitest';

import { createSlug } from '../../src/lib/slug';

describe('createSlug', () => {
  it('normalises diacritics and whitespace', () => {
    expect(createSlug('Schwarzwälder Kirschtorte')).toBe('schwarzwalder-kirschtorte');
  });

  it('throws when input is empty', () => {
    expect(() => createSlug('')).toThrow('Cannot create slug from empty value');
  });
});
