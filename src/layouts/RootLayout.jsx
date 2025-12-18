import React from 'react';
// import Navbar from '../components/Navbar';
// import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="pt-10"></div>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;