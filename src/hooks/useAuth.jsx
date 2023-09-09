import React, { useContext } from 'react';
import { UserAuth } from '../Auth/Auth';

const useAuth = () => {

    const auth = useContext(UserAuth)
    return auth;
};

export default useAuth;