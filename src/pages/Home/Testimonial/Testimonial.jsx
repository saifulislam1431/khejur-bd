import React, { useEffect, useState } from 'react';
import SectionHead from '../../../components/SectionHead';
import useReviews from '../../../hooks/useReviews';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './testimonial.css';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { FaPenFancy, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Testimonial = () => {
    const [reviews, refetch] = useReviews();
    const [selectedReviews, setSelectedReviews] = useState([])
    useEffect(() => {
        const allReview = reviews.filter(review => review.status === "Ok");
        setSelectedReviews(allReview);
    }, [reviews])

    return (
        <section className='my-36'>
            <SectionHead title="Discover What Our Valued Clients Have to Say About Khejur BD" description="Explore the genuine experiences and feedback shared by our satisfied customers. Dive into the world of Khejur BD through the eyes of those who have tasted our premium dates, peanuts, and seeds, and find out why they choose us for their favorite snacks and treats. We believe in transparency and value the opinions of our customers, making their reviews an essential part of our journey." />

            <div className='my-10'>
            <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
                {
    selectedReviews.map(review=><SwiperSlide key={review._id} className='w-80 h-72 border-2 border-secondary bg-secondary rounded-lg bg-opacity-20 relative'>
        <div  className='w-72 h-72 px-4 py-5'>
        <div>
            <p className='my-2 text-secondary'><FaQuoteLeft className='h-5 w-5'/></p>
        <p className='font-semibold'>{review.details}</p>
        </div>
        <div className='flex flex-col items-end justify-end absolute bottom-3 right-3'>
        <Rating
      style={{ maxWidth: 90 }}
      value={review.rating}
      readOnly
    />     
            <p className='text-info font-bold brand mt-1'>{review.name}</p>
            <FaQuoteRight className='h-5 w-5 text-secondary'/>
        </div>
        </div>
      </SwiperSlide>)
}
      </Swiper>

      <Link to="/add-testimonial" className="flex items-center justify-center my-3">
<button className='myBtn'>Add Your Review <FaPenFancy className='w-5 h-5'/></button>
      </Link>
            </div>
        </section>
    );
};

export default Testimonial;