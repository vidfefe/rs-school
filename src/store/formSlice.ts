import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'other';
  acceptTerms: boolean;
  picture: string;
  country: string;
}

interface FormState {
  users: FormData[];
  newSubmissionId: string | null;
}

const initialState: FormState = {
  users: [],
  newSubmissionId: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<FormData>) => {
      state.users.push(action.payload);
      state.newSubmissionId = action.payload.id;
    },
    resetNewSubmition: (state) => {
      state.newSubmissionId = null;
    },
  },
});

export const { addUser, resetNewSubmition } = formSlice.actions;
export default formSlice.reducer;
