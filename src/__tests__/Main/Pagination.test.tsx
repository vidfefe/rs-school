import { render, screen, fireEvent } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Pagination from '@/components/Main/Pagination';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe('Pagination Component', () => {
  const mockPush = vi.fn();
  const totalPages = 5;

  beforeEach(() => {
    mockPush.mockClear();
    (useRouter as Mock).mockReturnValue({ push: mockPush });
    (usePathname as Mock).mockReturnValue('/');
    (useSearchParams as Mock).mockReturnValue(
      new URLSearchParams('page=1&details=pikachu')
    );
  });

  test('renders pagination with correct initial state', () => {
    (useSearchParams as Mock).mockReturnValue(
      new URLSearchParams('details=pikachu')
    );

    render(<Pagination totalPages={totalPages} />);

    expect(screen.getByText('1 / 5')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '<' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '>' })).toBeEnabled();
  });

  test('handles page change when clicking next', () => {
    render(<Pagination totalPages={totalPages} />);

    fireEvent.click(screen.getByRole('button', { name: '>' }));

    expect(mockPush).toHaveBeenCalledWith('/?page=2&details=pikachu');
  });

  test('handles page change when clicking previous', () => {
    (useSearchParams as Mock).mockReturnValue(
      new URLSearchParams('page=2&details=pikachu')
    );

    render(<Pagination totalPages={totalPages} />);

    fireEvent.click(screen.getByRole('button', { name: '<' }));

    expect(mockPush).toHaveBeenCalledWith('/?page=1&details=pikachu');
  });

  test('does not allow page change when on first page', () => {
    render(<Pagination totalPages={totalPages} />);

    fireEvent.click(screen.getByRole('button', { name: '<' }));

    expect(mockPush).not.toHaveBeenCalled();
  });

  test('does not allow page change when on last page', () => {
    (useSearchParams as Mock).mockReturnValue(
      new URLSearchParams('page=5&details=pikachu')
    );

    render(<Pagination totalPages={totalPages} />);

    fireEvent.click(screen.getByRole('button', { name: '>' }));

    expect(mockPush).not.toHaveBeenCalled();
  });

  test('handles page change when on page 3', () => {
    (useSearchParams as Mock).mockReturnValue(
      new URLSearchParams('page=3&details=pikachu')
    );

    render(<Pagination totalPages={totalPages} />);

    fireEvent.click(screen.getByRole('button', { name: '<' }));

    expect(mockPush).toHaveBeenCalledWith('/?page=2&details=pikachu');
  });

  test('handles page change to the last page', () => {
    (useSearchParams as Mock).mockReturnValue(
      new URLSearchParams('page=4&details=pikachu')
    );

    render(<Pagination totalPages={totalPages} />);

    fireEvent.click(screen.getByRole('button', { name: '>' }));

    expect(mockPush).toHaveBeenCalledWith('/?page=5&details=pikachu');
  });
});
