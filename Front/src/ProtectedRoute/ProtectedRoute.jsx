import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../UserContext/Context.jsx';

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    // If user is not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child route
  return children;
}

export default ProtectedRoute;