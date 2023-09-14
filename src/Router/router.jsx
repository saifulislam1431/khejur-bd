import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Main from '../layout/Main';
import Home from '../pages/Home/Home/Home';
import Shop from '../pages/Shop/Shop';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';
import About from '../pages/About/About';
import AddTestimonial from '../pages/Home/Testimonial/AddTestimonial';
import PrivateRoute from './PrivateRoute';
import Cart from '../pages/Cart/Cart';
import OrderConfirmation from '../pages/OrderConfirmation/OrderConfirmation';

const router = createBrowserRouter([
    {
        path:"/",
        errorElement:<ErrorPage />,
        element:<Main />,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path: "/shop",
                element: <Shop/>
            },
            {
                path:"/details/:id",
                element:<ProductDetails />
            },
            {
                path:"/signIn",
                element:<SignIn />
            },
            {
                path:"/signUp",
                element:<SignUp />
            },
            {
                path:"/about",
                element:<About />
            },
            {
                path:"/add-testimonial",
                element:<PrivateRoute><AddTestimonial /></PrivateRoute>
            },
            {
                path:"/cart",
                element:<PrivateRoute><Cart /></PrivateRoute>
            },
            {
                path:"/order-confirmation",
                element:<OrderConfirmation />
            }
        ]
    }
])

export default router;