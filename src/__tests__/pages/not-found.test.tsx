import { render, screen } from '@testing-library/react';
import NotFoundPage from '@/app/not-found';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('NotFoundPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders correctly', () => {
    render(<NotFoundPage />);

    expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /go to home page/i })
    ).toBeInTheDocument();
  });

  test('navigates to home page when button is clicked', async () => {
    render(<NotFoundPage />);

    const link = screen.getByRole('link', { name: /go to home page/i });

    await userEvent.click(link);

    expect(window.location.pathname).toBe('/');
  });
});
