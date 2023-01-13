import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import Loader from '../../Shared/Loader/Loader';

const AdminRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <Loader />
    }

    if (user && isAdmin) {
        console.log(isAdmin);
        return children;
    }

    return <Navigate to='/login' state={{from: location}} replace/>
};

export default AdminRoute;