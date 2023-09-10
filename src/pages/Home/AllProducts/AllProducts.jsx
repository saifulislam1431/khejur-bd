import React from 'react';
import SectionHead from '../../../components/SectionHead';
import useProducts from '../../../hooks/useProducts';
import SingleProduct from './SingleProduct';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingBag } from 'react-icons/hi2';

const AllProducts = () => {
    const[allProducts] = useProducts();
    console.log(allProducts);
    return (
        <section className='my-16'>
<SectionHead title="Unveiling the Elegance: A Symphony of Premium Dates, Nuts, and Seeds" description="Step into a world of opulence and refinement as we unveil our extraordinary collection of premium Dates, Nuts, and Seeds. Each product is a masterpiece of flavor, quality, and exclusivity. Delight in the richness of taste, savor the moments of indulgence, and elevate your palate to new heights with our exquisite selection. Discover the epitome of luxury in every bite."/>


<div className='my-10 flex items-center justify-center'>

            <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
{
    allProducts.slice(0,6).map(product=><SingleProduct
    key={product._id}
    product={product}
    ></SingleProduct>)
}
            </div>

            <div className='text-center mt-10'>
    <Link to="/shop" className='myBtn'><HiOutlineShoppingBag className='h-7 w-7'/>View Shop</Link>
    </div> 
                </div>  
         
        </div>
        </section>
    );
};

export default AllProducts;