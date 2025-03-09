import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import NotFound from '@/pages/NotFoundPage';
import { Mock, vi } from 'vitest';
import { useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
}));

describe('NotFound Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders correctly', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /go to home page/i })
    ).toBeInTheDocument();
  });

  test('navigates to home page when button is clicked', async () => {
    const mockNavigate = vi.fn();
    (useNavigate as Mock).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /go to home page/i });

    await userEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
