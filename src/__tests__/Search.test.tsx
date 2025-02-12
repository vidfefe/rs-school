import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/Header/Search';

describe('Search Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save the entered value to local storage when the Search button is clicked', () => {
    const mockOnSearch = jest.fn();
    render(<Search onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Enter name...');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'Pikachu' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('Pikachu');
  });

  it('should retrieve the value from local storage upon mounting', () => {
    localStorage.setItem('searchQuery', 'Bulbasaur');

    const mockOnSearch = jest.fn();
    render(
      <Search
        onSearch={mockOnSearch}
        initialValue={localStorage.getItem('searchQuery') || ''}
      />
    );

    const input = screen.getByPlaceholderText('Enter name...');
    expect(input).toHaveValue('Bulbasaur');
  });
});
