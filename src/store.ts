import { configureStore } from '@reduxjs/toolkit';
import authReducer from './api/slices/authSlices';
import tripsReducer from './api/slices/tripsSlice';
import bookingsReducer from './api/slices/bookingsSlice';

const store: any = configureStore({
  reducer: {
    auth: authReducer,
    trips: tripsReducer,
    bookings: bookingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;