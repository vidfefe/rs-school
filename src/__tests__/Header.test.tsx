import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Header from '@/components/Header/Header';
import { ThemeProvider } from '@/context/ThemeContext';

describe('Header Component', () => {
  test('renders Header component with Search and ThemeToggle', () => {
    render(
      <ThemeProvider>
        <Header onSearch={() => {}} />
      </ThemeProvider>
    );

    const title = screen.getByText(/Pokémon Search/i);
    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');
    const themeToggleButton = screen.getByRole('button', { name: /🌞|🌙/i });

    expect(title).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(themeToggleButton).toBeInTheDocument();
  });

  test('calls onSearch when search value changes', async () => {
    const mockOnSearch = vi.fn();
    render(
      <ThemeProvider>
        <Header onSearch={mockOnSearch} />
      </ThemeProvider>
    );

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(searchInput, { target: { value: 'charizard' } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalled();
    expect(mockOnSearch).toHaveBeenCalledWith('charizard');
  });

  test('renders Header with default initialValue', () => {
    render(
      <ThemeProvider>
        <Header onSearch={() => {}} initialValue="bulbasaur" />
      </ThemeProvider>
    );

    const searchInput = screen.getByTestId('search-input');
    expect((searchInput as HTMLInputElement).value).toBe('bulbasaur');
  });
});
