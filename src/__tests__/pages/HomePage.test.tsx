import { render, screen } from '@testing-library/react';
import HomePage from '@/pages/index';

vi.mock('@/components/Header/Header', () => ({
  default: () => <div>Mocked Header</div>,
}));
vi.mock('@/components/Main/Main', () => ({
  default: () => <div>Mocked Main</div>,
}));
vi.mock('@/components/Footer/Footer', () => ({
  default: () => <div>Mocked Footer</div>,
}));

describe('HomePage', () => {
  it('renders Header, Main, and Footer components', () => {
    render(<HomePage />);

    expect(screen.getByText('Mocked Header')).toBeInTheDocument();
    expect(screen.getByText('Mocked Main')).toBeInTheDocument();
    expect(screen.getByText('Mocked Footer')).toBeInTheDocument();
  });
});
