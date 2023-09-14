import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useProfile = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: userInfo = {}, refetch} = useQuery({
        queryKey: ["userInfo", user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {

            const res = await axiosSecure.get(`/user?email=${user?.email}`)
            return res.data;

        }
    })
    return [userInfo, refetch]
};

export default useProfile;