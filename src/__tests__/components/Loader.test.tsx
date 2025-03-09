import { render, screen } from '@testing-library/react';
import Loader from '@/components/Loader';

describe('Loader', () => {
  test('renders loader component', () => {
    render(<Loader />);

    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveClass(
      'flex',
      'justify-center',
      'items-center',
      'min-h-96'
    );
  });
});
