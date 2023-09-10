import React, { useEffect } from 'react';
import logo from "../../../assets/brand/full logos.png"
import "./Banner.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";

import datesBanner from "../../../assets/cover/datesCover.webp"
import nutBanner from "../../../assets/cover/nutsCover.webp"
import seedBanner from "../../../assets/cover/seedsCover.webp"
import { Carousel } from 'react-responsive-carousel';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { Link } from 'react-router-dom';


const Banner = () => {


    return (
<section className='my-16'>
<Carousel className='text-center' autoPlay={true} infiniteLoop={true} showThumbs={false}>
                <div className='relative'>
                    <img src={datesBanner} className='h-96' alt='Dates'/>
                    <div className='absolute top-0 w-full h-full bg-primary bg-opacity-5 flex flex-col justify-center items-center'>
                        <h1 className='text-white brandTitle font-extrabold bg-primary px-9 py-10 bg-opacity-50 shadow-lg rounded-lg text-lg brandFont'>"Unearth the Rich History and Exquisite Flavors of Dates. Satisfy Your Sweet Cravings with Nature's Treasures."</h1>
                        <Link to="/shop">
                   <button className='myBtnSec mt-5'><HiOutlineShoppingBag className='h-7 w-7'/>Grave Now!</button>
                   </Link>
                    </div>
                </div>
                <div className='relative'>
                    <img src={nutBanner} className='h-96' alt='Nuts'/>
                    <div className='absolute top-0 w-full h-full bg-primary bg-opacity-5 flex flex-col justify-center items-center'>
                         <h1 className='text-white brandTitle font-extrabold bg-primary px-9 py-10 bg-opacity-50 shadow-lg rounded-lg text-xl brandFont'>"The Bite-Sized Powerhouses of Nutrition – Discover the Art of Healthy Snacking. Nourish Your Body and Mind"</h1>
                         <Link to="/shop">
                   <button className='myBtnSec mt-5'><HiOutlineShoppingBag className='h-7 w-7'/>Grave Now!</button>
                   </Link>
                    </div>

                </div>
                <div className='relative'>
                    <img src={seedBanner} className='h-96' alt='Seed'/>
                    <div className='absolute top-0 w-full h-full bg-primary bg-opacity-5 flex flex-col justify-center items-center'>
                    <h1 className='text-white brandTitle font-extrabold bg-primary px-9 py-10 bg-opacity-50 shadow-lg rounded-lg text-xl brandFont'>"Small Packages, Big Impact! Seeds of Change, Seeds of Potential: Embark on a Journey of Growth and Transformation"</h1>
                   <Link to="/shop">
                   <button className='myBtnSec mt-5'><HiOutlineShoppingBag className='h-7 w-7'/>Grave Now!</button>
                   </Link>
                    </div>
                    
                </div>

            </Carousel>
</section>
    );
};

export default Banner;