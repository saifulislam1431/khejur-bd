import React from 'react';
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';

const SingleProduct = ({product}) => {
    const {name,price,imageUrl,size,brand,_id, stock} = product;
    return (
        <div className='my-5 shadow-md rounded-lg overflow-hidden'>
            <motion.div className='relative'
                whileHover={{ scale: 1.1 }}
                data-aos="fade-left"
                data-aos-duration="1500"
            >
                <img src={imageUrl} alt="Product" className='w-80 h-[280px] rounded-lg' />

                <div className='absolute top-0 h-full w-full bg-black rounded-lg bg-opacity-0 hover:bg-opacity-80 flex items-center justify-center opacity-0 hover:opacity-100'>
                    <div className='w-full px-10 space-y-2'>
                        <h1 className='font-bold text-white secTitle'>{name}</h1>
                        <div className='flex items-center justify-between font-semibold text-primary'>
                            
                            <p>Size: {size}</p>
                            <p>Price: ৳  {price}</p>
                        </div>

                        <p className='font-semibold text-white'>Brand: {brand}</p>
<p className='font-semibold text-primary'>Stock: <span className={stock === "Out Of Stock" ? "text-error" : "text-secondary"}>{stock}</span></p>
                        <div className='text-center mt-3'>
                            <Link to={`/details/${_id}`}>
                            <button disabled={stock === "Out Of Stock" ? true : false} className='myBtn'>View Details</button>
                            </Link>
                        </div>

                    </div>
                </div>
            </motion.div>

        </div>
    );
};

export default SingleProduct;