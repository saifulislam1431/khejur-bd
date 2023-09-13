import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const PrivateRoute = ({children}) => {
    const {user , loading} = useAuth();
    const location = useLocation()
    if(loading){
        return <h1>Loading</h1>
    }
    if(!user){
        Swal.fire({
            title: 'Alert!',
            text: "You have to sign in first",
            icon: 'error',
            confirmButtonText: 'Cool'
          })
          return <Navigate to="/signIn" state={{from : location}} replace/>
    }
    if(user){
        return children;
    }
};

export default PrivateRoute;