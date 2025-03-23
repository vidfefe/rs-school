import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface CountryState {
  countries: string[];
  loading: boolean;
  error: string | null;
}

const initialState: CountryState = {
  countries: [],
  loading: false,
  error: null,
};

export const fetchCountries = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>('countries/fetchCountries', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (!response.ok) throw new Error('Failed to fetch countries');

    const data = await response.json();
    const countries = data
      .map((country: { name: { common: string } }) => country.name.common)
      .sort();

    return countries;
  } catch (error) {
    return rejectWithValue(`Error fetching countries: ${error}`);
  }
});

const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCountries.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.countries = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load countries';
      });
  },
});

export default countrySlice.reducer;
