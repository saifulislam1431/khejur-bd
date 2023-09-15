import React from 'react';
import DashHead from '../../../components/DashHead';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { HiMiniTrash } from 'react-icons/hi2';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const [axiosSecure] =useAxiosSecure()

    const {data: allUser=[] , refetch} =useQuery({
        queryKey:["allUser"],
        queryFn: async()=> {
            const res = await axiosSecure.get("http://localhost:5000/all-user")
            return res.data;
        }
    })
    // console.log(allUser);

    const handleDlt = (id) =>{
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert the user!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async(result) => {
        if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/user-delete/${id}`)
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

    const handleRole = (user) =>{

      Swal.fire({
        title: 'Are you sure?',
        text: `To appoint ${user?.name} as an admin!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, make it!'
      }).then(async(result) => {
        if (result.isConfirmed) {
            const res = await axiosSecure.patch(`/users/admin/${user?._id}`)
            if(res.data.modifiedCount > 0){
                refetch()
                Swal.fire(
                    'Confirmed!',
                    `${user?.name} is an admin now.`,
                    'success'
                  )
            }

        }
      })
    }


    return (
        <section>
            <DashHead title="Mange Users"/>

<div className='my-20'>

<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        allUser?.map(user=><tr key={user._id}>
       <td>{user?.name}</td>
       <td>{user?.email}</td>
       <td>{user?.role ? user?.role : "User"}</td>
       <td className='inline-flex items-center gap-5'>

<button disabled={user?.role === "admin" ? true : false} className={`${user?.role === "admin" ? "px-2 py-1 bg-secondary rounded text-white disabled:opacity-50 disabled:cursor-not-allowed" : "px-2 py-1 bg-secondary rounded text-white disabled:opacity-50 disabled:cursor-not-allowed"}`} onClick={()=>handleRole(user)}>Make Admin</button>
<button onClick={()=>handleDlt(user?._id)} className='border px-2 py-1 rounded border-error bg-error hover:text-error text-white hover:bg-transparent transition-all duration-500'><HiMiniTrash className='h-5 w-5'/></button>

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

export default ManageUsers;