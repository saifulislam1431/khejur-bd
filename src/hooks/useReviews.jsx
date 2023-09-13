import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const useReviews = () => {

    const{data: reviews =[] ,refetch}=useQuery({
        queryKey:["reviews"],
        queryFn: async()=>{
            const res = await axios.get("http://localhost:5000/reviews")
            return res.data;
        }
    })
    return [reviews , refetch]
};

export default useReviews;