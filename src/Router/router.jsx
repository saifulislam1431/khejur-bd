import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Main from '../layout/Main';
import Home from '../pages/Home/Home/Home';
import Shop from '../pages/Shop/Shop';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';

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
            }
        ]
    }
])

export default router;