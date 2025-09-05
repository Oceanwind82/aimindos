import { render, screen } from '@testing-library/react';

function Hello({ name }: Readonly<{ name: string }>) {
  return <h1>Hello, {name}</h1>;
}

describe('Hello', () => {
  it('renders name', () => {
    render(<Hello name="Brandy" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hello, Brandy');
  });
});
