import React, { useEffect, useState } from 'react';
import SectionHead from '../../../components/SectionHead';
import heroImg from "../../../assets/hero/review.png"
import { useForm } from 'react-hook-form';
import useProfile from '../../../hooks/useProfile';
import useProducts from '../../../hooks/useProducts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddTestimonial = () => {
    const [axiosSecure] = useAxiosSecure();
    const [userInfo] = useProfile();
    const [allProducts] = useProducts();
    // console.log(allProducts);
    const [prodNames, setProdNames] = useState([]);
    const [error, setError] = useState("");
    const { register, formState: { errors }, handleSubmit } = useForm();

    useEffect(() => {
        let unique = [];
        allProducts.forEach(element => {
            if (!unique.includes(element.name)) {
                unique.push(element.name);
            }
        });
        setProdNames(unique);
    }, [])
    // console.log(prodNames);

    const onSubmit = async(data) => {
        if (data.product === "Select Your product") {
            return setError("Product name is require")
        }else{
            const newData = {
                name: userInfo?.name,
                email: userInfo?.email,
                rating: parseFloat(data?.rating),
                details: data?.details,
                product: data?.product,
                status: "Pending"
            }
            const res =await axiosSecure.post("http://localhost:5000/write-review",newData);
            if(res.data.insertedId){
                Swal.fire({
                    title: 'Success!',
                    text: "Thank you for sharing you experience!",
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
            }
        }
        
        
    }
    return (
        <section className='flex items-center flex-col px-3 lg:px-10'>
            <SectionHead title="Share Your Khejur BD Experience" description="Your opinion matters to us! We invite you to share your thoughts and experiences with Khejur BD products and services. Leave your valuable review below and help us serve you better. Your feedback helps us grow, and we appreciate your support." />

            <div className='my-10 flex items-center gap-10 flex-col lg:flex-row'>
                <div className='w-full'>
                    <img src={heroImg} alt="Hero" className='w-full' />
                </div>
                <div className='w-full'>
                    <h1 className='text-center mb-10 brand text-primary text-3xl'>Write Experience</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4'>


                        <input disabled={true} type='text' defaultValue={userInfo?.name} placeholder='Enter Your Name'
                            {...register("name")}
                            aria-invalid={errors.name ? "true" : "false"}
                            className='inputField2 font-bold' />
                        {errors.name?.type === 'required' && <p role="alert" className='text-error font-medium'>Name is required</p>}

                        <input disabled={true} type='text' defaultValue={userInfo?.email} placeholder='Enter Your Email'
                            {...register("email")}
                            aria-invalid={errors.email ? "true" : "false"}
                            className='inputField2 font-bold' />
                        {errors.email?.type === 'required' && <p role="alert" className='text-error font-medium'>Email is required</p>}

                        <div className='w-full  flex flex-col lg:flex-row justify-between gap-6 my-5'>
                            <div className='flex flex-col space-y-1'>
                                <label className='font-semibold'>Product Name<span className='text-error'>*</span></label>
                                <select  {...register("product", { required: true })} className='inputField font-semibold'>
                                    <option defaultValue="Select product">Select Your product</option>
                                    {
                                        prodNames?.map((name, indx) => <option key={indx} defaultValue={name}>{name}</option>)
                                    }
                                </select>
                                {errors.category?.type === 'required' && <p role="alert" className='text-error font-medium'>Product category is required</p>}
                                <p role="alert" className='text-error font-medium'>{error}</p>
                            </div>

                            <div className='flex flex-col space-y-1 w-full'>
                                <label className='font-semibold'>Rating<span className='text-error'>*</span></label>
                                <input type='text' placeholder='Enter Your Rating'
                                    {...register("rating", { required: true })}
                                    aria-invalid={errors.rating ? "true" : "false"}
                                    className='inputField2 w-full font-bold' />
                                {errors.rating?.type === 'required' && <p role="alert" className='text-error font-medium'>Rating is required</p>}

                            </div>

                        </div>



                        <div>
                            <label className='font-semibold'>Review <span className='text-error'>*</span></label>
                            <textarea rows={10} cols={5} placeholder='Product Review'
                                {...register("details", { required: true })}
                                aria-invalid={errors.description ? "true" : "false"}
                                className='inputField2 w-full' />
                            {errors.details?.type === 'required' && <p role="alert" className='text-error font-medium'>Product review is required</p>}
                        </div>
                        <div className='flex items-center justify-center w-full'>
                            <input type="submit" value="Submit Review" className='myBtnSec w-full cursor-pointer' />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddTestimonial;