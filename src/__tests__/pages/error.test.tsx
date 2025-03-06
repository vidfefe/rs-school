import { render, screen } from '@testing-library/react';
import { notFound } from 'next/navigation';
import ErrorPage from '@/app/error';
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

describe('ErrorPage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders the correct error message when statusCode is provided', () => {
    const mockStatusCode = 500;

    render(<ErrorPage statusCode={mockStatusCode} />);

    expect(screen.getByText(`Error ${mockStatusCode}`)).toBeInTheDocument();
    expect(screen.getByText('Please try again later')).toBeInTheDocument();
    expect(notFound).not.toHaveBeenCalled();
  });

  test('calls notFound when statusCode is 404', () => {
    render(<ErrorPage statusCode={404} />);

    expect(notFound).toHaveBeenCalledTimes(1);
  });
});
