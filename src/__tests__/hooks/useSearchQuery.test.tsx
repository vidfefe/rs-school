import { renderHook, act } from '@testing-library/react';
import { useSearchQuery } from '@/hooks/useSearchQuery';
import { Mock, vi } from 'vitest';

beforeAll(() => {
  global.localStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
    removeItem: vi.fn(),
  } as unknown as Storage;
});

describe('useSearchQuery', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test('initializes searchValue from localStorage', () => {
    (localStorage.getItem as Mock).mockReturnValueOnce('pikachu');

    const { result } = renderHook(() => useSearchQuery('searchKey'));

    expect(result.current[0]).toBe('pikachu');
  });

  test('sets searchValue in localStorage when it changes', () => {
    const { result } = renderHook(() => useSearchQuery('searchKey'));

    expect(result.current[0]).toBe('');

    act(() => {
      result.current[1]('charizard');
    });

    expect(result.current[0]).toBe('charizard');

    expect(localStorage.setItem).toHaveBeenCalledWith('searchKey', 'charizard');
  });

  test('returns empty string if no value exists in localStorage', () => {
    const { result } = renderHook(() => useSearchQuery('nonExistentKey'));

    expect(result.current[0]).toBe('');
  });

  test('updates localStorage when searchValue is updated', () => {
    const { result } = renderHook(() => useSearchQuery('searchKey'));

    expect(result.current[0]).toBe('');

    act(() => {
      result.current[1]('bulbasaur');
    });

    expect(result.current[0]).toBe('bulbasaur');
    expect(localStorage.setItem).toHaveBeenCalledWith('searchKey', 'bulbasaur');
  });
});
