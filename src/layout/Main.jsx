import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/Shared/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';

const Main = () => {
    return (
        <section>
            <Navbar />
            <Outlet />
            <Footer />
        </section>
    );
};

export default Main;