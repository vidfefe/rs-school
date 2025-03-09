import { render, screen, fireEvent } from '@testing-library/react';
import { useLoaderData, useSearchParams } from 'react-router';
import { vi, Mock } from 'vitest';
import Pagination from '@/components/Main/Pagination';

vi.mock('react-router', () => ({
  ...vi.importActual('react-router'),
  useLoaderData: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe('Pagination Component', () => {
  const setSearchParams = vi.fn();
  const totalPages = 5;

  beforeEach(() => {
    setSearchParams.mockClear();
    (useLoaderData as Mock).mockReturnValue({ totalPages });
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams({ page: '1', details: 'pikachu' }),
      setSearchParams,
    ]);
  });

  test('renders pagination with correct initial state', () => {
    render(<Pagination />);

    expect(screen.getByText('1 / 5')).toBeInTheDocument();
    expect(screen.getByText('<')).toBeDisabled();
    expect(screen.getByText('>')).toBeEnabled();
  });

  test('handles page change when clicking next', () => {
    render(<Pagination />);

    fireEvent.click(screen.getByText('>'));

    expect(setSearchParams).toHaveBeenCalledWith(expect.any(Function));

    const newSearchParams = setSearchParams.mock.calls[0][0](
      new URLSearchParams()
    );
    expect(newSearchParams.get('page')).toBe('2');
    expect(newSearchParams.get('details')).toBe('pikachu');
  });

  test('handles page change when clicking previous', () => {
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams({ page: '2', details: 'pikachu' }),
      setSearchParams,
    ]);

    render(<Pagination />);

    fireEvent.click(screen.getByText('<'));

    expect(setSearchParams).toHaveBeenCalledWith(expect.any(Function));

    const newSearchParams = setSearchParams.mock.calls[0][0](
      new URLSearchParams()
    );
    expect(newSearchParams.get('page')).toBe('1');
    expect(newSearchParams.get('details')).toBe('pikachu');
  });

  test('does not allow page change when on first page', () => {
    render(<Pagination />);
    fireEvent.click(screen.getByText('<'));
    expect(setSearchParams).not.toHaveBeenCalled();
  });

  test('does not allow page change when on last page', () => {
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams({ page: '5', details: 'pikachu' }),
      setSearchParams,
    ]);

    render(<Pagination />);
    fireEvent.click(screen.getByText('>'));
    expect(setSearchParams).not.toHaveBeenCalled();
  });

  test('handles page change when on page 3', () => {
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams({ page: '3', details: 'pikachu' }),
      setSearchParams,
    ]);

    render(<Pagination />);

    fireEvent.click(screen.getByText('<'));

    expect(setSearchParams).toHaveBeenCalledWith(expect.any(Function));

    const newSearchParams = setSearchParams.mock.calls[0][0](
      new URLSearchParams()
    );
    expect(newSearchParams.get('page')).toBe('2');
    expect(newSearchParams.get('details')).toBe('pikachu');
  });

  test('handles page change to the last page', () => {
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams({ page: '4', details: 'pikachu' }),
      setSearchParams,
    ]);

    render(<Pagination />);

    fireEvent.click(screen.getByText('>'));

    expect(setSearchParams).toHaveBeenCalledWith(expect.any(Function));

    const newSearchParams = setSearchParams.mock.calls[0][0](
      new URLSearchParams()
    );
    expect(newSearchParams.get('page')).toBe('5');
    expect(newSearchParams.get('details')).toBe('pikachu');
  });
  test('extracts page and details correctly from searchParams', () => {
    (useSearchParams as Mock).mockReturnValue([new URLSearchParams(), vi.fn()]);
    render(<Pagination />);

    expect(
      screen.getByText((content) => content.includes('1 /'))
    ).toBeInTheDocument();

    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams({ page: '3', details: 'pikachu' }),
      vi.fn(),
    ]);
    render(<Pagination />);

    expect(
      screen.getByText((content) => content.includes('3 /'))
    ).toBeInTheDocument();

    const [searchParams] = useSearchParams();
    expect(searchParams.get('details')).toBe('pikachu');
  });
});
