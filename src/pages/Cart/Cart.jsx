import React, { useEffect, useState } from 'react';
import "./cart.css"
import { HiTrash, HiUser } from "react-icons/hi2";
import { IoMdPaperPlane } from "react-icons/io";
import useProfile from '../../hooks/useProfile';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import useCarts from '../../hooks/useCarts';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

const Cart = () => {
    const navigate = useNavigate();
    const [carts, refetch] = useCarts();
    const total = carts.reduce((sum , item)=> parseInt(item.newPrice) + sum , 0)
    const [axiosSecure] = useAxiosSecure()
    const [error , setError] = useState("")
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [userInfo] = useProfile();
    const [allDivision, setAllDivision] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/all-districts")
            .then(res => res.json())
            .then(data => setAllDivision(data))
    }, [])



    const onSubmit = async(data) => {
        // console.log(data);
        if(data.state === "Select your State"){
            return setError("State is required")
        }
        else if(data.city === "Select your City"){
            return setError("City is required")
        }
        else if(data.office === false && data.home == false){
            return setError("Address type is required")
        }else if(data.office === true && data.home === true ){
            return setError("One can select one address type.")
        }else{
            const shippingInfo = {
                house: data.house,
                road: data.road,
                unionThana: data.unionThana,
                city: data.city,
                phone: data.phone,
                state: data.state,
                postalCode: data.postal,
                addressType: data.office ? "office" : "home"
            }
            console.log(shippingInfo);
            const res = await axiosSecure.patch(`/update-user-info/${userInfo?._id}`,shippingInfo)
            if(res.data){
                navigate("/order-confirmation")
            }
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
                const res = await axiosSecure.delete(`/remove-cart/${id}`)
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
        console.log(id);
    }
    return (
        <section className='pageLayout px-3 lg:px-10 py-10'>
            <Helmet>
                <title>Cart | khejur BD</title>
            </Helmet>

            <div className='w-full'>
                <div className='mb-8'>
                    <h1 className='mb-2 text-3xl font-bold'>Verify address</h1>
                    <p className='font-medium'>Please confirm your address!</p>
                </div>

                <div className='w-full lg:w-3/4 bg-white shadow-lg rounded-lg py-3 px-3 mb-8'>
                    <h1 className='inline-flex items-center gap-1 font-bold text-primary'><HiUser className='h-5 w-5' />User Info</h1>

                    <div className='flex flex-col lg:flex-row items-baseline justify-between font-semibold space-y-1'>
                        <p>{userInfo.name}</p>
                        <p>{userInfo.email}</p>
                        <p>{userInfo.phone}</p>
                    </div>

                </div>

                <div className='w-full lg:w-3/4 bg-white shadow-lg rounded-lg py-3 px-3 mb-10'>
                    <h1 className='inline-flex items-center gap-2 font-bold text-primary'><IoMdPaperPlane className='w-5 h-6' /> Shipping Address</h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-5 w-full'>

                <div className='w-full lg:w-3/4 flex flex-col lg:flex-row justify-between'>
                        <div className='flex flex-col space-y-1'>
                            <label className='font-semibold'>House No. <span className='text-error'>*</span></label>
                            <input type='text' defaultValue={userInfo?.house ? userInfo?.house : ""} placeholder='House No.'
                                {...register("house", { required: true })}
                                aria-invalid={errors.house ? "true" : "false"}
                                className='inputField2' />
                            {errors.house?.type === 'required' && <p role="alert" className='text-error font-medium'>House no. is required</p>}
                        </div>

                        <div className='flex flex-col space-y-1'>
                            <label className='font-semibold'>Road No. <span className='text-error'>*</span></label>
                            <input type='number' defaultValue={userInfo?.road ? userInfo?.road : ""} placeholder='Road No.'
                                {...register("road", { required: true })}
                                aria-invalid={errors.road ? "true" : "false"}
                                className='inputField2' />
                            {errors.road?.type === 'required' && <p role="alert" className='text-error font-medium'>Road No. is required</p>}
                        </div>

                    </div>

                    <div className='w-full lg:w-3/4 flex flex-col lg:flex-row justify-between'>
                        <div className='flex flex-col space-y-1'>
                            <label className='font-semibold'>Union/Thana <span className='text-error'>*</span></label>
                            <input type='text' defaultValue={userInfo?.unionThana ? userInfo?.unionThana : ""} placeholder='Enter Your Union/Thana'
                                {...register("unionThana", { required: true })}
                                aria-invalid={errors.unionThana ? "true" : "false"}
                                className='inputField2' />
                            {errors.unionThana?.type === 'required' && <p role="alert" className='text-error font-medium'>Union/Thana is required</p>}
                        </div>

                        <div className='flex flex-col space-y-1'>
                            <label className='font-semibold'>Postal Code <span className='text-error'>*</span></label>
                            <input type='number' defaultValue={userInfo?.postalCode ? userInfo?.postalCode : ""} placeholder='Postal Code'
                                {...register("postal", { required: true })}
                                aria-invalid={errors.name ? "true" : "false"}
                                className='inputField2' />
                            {errors.postal?.type === 'required' && <p role="alert" className='text-error font-medium'>Postal code is required</p>}
                        </div>

                    </div>


                    <div className='w-full lg:w-3/4 flex flex-col lg:flex-row justify-between'>

                        <div className='flex flex-col space-y-1'>
                            <label className='font-semibold'>State <span className='text-error'>*</span></label>
                            <select {...register("state", { required: true })} className='inputField2 font-semibold'>
                                <option defaultValue={userInfo?.state ? userInfo?.state : "Select your State"}>{userInfo?.state ? userInfo?.state : "Select your State"}</option>
                                {
                                    allDivision.map(division => <option key={division?._id} value={division?.name}>{division?.name}</option>)
                                }
                            </select>
                            {errors.state?.type === 'required' && <p role="alert" className='text-error font-medium'>State is required</p>}
                        </div>

                        <div className='flex flex-col space-y-1'>
                            <label className='font-semibold'>City <span className='text-error'>*</span></label>
                            <select {...register("city", { required: true })}  className='inputField2 font-semibold'>
                                <option defaultValue={userInfo?.city ? userInfo?.city : "Select your City"}>{userInfo?.city ? userInfo?.city : "Select your City"}</option>
                                {
                                    allDivision.map(division => division?.districts.map((dis, indx) => <option key={indx} value={dis}>{dis}</option>))
                                }
                            </select>
                            {errors.city?.type === 'required' && <p role="alert" className='text-error font-medium'>City is required</p>}
                        </div>

                    </div>

                    <div className='w-full lg:w-3/4 flex flex-col lg:flex-row justify-between'>
                        <div className='flex flex-col space-y-1'>
                            <label className='font-semibold'>Phone <span className='text-error'>*</span></label>
                            <input type='tel' defaultValue={userInfo?.phone ? userInfo?.phone : ""} placeholder='Enter Your phone number'
                                {...register("phone", { required: true })}
                                aria-invalid={errors.phone ? "true" : "false"}
                                className='inputField2' />
                            {errors.phone?.type === 'required' && <p role="alert" className='text-error font-medium'>Phone number is required</p>}
                        </div>
                    </div>

                    <div className='w-full lg:w-3/4 flex flex-col space-y-1'>
                        <label className='font-semibold'>Address Type <span className='text-error'>*</span></label>

                        <div className='w-full lg:w-3/4 flex flex-col lg:flex-row justify-between'>

                            <div className='flex flex-col space-y-1'>
                                <label className="cursor-pointer label relative">
                                    <input type="checkbox"  className="checkbox checkbox-secondary" {...register("home")}
                                        aria-invalid={errors.home ? "true" : "false"} />
                                    <span className="label-text absolute left-10">Home</span>
                                </label>
                            </div>

                            <div className='flex flex-col space-y-1'>
                                <label className="cursor-pointer label relative">
                                    <input type="checkbox" className="checkbox checkbox-secondary" {...register("office")}
                                        aria-invalid={errors.office ? "true" : "false"} />
                                    <span className="label-text absolute left-10">Office</span>
                                </label>
                            </div>

                        </div>

                    </div>
                    <p className='my-3 font-semibold text-red-600'>{error}</p>
                    <div className='w-full lg:w-3/4 flex flex-col space-y-1'>
                        <input type="submit" value="Save and continue" className='myBtnSec cursor-pointer' />
                    </div>
                </form>

            </div>

            <div className='w-full mt-14 lg:mt-0'>
            <div>
                    <h1 className='mb-2 text-3xl font-bold'>Wishlist</h1>
                    <p className='font-medium'>Please confirm your items!</p>
                </div>

<div className='w-ful'>
{
    carts?.map(cart=><div key={cart?._id} className='w-full my-7 px-2 py-2 border-b-2 rounded-md flex items-center gap-5'>
        <div>
        <img src={cart?.imageUrl} alt="Product Image" className='w-32 rounded-lg'/>
        </div>

<div className='space-y-1 flex-grow'>
   <h1 className='brand'>{cart?.name}</h1> 
   <p className='font-semibold'>Size: {cart?.baseSize}</p>
   <p className='font-semibold'>৳{cart?.basePrice} x {cart?.quantity}</p>
</div>

<div className='space-y-1'>
<button onClick={()=>handleDlt(cart._id)} className='text-white bg-error px-2 py-2 rounded-lg border border-error hover:bg-transparent hover:text-error transition-all duration-500'><HiTrash className='h-6 w-6'/></button>
</div>

    </div>)
}
</div>

<div className='px-8'>
    <h1 className='text-lg font-bold'>Total Price: <span className='text-primary'>৳{total}</span></h1>
</div>

            </div>

        </section>
    );
};

export default Cart;