import React, { useEffect, useState } from 'react';
import useProducts from '../../hooks/useProducts';
import SingleProduct from '../Home/AllProducts/SingleProduct';
import { HiArrowDown, HiArrowUp } from 'react-icons/hi2';
import banner1 from "../../assets/hero/datesHero.webp"
import banner2 from "../../assets/featured/featuredDates.webp"
import banner3 from "../../assets/featured/featuredNuts.webp"
import banner4 from "../../assets/featured/featuredSeeds.webp"
import { Helmet } from 'react-helmet-async';

const Shop = () => {
    const [allProducts] = useProducts();
    const [show, setShow] = useState(false)
    const [productCategory, setProductCategory] = useState("All");
    const [products, setProduct] = useState([])


    useEffect(() => {
        if (productCategory === "All") {
            setProduct(allProducts)
        } else {
            const selectedCategory = allProducts.filter(allProduct => allProduct.category === productCategory)
            setProduct(selectedCategory)
        }
    }, [allProducts, productCategory])
    return (
        <section className='my-14'>
            <Helmet>
                <title>Shop | Khejur BD</title>
            </Helmet>
            <div className="hero bg-fixed lg:w-full h-[480px] lg:h-[400px] mx-auto rounded-lg" style={{ backgroundImage: `url(${productCategory === "All" ? banner1 : productCategory === "Dates" ? banner2 : productCategory === "Peanuts" ? banner3 : banner4})` }}>
                <div className="hero-overlay bg-opacity-80 rounded-lg"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="">
                        <h1>

                        </h1>
                        {/* <h1 className="mb-5 text-5xl font-bold">A Shoe Haven for Every Footwear Enthusiast</h1> */}
                        <p className="mb-5 font-medium mt-4">Indulge your shoe obsession on our All Shoes page. With an array of styles, colors, and brands, we offer a tempting variety that caters to diverse preferences. Step into a world of fashion and find the perfect pair that expresses your unique style.</p>

                    </div>
                </div>
            </div>

            <div className='my-10'
            >
                <div className='flex gap-2 md:gap-4 lg:gap-6 items-center justify-center text-center'>
                    <button className={`tabs brand tab tab-bordered ${productCategory === "All" ? "activeTab" : ""}`} onClick={() => setProductCategory("All")}>All</button>
                    <button className={`tabs brand tab tab-bordered ${productCategory === "Dates" ? "activeTab" : ""}`} onClick={() => setProductCategory("Dates")}>Dates</button>
                    <button className={`tabs brand tab tab-bordered ${productCategory === "Peanuts" ? "activeTab" : ""}`} onClick={() => setProductCategory("Peanuts")}>Peanuts</button>
                    <button className={`tabs brand tab tab-bordered ${productCategory === "seeds" ? "activeTab" : ""}`} onClick={() => setProductCategory("seeds")}>Seeds</button>
                </div>
            </div>

            <div className='my-10 flex items-center justify-center'>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                    {
                        products.slice(0, show ? products.length : 10).map(product => <SingleProduct
                            key={product._id}
                            product={product}
                        ></SingleProduct>)
                    }
                </div>

            </div>

            <div className='my-10 w-fit mx-auto' onClick={() => setShow(!show)}>
                {
                    !show && products.length > 10 ?
                        <button className='myBtn'><HiArrowDown className='h-5 w-5' />Show All</button> :
                        products.length > 10 ? <button className='btn-primary inline-flex px-3 py-1 rounded-md font-semibold gap-1 items-center border border-primary'><HiArrowUp className='h-5 w-5' />Show Less</button> : ""

                }
            </div>
        </section>
    );
};

export default Shop;