import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router';
import Pagination from '../components/Main/Pagination';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: jest.fn(),
}));

describe('Pagination Component', () => {
  let mockNavigate: jest.Mock;

  beforeEach(() => {
    mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render current page and total pages correctly', () => {
    render(
      <MemoryRouter>
        <Pagination currentPage={3} totalPages={5} />
      </MemoryRouter>
    );

    expect(screen.getByText('3 / 5')).toBeInTheDocument();
  });

  it('should call navigate with the correct next page when Next button is clicked', () => {
    render(
      <MemoryRouter>
        <Pagination currentPage={2} totalPages={5} />
      </MemoryRouter>
    );

    const nextButton = screen.getByText('>');
    fireEvent.click(nextButton);

    expect(mockNavigate).toHaveBeenCalledWith('/search/3');
  });

  it('should call navigate with the correct previous page when Prev button is clicked', () => {
    render(
      <MemoryRouter>
        <Pagination currentPage={3} totalPages={5} />
      </MemoryRouter>
    );

    const prevButton = screen.getByText('<');
    fireEvent.click(prevButton);

    expect(mockNavigate).toHaveBeenCalledWith('/search/2');
  });

  it('should disable the Prev button on the first page', () => {
    render(
      <MemoryRouter>
        <Pagination currentPage={1} totalPages={5} />
      </MemoryRouter>
    );

    const prevButton = screen.getByText('<');
    expect(prevButton).toBeDisabled();
  });

  it('should disable the Next button on the last page', () => {
    render(
      <MemoryRouter>
        <Pagination currentPage={5} totalPages={5} />
      </MemoryRouter>
    );

    const nextButton = screen.getByText('>');
    expect(nextButton).toBeDisabled();
  });
});
