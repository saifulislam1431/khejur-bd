import React from 'react';
import useCustomerOrder from '../../../hooks/useCustomerOrder';
import DashHead from '../../../components/DashHead';

const UserOrders = () => {
    const [customerOrders] = useCustomerOrder();
    return (
       <section>
        <DashHead title="My Orders"/>

<div className='my-20 mx-auto'>
<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Email</th>
        <th>Items</th>
        <th>Base Size</th>
        <th>Base Price</th>
        <th>Transaction Id</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {
customerOrders.map(order=><tr key={order?._id} className='font-medium'>
        <td>{order?.email}</td>

        <td>
        {order?.products.map(prod=><p>{prod?.name}</p>)}
        </td>


        <td>{order?.products.map(prod=><p>
        <span>{prod?.baseSize}</span>
        </p>)}</td>

        <td>
        {order?.products.map(prod=><p>৳ {prod?.basePrice} x {prod?.quantity}</p>)}
        </td>

        <td>{order?.transactionId}</td>
        <td>৳ {order?.totalPrice}</td>
        
    </tr>)
      }

    </tbody>
    
  </table>
</div>
</div>        
       </section>
    );
};

export default UserOrders;