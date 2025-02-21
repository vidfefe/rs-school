import { render, screen, fireEvent } from '@testing-library/react';
import { useSearchParams } from 'react-router';
import { vi, Mock } from 'vitest';
import Pagination from '@/components/Main/Pagination';

vi.mock('react-router', () => ({
  ...vi.importActual('react-router'),
  useSearchParams: vi.fn(),
}));

describe('Pagination Components', () => {
  const setSearchParams = vi.fn();
  const totalPages = 5;

  beforeEach(() => {
    setSearchParams.mockClear();
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams({ page: '1', details: 'some-detail' }),
      setSearchParams,
    ]);
  });

  test('renders pagination with correct initial state', () => {
    render(<Pagination totalPages={totalPages} />);

    expect(screen.getByText('1 / 5')).toBeInTheDocument();
    expect(screen.getByText('<')).toBeDisabled();
    expect(screen.getByText('>')).toBeEnabled();
  });

  test('handles page change when clicking next', () => {
    render(<Pagination totalPages={totalPages} />);

    fireEvent.click(screen.getByText('>'));

    expect(setSearchParams).toHaveBeenCalledWith(expect.any(Function));

    const newSearchParams = setSearchParams.mock.calls[0][0](
      new URLSearchParams()
    );
    expect(newSearchParams.get('page')).toBe('2');
    expect(newSearchParams.get('details')).toBe('some-detail');
  });

  test('handles page change when clicking previous', () => {
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams({ page: '2', details: 'some-detail' }),
      setSearchParams,
    ]);

    render(<Pagination totalPages={totalPages} />);

    fireEvent.click(screen.getByText('<'));

    expect(setSearchParams).toHaveBeenCalledWith(expect.any(Function));

    const newSearchParams = setSearchParams.mock.calls[0][0](
      new URLSearchParams()
    );
    expect(newSearchParams.get('page')).toBe('1');
    expect(newSearchParams.get('details')).toBe('some-detail');
  });

  test('does not allow page change when on first or last page', () => {
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams({ page: '1', details: 'some-detail' }),
      setSearchParams,
    ]);

    render(<Pagination totalPages={totalPages} />);

    fireEvent.click(screen.getByText('<'));

    expect(setSearchParams).not.toHaveBeenCalled();
  });

  test('does not allow page change when on last page', () => {
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams({ page: '5', details: 'some-detail' }),
      setSearchParams,
    ]);

    render(<Pagination totalPages={totalPages} />);

    fireEvent.click(screen.getByText('>'));

    expect(setSearchParams).not.toHaveBeenCalled();
  });

  test('handles page change when on page 3', () => {
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams({ page: '3', details: 'some-detail' }),
      setSearchParams,
    ]);

    render(<Pagination totalPages={totalPages} />);

    fireEvent.click(screen.getByText('<'));

    expect(setSearchParams).toHaveBeenCalledWith(expect.any(Function));

    const newSearchParams = setSearchParams.mock.calls[0][0](
      new URLSearchParams()
    );
    expect(newSearchParams.get('page')).toBe('2');
    expect(newSearchParams.get('details')).toBe('some-detail');
  });

  test('handles page change to the last page', () => {
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams({ page: '4', details: 'some-detail' }),
      setSearchParams,
    ]);

    render(<Pagination totalPages={totalPages} />);

    fireEvent.click(screen.getByText('>'));

    expect(setSearchParams).toHaveBeenCalledWith(expect.any(Function));

    const newSearchParams = setSearchParams.mock.calls[0][0](
      new URLSearchParams()
    );
    expect(newSearchParams.get('page')).toBe('5');
    expect(newSearchParams.get('details')).toBe('some-detail');
  });
});
