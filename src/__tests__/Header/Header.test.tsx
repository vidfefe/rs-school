import { render, screen } from '@testing-library/react';
import Header from '@/components/Header/Header';

vi.mock('@/components/Header/Search', () => ({
  default: () => <div data-testid="search-component" />,
}));

vi.mock('@/components/ThemeToggle', () => ({
  default: () => <div data-testid="theme-toggle" />,
}));

describe('Header Component', () => {
  test('renders Pokémon Search title', () => {
    render(<Header />);

    const title = screen.getByText(/Pokémon Search/i);
    expect(title).toBeInTheDocument();
  });

  test('renders Search and ThemeToggle components', () => {
    render(<Header />);

    const searchComponent = screen.getByTestId('search-component');
    const themeToggle = screen.getByTestId('theme-toggle');

    expect(searchComponent).toBeInTheDocument();
    expect(themeToggle).toBeInTheDocument();
  });

  test('renders header with proper structure', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass(
      'flex items-center justify-center gap-5 relative'
    );
  });
});
