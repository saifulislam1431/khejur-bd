import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../pages/Shared/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';
import { HiOutlineChatBubbleOvalLeftEllipsis } from 'react-icons/hi2';

const Main = () => {
    const location = useLocation();
    const loginPath = location.pathname.includes("signIn");
    const registerPath = location.pathname.includes("signUp");
    return (
        <section>
             {registerPath || loginPath ||  <Navbar />}
           
            <div className="fixed bottom-12 right-0 lg:bottom-0 lg:right-0 m-8 z-50 border border-primary rounded-3xl text-primary hover:bg-primary hover:text-white transition-all duration-500 animate-pulse">
            <a href="https://api.whatsapp.com/send?phone=8801701131464" target='_blank' className='inline-flex items-center gap-1 px-3 py-1'>
                
                <HiOutlineChatBubbleOvalLeftEllipsis className='w-7 h-7'/> <span className='text-lg font-black'>Chat</span>

            </a>
            </div>
            <div className='max-w-7xl mx-auto'>
            <Outlet />
            </div>
           
{registerPath || loginPath ||  <Footer />}
           
        </section>
    );
};

export default Main;