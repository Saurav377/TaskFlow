import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const user = sessionStorage.getItem('existingUser');

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, allow access
  return children;
}

export default PrivateRoute;
