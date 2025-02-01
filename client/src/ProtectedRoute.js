import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user.isAuthenticated) {
    return <Navigate to="/" replace />; // Redirect to Profile if not authenticated
  }

  if (user.role !== requiredRole) {
    return <Navigate to="/" replace />; // Redirect if not the required role
  }

  return children;
};

export default ProtectedRoute;
