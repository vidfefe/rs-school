import { render, screen, fireEvent } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import { useRouter } from 'next/router';
import Pagination from '@/components/Main/Pagination';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('Pagination Component', () => {
  const mockPush = vi.fn();
  const totalPages = 5;

  beforeEach(() => {
    mockPush.mockClear();
    (useRouter as Mock).mockReturnValue({
      query: { page: '1', details: 'some-detail' },
      push: mockPush,
    });
  });

  test('renders pagination with correct initial state', () => {
    render(<Pagination totalPages={totalPages} />);

    expect(screen.getByText('1 / 5')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '<' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '>' })).toBeEnabled();
  });

  test('handles page change when clicking next', () => {
    render(<Pagination totalPages={totalPages} />);

    fireEvent.click(screen.getByRole('button', { name: '>' }));

    expect(mockPush).toHaveBeenCalledWith({
      query: { page: '2', details: 'some-detail' },
    });
  });

  test('handles page change when clicking previous', () => {
    (useRouter as Mock).mockReturnValue({
      query: { page: '2', details: 'some-detail' },
      push: mockPush,
    });

    render(<Pagination totalPages={totalPages} />);

    fireEvent.click(screen.getByRole('button', { name: '<' }));

    expect(mockPush).toHaveBeenCalledWith({
      query: { page: '1', details: 'some-detail' },
    });
  });

  test('does not allow page change when on first or last page', () => {
    (useRouter as Mock).mockReturnValue({
      query: { page: '1', details: 'some-detail' },
      push: mockPush,
    });

    render(<Pagination totalPages={totalPages} />);

    fireEvent.click(screen.getByRole('button', { name: '<' }));

    expect(mockPush).not.toHaveBeenCalled();
  });

  test('does not allow page change when on last page', () => {
    (useRouter as Mock).mockReturnValue({
      query: { page: '5', details: 'some-detail' },
      push: mockPush,
    });

    render(<Pagination totalPages={totalPages} />);

    fireEvent.click(screen.getByRole('button', { name: '>' }));

    expect(mockPush).not.toHaveBeenCalled();
  });

  test('handles page change when on page 3', () => {
    (useRouter as Mock).mockReturnValue({
      query: { page: '3', details: 'some-detail' },
      push: mockPush,
    });

    render(<Pagination totalPages={totalPages} />);

    fireEvent.click(screen.getByRole('button', { name: '<' }));

    expect(mockPush).toHaveBeenCalledWith({
      query: { page: '2', details: 'some-detail' },
    });
  });

  test('handles page change to the last page', () => {
    (useRouter as Mock).mockReturnValue({
      query: { page: '4', details: 'some-detail' },
      push: mockPush,
    });

    render(<Pagination totalPages={totalPages} />);

    fireEvent.click(screen.getByRole('button', { name: '>' }));

    expect(mockPush).toHaveBeenCalledWith({
      query: { page: '5', details: 'some-detail' },
    });
  });
});
