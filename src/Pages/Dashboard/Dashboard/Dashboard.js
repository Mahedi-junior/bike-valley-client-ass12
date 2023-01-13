import React from 'react';
import useTitle from '../../../hooks/useTitle';

const Dashboard = () => {
    useTitle('Dashboard')
    return (
        <div>
            <h3 className='text-3xl font-semibold text-gray-800'>Welcome to your dashboard</h3>
        </div>
    );
};

export default Dashboard;