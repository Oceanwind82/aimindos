import { describe, it, expect } from 'vitest';

describe('Vitest environment', () => {
  it('should have expect defined', () => {
    expect(1 + 1).toBe(2);
  });
});
