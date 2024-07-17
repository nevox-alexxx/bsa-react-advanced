import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api, { setAuthToken } from '../../api/api';
import { AuthState, SignInPayload, SignUpPayload, User } from '../../types';
import { RootState } from '../../store';

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: null,
  status: 'idle',
  error: null,
};

export const signUp = createAsyncThunk<User, SignUpPayload, { rejectValue: string }>(
  'auth/signUp',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post<User>('/auth/sign-up', payload);
      const token = response.data.token;
      localStorage.setItem('token', token);
      setAuthToken(token);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed');
    }
  }
);

export const signIn = createAsyncThunk<User, SignInPayload, { rejectValue: string }>(
  'auth/signIn',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post<User>('/auth/sign-in', payload);
      const token = response.data.token;
      localStorage.setItem('token', token);
      setAuthToken(token);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed');
    }
  }
);

export const fetchAuthenticatedUser = createAsyncThunk<User, void, { rejectValue: string }>(
  'auth/fetchAuthenticatedUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<User>('/auth/authenticated-user');
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      setAuthToken('');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchAuthenticatedUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAuthenticatedUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchAuthenticatedUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { signOut } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;