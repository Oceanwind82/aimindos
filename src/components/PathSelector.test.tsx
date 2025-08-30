import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PathSelector } from './PathSelector';

describe('PathSelector', () => {
  it('renders paths', () => {
    render(<PathSelector paths={['Math', 'Science']} />);
    expect(screen.getByText('Math')).toBeInTheDocument();
    expect(screen.getByText('Science')).toBeInTheDocument();
  });
});
