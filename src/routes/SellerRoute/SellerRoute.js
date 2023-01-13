import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useSeller from '../../hooks/useSeller';
import Loader from '../../Shared/Loader/Loader';

const SellerRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const [isSeller, sellerLoading] = useSeller(user?.email);
    const location = useLocation();

    if (sellerLoading || loading) {
        return <Loader />
    }

    if (user && isSeller) {
        return children;
    }

    return <Navigate to='/login' state={{from: location}} replace/>
};

export default SellerRoute;