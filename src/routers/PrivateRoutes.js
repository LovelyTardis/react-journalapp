import React from 'react'
import { Navigate } from 'react-router-dom';

export const PrivateRoutes = ({children, isAuthenticated}) => {
    return isAuthenticated
        ? children
        : <Navigate to='/auth/login' />
}
