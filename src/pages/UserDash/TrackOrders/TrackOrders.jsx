import React from 'react';
import useCustomerOrder from '../../../hooks/useCustomerOrder';
import DashHead from '../../../components/DashHead';
import moment from 'moment/moment';

const TrackOrders = () => {
    const [customerOrders] = useCustomerOrder();
    return (
       <section>
        <DashHead title="Track Orders"/>

<div className='my-20 mx-auto'>
<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Items</th>
        <th>Transaction Id</th>
        <th>Total</th>
        <th>Date</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {
customerOrders.map(order=><tr key={order._id} className='font-medium'>

        <td>
        {order?.products.map(prod=><p>{prod?.name}</p>)}
        </td>


        <td>{order?.transactionId}</td>
        <td>৳ {order?.totalPrice}</td>

        <td>{moment(order?.date).format("MMM Do YY")}</td>

        <td className={`${order?.orderStatus === "Pending" ? "text-primary" : "text-secondary"}`}>{order?.orderStatus}</td>
        
    </tr>)
      }

    </tbody>
    
  </table>
</div>
</div>        
       </section>
    );
};

export default TrackOrders;