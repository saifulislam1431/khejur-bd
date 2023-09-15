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
import DashBoard from '../pages/DashBoard/DashBoard';
import AdminRoute from './AdminRoute';
import ManageProducts from '../pages/Admin/ManageProducts/ManageProducts';
import AddProduct from '../pages/Admin/AddProduct/AddProduct';
import ManageUsers from '../pages/Admin/ManageUsers/ManageUsers';
import ManageOrders from '../pages/Admin/ManageOrders/ManageOrders';
import UpdateProducts from '../pages/Admin/UpdateProducts/UpdateProducts';
import UserOrders from '../pages/UserDash/UserOrders/UserOrders';
import TrackOrders from '../pages/UserDash/TrackOrders/TrackOrders';

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
            },
            {
                path:"/dashboard",
                element:<PrivateRoute><DashBoard /></PrivateRoute>,
                children:[
                    {
                        path:"manageProducts",
                        element: <PrivateRoute><AdminRoute><ManageProducts/></AdminRoute></PrivateRoute>
                    },
                    {
                        path:"add-product",
                        element:<PrivateRoute><AdminRoute><AddProduct /></AdminRoute></PrivateRoute>
                    },
                    {
                        path:"manageUsers",
                        element:<PrivateRoute><AdminRoute><ManageUsers /></AdminRoute></PrivateRoute>
                    },
                    {
                        path:"manageOrders",
                        element:<PrivateRoute><AdminRoute><ManageOrders/></AdminRoute></PrivateRoute>
                    },
                    {
                        path:"updateProduct/:id",
                        element:<PrivateRoute><AdminRoute><UpdateProducts /></AdminRoute></PrivateRoute>
                    },
                    {
                        path:"my-orders",
                        element:<PrivateRoute><UserOrders /></PrivateRoute>
                    },
                    {
                        path:"track-orders",
                        element:<PrivateRoute><TrackOrders /></PrivateRoute>
                    }
                ]
            }
        ]
    }
])

export default router;