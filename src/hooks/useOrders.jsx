import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useOrders = () => {
    const [axiosSecure] =useAxiosSecure()
    const {data: allOrders=[] , refetch} =useQuery({
        queryKey:["allOrders"],
        queryFn: async()=> {
            const res = await axiosSecure.get("http://localhost:5000/all-orders")
            return res.data;
        }
    })
    return [allOrders, refetch];
};

export default useOrders;