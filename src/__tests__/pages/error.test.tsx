import { render, screen } from '@testing-library/react';
import ErrorPage from '@/pages/_error';
import { vi } from 'vitest';

vi.mock('next', () => ({
  ...vi.importActual('next'),
  NextPageContext: vi.fn(),
}));

describe('ErrorPage', () => {
  it('renders the correct error message when statusCode is provided', async () => {
    const mockStatusCode = 404;

    const mockGetInitialProps = vi
      .fn()
      .mockReturnValue({ statusCode: mockStatusCode });

    ErrorPage.getInitialProps = mockGetInitialProps;

    render(<ErrorPage statusCode={mockStatusCode} />);

    expect(screen.getByText(`Error ${mockStatusCode}`)).toBeInTheDocument();
    expect(screen.getByText('Please try again later.')).toBeInTheDocument();
  });

  it('renders default error message when no statusCode is provided', async () => {
    const mockStatusCode = undefined;

    const mockGetInitialProps = vi
      .fn()
      .mockReturnValue({ statusCode: mockStatusCode });

    ErrorPage.getInitialProps = mockGetInitialProps;

    render(<ErrorPage statusCode={mockStatusCode} />);

    expect(screen.getByText('An error occurred')).toBeInTheDocument();
    expect(screen.getByText('Please try again later.')).toBeInTheDocument();
  });
});
