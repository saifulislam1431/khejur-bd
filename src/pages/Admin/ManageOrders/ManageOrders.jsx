import React from 'react';
import DashHead from '../../../components/DashHead';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { HiMiniXMark } from 'react-icons/hi2';
import Swal from 'sweetalert2';
import useOrders from '../../../hooks/useOrders';

const ManageOrders = () => {

    const [axiosSecure] =useAxiosSecure();
    const [allOrders, refetch] = useOrders();


    // console.log(allOrders);

    const handleStatus =(id) =>{
        const newData ={
            orderStatus: "Confirmed"
        }
        Swal.fire({
            title: 'Are you sure?',
            text: "Did you match the transaction id?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, make it!'
          }).then(async(result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/order-manage/${id}`,newData)
                
                if(res.data.modifiedCount > 0){
                    refetch()
                    Swal.fire(
                        'Confirmed!',
                        `Order is confirm`,
                        'success'
                      )
                }
    
            }
          })
    }

    return (
        <section>
            <DashHead title="Manage Orders"/>

<div className='my-16'>

<div className='my-20 mx-auto'>
<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Email</th>
        <th>Phone</th>
        <th>Items</th>
        <th>Transaction Id</th>
        <th>Total</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
allOrders.map(order=><tr key={order?._id} className='font-medium'>
        <td>{order?.email}</td>
        <td>{order?.phone}</td>
        <td>
        {order?.products.map(prod=><p>{prod?.name}</p>)}
        </td>
        <td>{order?.transactionId}</td>
        <td>৳ {order?.totalPrice}</td>
        <td className='inline-flex items-center gap-3'>
        <label htmlFor={order?._id} className="myBtn">Details</label>
<button disabled={order?.orderStatus === "Confirmed" ? true : false} className={`${order?.orderStatus === "Confirmed" ? "px-2 py-1 bg-secondary rounded text-white disabled:opacity-50 disabled:cursor-not-allowed" : "px-2 py-1 bg-secondary rounded text-white disabled:opacity-50 disabled:cursor-not-allowed"}`} onClick={()=>handleStatus(order._id)}>Get Confirm</button>
        </td>

 <input type="checkbox" id={order?._id} className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg text-primary">Order Of {order?.customerName}</h3>

<div className='flex flex-col lg:flex-row items-start justify-between gap-5 my-6'>
<div className='w-full'>
<h1 className='text-lg font-bold text-secondary'>Shipping Details</h1>

<div className='my-2 space-y-2'>
    <p>State: {order?.state}</p>
    <p>City: {order?.city}</p>
    <p>Address: {order?.address}, {order?.postalCode}</p>
</div>
</div>

<div className="divider lg:divider-horizontal"></div> 

<div className='w-full'>
<h1 className='text-lg font-bold text-secondary'>Product Details</h1>
<div className='my-2 space-y-2'>
    {
        order?.products?.map(prod=><div key={prod._id} className='border-b-2 rounded-lg pb-2'>
<p>Name: {prod?.name}</p>
<p>Base Price: {prod?.basePrice}</p>
    <p>Size & Quantity: {prod?.baseSize} x {prod?.quantity}</p>
        </div>)
    }
</div>
</div>
</div>


    <div className="modal-action">
      <label htmlFor={order?._id} className="absolute top-3 right-3 cursor-pointer hover:text-error"><HiMiniXMark  className='w-6 h-6'/></label>
    </div>
  </div>
</div>       
        
    </tr>)
      }

    </tbody>
    
  </table>
</div>
</div>        
</div>            
        </section>
    );
};

export default ManageOrders;