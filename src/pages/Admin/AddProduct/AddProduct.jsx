import React from 'react';
import DashHead from '../../../components/DashHead';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useProducts from '../../../hooks/useProducts';

const AddProduct = () => {
    const [, refetch] =useProducts()
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [axiosSecure] =useAxiosSecure();



    const onSubmit = async(data) => {
        const newData={
            name: data.name,
            price: parseFloat(data.price),
            imageUrl: data.imageUrl,
            category: data.category,
            size: data.size,
            popularity: data.popularity,
            color: data.color,
            brand: data.brand,
            stock: data.stock,
            countryOfOrigin: data.countryOfOrigin,
            peopleWatched: parseInt(data.peopleWatched),
            description: data.description,
            reviews: data.reviews
        
        }
        console.log(newData);
        const res = await axiosSecure.post("/new-product", data)
        if(res.data.insertedId){
            refetch()
            Swal.fire({
                title: 'Success!',
                text: 'Product added successfully',
                icon: 'success',
                confirmButtonText: 'Cool'
              })
        }
    }
    return (
        <section>
            <DashHead title="Add New Product" />

            <div className='my-14'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 w-full'>
                    <div className='w-full lg:w-3/4 flex flex-col lg:flex-row justify-between gap-6 my-5'>
                        <div className='flex flex-col space-y-1'>
                            <label className='font-semibold'>Name <span className='text-error'>*</span></label>
                            <input type='text' placeholder='Product Name'
                                {...register("name", { required: true })}
                                aria-invalid={errors.name ? "true" : "false"}
                                className='inputField' />
                            {errors.name?.type === 'required' && <p role="alert" className='text-error font-medium'>Product name is required</p>}
                        </div>

                        <div className='flex flex-col space-y-1'>
                            <label className='font-semibold'>Price<span className='text-error'>*</span></label>
                            <input type='number' placeholder='Product Price'
                                {...register("price", { required: true })}
                                aria-invalid={errors.price ? "true" : "false"}
                                className='inputField' />
                            {errors.price?.type === 'required' && <p role="alert" className='text-error font-medium'>Product Price is required</p>}
                        </div>

                    </div>

                    <div className='w-full lg:w-3/4 flex flex-col lg:flex-row justify-between gap-6 my-5'>
                        <div className='flex flex-col space-y-1'>
                            <label className='font-semibold'>Category <span className='text-error'>*</span></label>
                            <input type='text' placeholder='Product Category'
                                {...register("category", { required: true })}
                                aria-invalid={errors.category ? "true" : "false"}
                                className='inputField' />
                            {errors.category?.type === 'required' && <p role="alert" className='text-error font-medium'>Product category is required</p>}
                        </div>

                        <div className='flex flex-col space-y-1'>
                            <label className='font-semibold'>Size<span className='text-error'>*</span></label>
                            <input type='text' placeholder='Product Price'
                                {...register("size", { required: true })}
                                aria-invalid={errors.size ? "true" : "false"}
                                className='inputField' />
                            {errors.size?.type === 'required' && <p role="alert" className='text-error font-medium'>Product size is required</p>}
                        </div>

                    </div>

                    <div className='w-full lg:w-3/4 flex flex-col lg:flex-row justify-between gap-6 my-5'>
                        <div className='flex flex-col space-y-1'>
                            <label className='font-semibold'>Popularity <span className='text-error'></span></label>
                            <input type='text' placeholder='Product Popularity (If is it)'
                                {...register("popularity")}
                                aria-invalid={errors.popularity ? "true" : "false"}
                                className='inputField2' />
                            {errors.popularity?.type === 'required' && <p role="alert" className='text-error font-medium'>Product popularity is required</p>}
                        </div>

                        

                        <div className='flex flex-col space-y-1'>
                            <label className='font-semibold'>Color<span className='text-error'>*</span></label>
                            <input type='text' placeholder='Product Color'
                                {...register("color", { required: true })}
                                aria-invalid={errors.color ? "true" : "false"}
                                className='inputField2' />
                            {errors.color?.type === 'required' && <p role="alert" className='text-error font-medium'>Product color is required</p>}
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <label className='font-semibold'>Brand<span className='text-error'>*</span></label>
                            <input type='text' defaultValue="Khejur BD" placeholder='Product Brand'
                                {...register("brand", { required: true })}
                                aria-invalid={errors.brand ? "true" : "false"}
                                className='inputField2' />
                            {errors.brand?.type === 'required' && <p role="alert" className='text-error font-medium'>Product brand is required</p>}
                        </div>

                    </div>

                    <div className='w-full lg:w-3/4 flex flex-col lg:flex-row justify-between gap-6 my-5'>
                        <div className='flex flex-col space-y-1'>
                            <label className='font-semibold'>Stock <span className='text-error'>*</span></label>
                            <input type='text' placeholder='Product Stock'
                                {...register("stock", { required: true })}
                                aria-invalid={errors.stock ? "true" : "false"}
                                className='inputField' />
                            {errors.stock?.type === 'required' && <p role="alert" className='text-error font-medium'>Product stock is required</p>}
                        </div>

                        <div className='flex flex-col space-y-1'>
                            <label className='font-semibold'>Country Of Origin<span className='text-error'>*</span></label>
                            <input type='text' placeholder='Product Country Of Origin'
                                {...register("countryOfOrigin", { required: true })}
                                aria-invalid={errors.countryOfOrigin ? "true" : "false"}
                                className='inputField' />
                            {errors.countryOfOrigin?.type === 'required' && <p role="alert" className='text-error font-medium'>Product country of origin is required</p>}
                        </div>

                    </div>

                    <div className='w-full lg:w-3/4 flex flex-col lg:flex-row justify-between gap-6 my-5'>
                        <div className='flex flex-col space-y-1'>
                            <label className='font-semibold'>People Watched <span className='text-error'>*</span></label>
                            <input type='number' defaultValue={0} placeholder='Product People Watched'
                                {...register("peopleWatched", { required: true })}
                                aria-invalid={errors.peopleWatched ? "true" : "false"}
                                className='inputField' />
                            {errors.peopleWatched?.type === 'required' && <p role="alert" className='text-error font-medium'>Product people watched is required</p>}
                        </div>

                        <div className='flex flex-col space-y-1'>
                            <label className='font-semibold'>Reviews</label>
                            <input type='text' defaultValue="No review published yet" placeholder='Product Price'
                                {...register("reviews")}
                                aria-invalid={errors.reviews ? "true" : "false"}
                                className='inputField' />
                            {errors.reviews?.type === 'required' && <p role="alert" className='text-error font-medium'>Product reviews are required</p>}
                        </div>

                    </div>

                    <div className='w-full my-5'>
                        <div className='flex flex-col space-y-1 w-full lg:w-3/4'>
                            <label className='font-semibold'>Photo URL <span className='text-error'>*</span></label>
                            <input type='url' placeholder='Product image url'
                                {...register("imageUrl", { required: true })}
                                aria-invalid={errors.imageUrl ? "true" : "false"}
                                className='inputField2' />
                            {errors.imageUrl?.type === 'required' && <p role="alert" className='text-error font-medium'>Product image url is required</p>}
                        </div>

                    </div>


                    <div className='w-full my-5'>
                        <div className='flex flex-col space-y-1 w-full lg:w-3/4'>
                            <label className='font-semibold'>Description <span className='text-error'>*</span></label>
                            <textarea rows={10} cols={5} placeholder='Product Description'
                                {...register("description", { required: true })}
                                aria-invalid={errors.description ? "true" : "false"}
                                className='inputField2 w-full' />
                            {errors.description?.type === 'required' && <p role="alert" className='text-error font-medium'>Product description is required</p>}
                        </div>

                    </div>

                    <div className='flex items-center justify-center w-full'>
                        <input type="submit" value="Add Product" className='myBtnSec w-full cursor-pointer'/>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddProduct;