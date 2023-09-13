import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCarts = () => {
    const{user , loading} = useAuth();
    const[axiosSecure] = useAxiosSecure();

    const{data: carts =[] ,refetch}=useQuery({
        queryKey:["users-carts" , user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users-carts?email=${user?.email}`)
            return res.data;
        }
    })
    return [carts , refetch]
};

export default useCarts;