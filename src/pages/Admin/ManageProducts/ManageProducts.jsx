import React from 'react';
import useProducts from '../../../hooks/useProducts';
import DashHead from '../../../components/DashHead';
import { IoIosCreate } from "react-icons/io";
import { HiMiniTrash, HiPencilSquare } from 'react-icons/hi2';
import { Link, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageProducts = () => {
    const [allProducts, refetch] = useProducts()
    const [axiosSecure] =useAxiosSecure()

    const handleDlt =(id)=>{
        // console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async(result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/delete-product/${id}`)
                if(res.data.deletedCount > 0){
                    refetch()
                    Swal.fire(
                        'Deleted!',
                        'Your item has been deleted.',
                        'success'
                      )
                }

            }
          })
    }

    return (
        <section>
        <DashHead title="Manage prods"/>

<div className='my-20 mx-auto'>
<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Size</th>
        <th>Stock</th>
        <th>Category</th>
        <th>Color</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
allProducts.map(prod=><tr key={prod?._id} className='font-medium'>

<td>{prod?.name}</td>
<td> ৳ {prod?.price}</td>
<td>{prod?.size}</td>        
<td>{prod?.stock}</td>        
<td>{prod?.category}</td>        
<td>{prod?.color}</td> 
<td className='inline-flex items-center gap-2'>
<Link to={`/dashboard/updateProduct/${prod?._id}`}>
<button className='border px-2 py-1 rounded border-primary text-primary hover:text-white hover:bg-primary transition-all duration-500'><HiPencilSquare className='h-5 w-5'/></button>
</Link>

<button onClick={()=>handleDlt(prod?._id)} className='border px-2 py-1 rounded border-error bg-error hover:text-error text-white hover:bg-transparent transition-all duration-500'><HiMiniTrash className='h-5 w-5'/></button>
</td>       
    </tr>)
      }

    </tbody>
    
  </table>
</div>
</div>        
       </section>
    );
};

export default ManageProducts;