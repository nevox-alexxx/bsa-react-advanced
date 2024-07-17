import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
import { Trip } from '../../types';
import { RootState } from '../../store'

interface TripsState {
  trips: Trip[];
  loading: boolean;
  error: string | null;
}

const initialState: TripsState = {
  trips: [],
  loading: false,
  error: null,
};

export const fetchTripsAsync = createAsyncThunk<Trip[], void, { rejectValue: string }>(
    'trips/fetchTrips',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get<Trip[]>('/trips');
        return response.data;
      } catch (error) {
        return rejectWithValue('Failed to fetch trips');
      }
    }
  );
  
  const tripsSlice = createSlice({
    name: 'trips',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchTripsAsync.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchTripsAsync.fulfilled, (state, action) => {
          state.loading = false;
          state.trips = action.payload;
        })
        .addCase(fetchTripsAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  
  export const selectTrips = (state: RootState) => state.trips.trips;
  export const selectTripsLoading = (state: RootState) => state.trips.loading;
  export const selectTripsError = (state: RootState) => state.trips.error;
  
  export default tripsSlice.reducer;