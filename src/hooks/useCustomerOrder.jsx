import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCustomerOrder = () => {
    const{user , loading} = useAuth();
    const[axiosSecure] = useAxiosSecure();

    const{data: customerOrders =[] ,refetch}=useQuery({
        queryKey:["users-orders" , user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/customers-orders?email=${user?.email}`)
            return res.data;
        }
    })
    return [customerOrders , refetch]
};

export default useCustomerOrder;