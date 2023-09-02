import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ element: Component, ...props }) {
  return (props.isLoggedIn === false) ? (<Navigate to='/sign-in' replace />) : (<Component {...props} />);
}
