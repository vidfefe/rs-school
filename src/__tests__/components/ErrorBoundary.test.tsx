import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorButton from '@/components/ErrorButton';
import { vi } from 'vitest';

describe('ErrorBoundary component', () => {
  let consoleErrorMock: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
  });

  test('renders child component without error', () => {
    render(
      <ErrorBoundary>
        <p>Test content</p>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('catches error and displays fallback UI', async () => {
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByText(/error/i);
    await user.click(button);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /reset functionality/i })
    ).toBeInTheDocument();
    expect(consoleErrorMock).toHaveBeenCalled();
  });

  test('resets error state when reset button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByText(/error/i);
    await user.click(button);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    const resetButton = screen.getByRole('button', {
      name: /reset functionality/i,
    });
    await user.click(resetButton);

    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
