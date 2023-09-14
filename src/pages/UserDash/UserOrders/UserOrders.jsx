import React from 'react';
import useCustomerOrder from '../../../hooks/useCustomerOrder';
import DashHead from '../../../components/DashHead';

const UserOrders = () => {
    const [customerOrders] = useCustomerOrder();
    console.log(customerOrders);
    return (
       <section>
        <DashHead title="My Orders"/>

<div className='my-20 lg:w-[95%] mx-auto'>
<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        
      </tr>
    </tbody>
    
  </table>
</div>
</div>        
       </section>
    );
};

export default UserOrders;