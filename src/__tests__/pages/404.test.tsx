import { render, screen } from '@testing-library/react';
import NotFoundPage from '@/pages/404';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('NotFoundPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<NotFoundPage />);

    expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /go to home page/i })
    ).toBeInTheDocument();
  });

  it('navigates to home page when button is clicked', async () => {
    const mockPush = vi.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(<NotFoundPage />);

    const button = screen.getByRole('button', { name: /go to home page/i });

    await userEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith('/');
    expect(mockPush).toHaveBeenCalledTimes(1);
  });
});
