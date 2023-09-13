import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';



const axiosSecure = axios.create({
    baseURL: "http://localhost:5000"
});

const useAxiosSecure = () => {
    const {logOut} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        axiosSecure.interceptors.request.use((req)=>{
            const token = localStorage.getItem("access-token")
            if(token){
                req.headers.Authorization = `Bearer ${token}`
            }
            return req;
        });
        axiosSecure.interceptors.response.use((res)=>res, async(error)=>{
            if(error.res && (error.res.status === 401 || error.res.status === 403)){
                await logOut();
                navigate("/signIn")
            }
            return Promise.reject(error);
        });
    },[logOut, navigate])
    return [axiosSecure]
};

export default useAxiosSecure;