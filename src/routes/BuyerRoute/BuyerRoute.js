import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useBuyer from '../../hooks/useBuyer';
import Loader from '../../Shared/Loader/Loader';

const BuyerRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const [isBuyer, buyerLoading] = useBuyer(user?.email);
    const location = useLocation();

    if (buyerLoading || loading) {
        return <Loader />
    }

    if (user && isBuyer) {
        return children
    }

    return <Navigate to='/login' state={{from: location}}  replace/>
};

export default BuyerRoute;