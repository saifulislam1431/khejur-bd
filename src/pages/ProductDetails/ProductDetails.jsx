import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import { HiChevronLeft, HiMinus, HiPlus, HiShoppingBag } from 'react-icons/hi2';
import { IoIosCart } from "react-icons/io";

const ProductDetails = () => {
    const [info, setInfo] = useState('description');

    const [selectedProduct, setSelectedProduct] = useState(0)
    const [quantity , setQuantity] = useState(1)
    const {id} = useParams();
    const [allProducts, refetch]=useProducts();

   useEffect(()=>{
    const selectedProduct = allProducts.find(products=>products._id === id);
    setSelectedProduct(selectedProduct)
   },[allProducts, id])




    const handleIncrease = () =>{
setQuantity(pre=> pre === 0 ? 1 :pre+1)
    }
    const handleDecrease = () =>{
setQuantity(pre=> pre === 0 ? 1 : pre-1)
    }


    return (
        <section className='my-10 px-2'>
<div className='w-fit'>
    <Link to="/shop" className='inline-flex gap-1 items-center px-2 py-2 font-semibold text-primary'><HiChevronLeft className='h-6 w-6'/>Back To Shop</Link>
</div>

<div className='flex flex-col lg:flex-row gap-5 items-center justify-around my-5'>

<div className='w-full'>
<img src={selectedProduct?.imageUrl} alt={selectedProduct?.name} className='w-96 rounded-2xl shadow-xl'/>
</div>

<div className='w-full'>
<div className='space-y-1'>
<h1 className='text-2xl text-primary font-bold'>{selectedProduct?.name}</h1>
<h1 className='font-bold'>৳ {selectedProduct?.price}</h1>
<p className='font-semibold'>Size: {selectedProduct?.size}</p>
<p className='font-medium'>Stock: <span className={`${selectedProduct?.stock === "In Stock" ? "text-secondary " : "text-error"}`}>{selectedProduct?.stock}</span></p>
</div>

<div className='inline-flex gap-3 text-sm font-semibold my-6'>
    <p onClick={()=>setInfo('description')} className={`tracking-widest cursor-pointer ${info === "description" ? "opacity-100" : "opacity-50"}`}>DESCRIPTION</p> / <p onClick={()=>setInfo('details')} className={`tracking-widest cursor-pointer ${info === "details" ? "opacity-100" : "opacity-50"}`}>DETAILS</p> / <p onClick={()=>setInfo('reviews')} className={`tracking-widest cursor-pointer ${info === "reviews" ? "opacity-100" : "opacity-50"}`}>REVIEWS</p>
</div>

{
    info === "description" ? <div className='h-96 lg:h-80 mb-10 lg:mb-0'>
<p>{selectedProduct?.description}</p>

    </div> : info === "details" ? <div className='h-96 lg:h-80 mb-10 lg:mb-0 space-y-3 text-lg font-medium'>
<p>Brand: {selectedProduct?.brand}</p>
<p>Category: {selectedProduct?.category}</p>
<p>Color: {selectedProduct?.color}</p>
<p>Country Of Origin: {selectedProduct?.countryOfOrigin}</p>
    </div> : <div className='h-96 lg:h-80 mb-10 lg:mb-0'>
<p>{selectedProduct?.reviews}</p>

    </div>
}

<div className='inline-flex items-center gap-10 '>
<div className='inline-flex items-center'>
<button onClick={handleIncrease} className='bg-primary px-2 py-2 rounded-l-lg text-white'><HiPlus className='w-6 h-6'/></button>

<input type="text" min={1} value={`${selectedProduct?.size ? selectedProduct?.size : 1 }`}  className='w-28 pl-7 pr-2 py-2 bg-primary bg-opacity-30  font-semibold outline-none'/>

<button onClick={handleDecrease} className={`${quantity < 1 && quantity ===1 ? "disabled:cursor-not-allowed" : "bg-primary px-2 py-2 rounded-r-lg text-white"}`}><HiMinus className='w-6 h-6'/></button>
</div>

<div className='px-5 lg:w-56 text-center py-3 lg:px-9 border bg-primary font-bold  bg-opacity-50 border-primary rounded-3xl text-info'>
    <p>Price: <span>{parseFloat(quantity === 0 ? 1 :quantity) * parseFloat(selectedProduct?.price)}৳</span></p>
</div>
</div>

<div className='my-5 inline-flex gap-5'>
<button className='inline-flex items-center justify-center gap-2 w-48 lg:w-64 border py-3 rounded-lg font-semibold border-primary text-primary hover:bg-primary hover:text-white transition-all duration-500'>Buy Now <HiShoppingBag className='w-5 h-5'/></button>
<button className='inline-flex items-center justify-center gap-2 w-36 lg:w-44 border py-3 rounded-lg font-semibold bg-primary border-primary text-white hover:bg-transparent hover:text-primary transition-all duration-500'>Add To Cart <IoIosCart className='w-5 h-5'/></button>
</div>

</div>

</div>
        </section>
    );
};

export default ProductDetails;