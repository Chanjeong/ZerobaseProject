import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useLogin } from '../Provider/LoginProvider';

function PrivateRoute() {
    const { loggedIn } = useLogin();

    return loggedIn ? <Outlet /> : <Navigate to="/main" />;
}

export default PrivateRoute;
