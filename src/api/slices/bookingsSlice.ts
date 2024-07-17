import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
import { Booking } from '../../types';
import { RootState } from '../../store'

interface BookingsState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

const initialState: BookingsState = {
  bookings: [],
  loading: false,
  error: null,
};

export const fetchBookingsAsync = createAsyncThunk<Booking[], void, { rejectValue: string }>(
    'bookings/fetchBookings',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get<Booking[]>('/bookings');
        return response.data;
      } catch (error) {
        return rejectWithValue('Failed to fetch bookings');
      }
    }
  );

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookingsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Something went wrong.';
      });
  },
});

export const selectBookings = (state: RootState) => state.bookings.bookings;
export const selectBookingLoading = (state: RootState) => state.bookings.loading;
export const selectBookingError = (state: RootState) => state.bookings.error;

export default bookingsSlice.reducer;