import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer/Footer';
import { renderWithStore } from '@/utils/testUtils';

describe('Footer', () => {
  it('renders ErrorButton and Flyout', () => {
    render(renderWithStore(<Footer />));

    expect(screen.getByRole('button', { name: /error/i })).toBeInTheDocument();
    expect(screen.getByTestId('flyout')).toBeInTheDocument();
  });
});
