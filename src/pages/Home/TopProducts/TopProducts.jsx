import React, { useEffect, useState } from 'react';
import useProducts from '../../../hooks/useProducts';
import SectionHead from '../../../components/SectionHead';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';






const TopProducts = () => {

    
    const [allProducts, refetch] = useProducts();
    const [tops, setTops] = useState([]);

    useEffect(() => {
        const allTopProducts = allProducts.filter(topProducts => topProducts.popularity === "Top");
        setTops(allTopProducts);
        refetch()
    }, [allProducts])



    return (
        <section className='my-16'>
            <SectionHead title="Discover Our Exclusive Selection of Top Picks" description="Unveil the finest flavors in our curated collection of top-rated Dates, Nuts, and Seeds. Explore the best of the best, handpicked for your indulgence. Each product is a testament to our commitment to excellence, ensuring an unforgettable taste experience." />'



            <div data-aos="fade-right"
                data-aos-duration="1500" className='px-2'>
<Carousel className='text-center' interval={7000} autoPlay={true} infiniteLoop={true} showThumbs={false} showStatus={false}>
               
               {
                tops.map(topProduct=><div key={topProduct._id} className='flex flex-col lg:flex-row items-center justify-around gap-20'>
<div className='lg:w-1/2'>
    <img src={topProduct.imageUrl} alt="Product" className='h-72 w-80 rounded-2xl shadow-2xl'/>
</div>

<div className='lg:w-3/4 text-left'>
    <h1 className='mb-3 text-3xl font-bold'>{topProduct.name}</h1>
    <p>{topProduct.description.slice(0,200)}<Link to={`/details/${topProduct._id}`} className='font-semibold text-primary'>.......Read More</Link></p>
</div>

                </div>)
               }

            </Carousel>
            </div>
        </section>
    );
};

export default TopProducts;