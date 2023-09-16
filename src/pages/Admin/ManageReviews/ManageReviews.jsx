import React from 'react';
import DashHead from '../../../components/DashHead';
import useReviews from '../../../hooks/useReviews';
import { HiMiniTrash } from 'react-icons/hi2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageReviews = () => {
    const [ axiosSecure] = useAxiosSecure()
    const [reviews , refetch] = useReviews()

    const handleVerify = async(id) =>{
        const newUpdate={
            status: "Ok"
        }
const res = await axiosSecure.patch(`/update-review/${id}`,newUpdate)
if(res.data.modifiedCount > 0){
    refetch()
    Swal.fire({
        title: 'Success!',
        text: "Review Approved!",
        icon: 'success',
        confirmButtonText: 'Cool'
    })
}
    }
    const handleDlt = (id) =>{
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
                const res = await axiosSecure.delete(`/delete-review/${id}`)
                if(res.data.deletedCount > 0){
                    refetch()
                    Swal.fire(
                        'Deleted!',
                        'Review has been deleted.',
                        'success'
                      )
                }

            }
          })
    }

    return (
        <section>
            <DashHead title="Manage Reviews"/>

            <div className='my-20 mx-auto'>
<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Product</th>
        <th>Review</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
reviews.map(review=><tr key={review?._id} className='font-medium'>

<td>{review?.name}</td>
<td>{review?.email ? review?.email : "Old review thats why email not found!"}</td>
<td>{review?.product ? review?. product : "Old review"}</td>        
<td><label htmlFor={review?._id} className='myBtn'>View</label></td>        

<td className='inline-flex items-center gap-2'>

<button onClick={()=>handleVerify(review?._id)} disabled={review?.status === "Ok" ? true :false} className='border px-2 py-1 rounded border-secondary text-secondary hover:text-white hover:bg-secondary transition-all duration-500 disabled:opacity-60 disabled:cursor-pointer'>Approve</button>


<button onClick={()=>handleDlt(review?._id)} className='border px-2 py-1 rounded border-error bg-error hover:text-error text-white hover:bg-transparent transition-all duration-500'><HiMiniTrash className='h-5 w-5'/></button>
</td>       
<td>

<input type="checkbox" id={review?._id} className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg text-primary">Rating: {review?.rating}</h3>
    <p className="py-4 font-medium">{review?.details}</p>
    <div className="modal-action">
      <label htmlFor={review?._id} className="btn">Close!</label>
    </div>
  </div>
</div>

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

export default ManageReviews;