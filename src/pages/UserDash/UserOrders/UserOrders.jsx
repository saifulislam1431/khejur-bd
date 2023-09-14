import React from 'react';
import useCustomerOrder from '../../../hooks/useCustomerOrder';

const UserOrders = () => {
    const [customerOrders] = useCustomerOrder();
    console.log(customerOrders);
    return (
        <div>
            UserOrders
        </div>
    );
};

export default UserOrders;