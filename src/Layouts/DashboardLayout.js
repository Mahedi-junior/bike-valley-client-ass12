import React from 'react';
import DashboardSidebar from '../Pages/Dashboard/DashboardSidebar/DashboardSidebar';
import Navbar from '../Shared/Navbar/Navbar';

const DashboardLayout = () => {
    return (
        <div>
            <Navbar />
            <DashboardSidebar />
        </div>
    );
};

export default DashboardLayout;