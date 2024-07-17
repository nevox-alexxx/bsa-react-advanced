export interface Trip {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
  }
  
  export interface Booking {
    id: string;
    trip: Trip;
    guests: number;
    date: string;
    totalPrice: number;
  }
  
  export interface AuthState {
    token: string | null;
    user: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  
  export interface SignInPayload {
    email: string;
    password: string;
  }
  
  export interface SignUpPayload {
    email: string;
    password: string;
    fullName: string;
  }
  
  export interface User {
    id: string;
    fullName: string;
    email: string;
    token: string;
  }