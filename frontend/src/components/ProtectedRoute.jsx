import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ element: Component, ...props }) {
  // if (!props.isLoggedIn) {
  //   return null;
  // }

  return (props.isLoggedIn === false) ? (<Navigate to='/signin' replace />) : (<Component {...props} />);
}
