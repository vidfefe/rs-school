import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import NotFound from '@/pages/NotFoundPage';
import { vi } from 'vitest';
import { useNavigate } from 'react-router';
import userEvent from '@testing-library/user-event';

vi.mock('react-router', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('NotFound Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
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

  it('navigates to home page when button is clicked', async () => {
    const mockNavigate = vi.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

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
