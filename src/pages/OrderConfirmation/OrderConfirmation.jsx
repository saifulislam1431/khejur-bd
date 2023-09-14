import React, { useState } from 'react';
import "../Cart/cart.css";
import { useNavigate } from 'react-router-dom';
import useCarts from '../../hooks/useCarts';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { IoIosCard, IoIosCash, IoMdPaperPlane } from 'react-icons/io';
import { HiUser } from 'react-icons/hi2';
import useProfile from '../../hooks/useProfile';
import { IoWallet } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const OrderConfirmation = () => {
    const navigate = useNavigate();
    const [carts, refetch] = useCarts();
    const total = carts.reduce((sum, item) => parseInt(item.newPrice) + sum, 0)
    const [axiosSecure] = useAxiosSecure()
    const [userInfo] = useProfile();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [method, setMethod] = useState("")


    const onSubmit = async (data) => {
       
        const orderInfo ={
            email: userInfo?.email,
            customerName: userInfo?.name,
            products: carts?.map(allProduct=>allProduct),
            orderStatus: "Pending",
            transactionId: data.transactionId,
            totalPrice: total
        }
        const res = await axiosSecure.post(`/confirm-orders?email=${userInfo?.email}`, orderInfo)
        if(res.data.deletedCount > 0){
            navigate("/dashboard")
            refetch()
            Swal.fire({
                title: 'Success!',
                text: 'Order Placed Successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            })  
        }
    }


    return (
        <section className='pageLayout px-3 lg:px-10 py-10'>
            <Helmet>
                <title>Confirmation Order | Khejur BD</title>
            </Helmet>

            <div className='w-full'>
                <div className='mb-8'>
                    <h1 className='mb-2 text-3xl font-bold'>Verify Payment</h1>
                    <p className='font-medium'>Please confirm delivery method!</p>
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
                    <div className='flex flex-col items-baseline justify-between font-semibold space-y-1'>
                        <p>{userInfo.city}</p>
                        <p>{userInfo.state}</p>
                        <p>{userInfo.address}, {userInfo.postalCode}</p>
                        <p>In {userInfo.addressType}</p>
                    </div>
                </div>

                <div className='w-full lg:w-3/4 bg-white shadow-lg rounded-lg py-3 px-3 mb-10'>
                    <h1 className='inline-flex items-center gap-2 font-bold text-primary'><IoWallet className='w-5 h-6' /> Payment Method</h1>
                </div>

                <div className='w-full lg:w-3/4 py-3  mb-10 flex flex-col lg:flex-row items-center justify-between gap-10'>
                    <div onClick={() => setMethod("cash")} className={`${method === "cash" ? "inline-flex items-center gap-3 border-2 border-secondary text-secondary px-5 py-5 rounded-md lg:w-1/2 cursor-pointer" : "inline-flex items-center gap-3 border-2 px-5 py-5 rounded-md lg:w-1/2 cursor-pointer"}`}>
                        <IoIosCash className='w-7 h-7' />
                        <p className='text-lg font-bold'>Cash On Delivery</p>
                    </div>

                    <div onClick={() => setMethod("online")} className={`${method === "online" ? "inline-flex items-center gap-3 border-2 border-secondary text-secondary px-5 py-5 rounded-md lg:w-1/2 cursor-pointer" : "inline-flex items-center gap-3 border-2 px-5 py-5 rounded-md lg:w-1/2 cursor-pointer"}`}>
                        <IoIosCard className='w-7 h-7' />
                        <p className='text-lg font-bold'>Online Payment</p>
                    </div>
                </div>


                {
                    method === "cash" ?
                        <div className='w-full lg:w-3/4 bg-white shadow rounded-lg py-3 px-4 mb-10'>
                            <h1 className='text-2xl font-bold'>Cash On Delivery Process:</h1>
                            <div className='ml-6'>
                                <ul className='list-disc my-4 font-semibold space-y-1'>
                                    <li>For cash on deliver your have to pay delivery charge to confirm order.</li>
                                    <li>Your delivery location is <span className='text-primary'>{userInfo?.state}</span> so you have to pay <span className='text-primary'> ৳ {userInfo?.state === "Dhaka" ? 80 : 130}</span>.</li>
                                    <li>After confirm your delivery charge please provide us your transaction id and <span className='text-primary'>click</span> confirm button bellow.</li>
                                </ul>


                                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-5 w-full my-5'>
                                    <label className='font-semibold'>Transaction Id <span className='text-error'>*</span></label>
                                    <input type='text' placeholder='Enter Your Transaction Id'
                                        {...register("transactionId", { required: true })}
                                        aria-invalid={errors.transactionId ? "true" : "false"}
                                        className='inputField2' />
                                    {errors.transactionId?.type === 'required' && <p role="alert" className='text-error font-medium'>Transaction Id is required</p>}
                                    <div className='w-full lg:w-1/2 mx-auto flex flex-col space-y-1'>
                        <input type="submit" value="Confirm" className='myBtnSec cursor-pointer' />
                    </div>
                                </form>

                            </div>

                        </div>
                        :
                        method === "online" ?
                            <h1 className='text-2xl font-bold'>Currently online payment is not available!</h1> : ""
                }

            </div>

            <div className='w-full mt-14 lg:mt-0'>
                <div>
                    <h1 className='mb-2 text-3xl font-bold'>Wishlist</h1>
                    <p className='font-medium'>Please confirm your items!</p>
                </div>

                <div className='w-ful'>
                    {
                        carts?.map(cart => <div key={cart?._id} className='w-full my-7 px-2 py-2 border-b-2 rounded-md inline-flex items-center gap-5'>
                            <div>
                                <img src={cart?.imageUrl} alt="Product Image" className='w-32 rounded-lg' />
                            </div>

                            <div className='space-y-1'>
                                <h1 className='brand'>{cart?.name}</h1>
                                <p className='font-semibold'>Size: {cart?.baseSize}</p>
                                <p className='font-semibold'>৳{cart?.basePrice} x {cart?.quantity}</p>
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

export default OrderConfirmation;