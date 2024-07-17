import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../api/slices/authSlices';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const auth = useSelector(selectAuth);
  return (
    <Route
      {...rest}
      render={(props: any) =>
        auth.token ? <Component {...props} /> : <Navigate to="/signin" />
      }
    />
  );
};

export default PrivateRoute;