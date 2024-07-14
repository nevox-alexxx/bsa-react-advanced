import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import App from "./App.tsx"
import { SignUp } from "./pages/SignUp.tsx";
import { SignIn } from "./pages/SignIn.tsx";
import { ErrorPage } from "./pages/ErrorPage.tsx";
import { MainPage } from './pages/MainPage.tsx'
import { Bookings } from './pages/Booking.tsx';
import { TripPage } from './pages/TripPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to="/sign-up" replace />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/main",
        element: <MainPage />,
      },
      {
        path: "/bookings",
        element: <Bookings />,
      },
      {
        path: "/trip/:tripId",
        element: <TripPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <RouterProvider router={router} />
);
