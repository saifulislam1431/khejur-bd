import React from 'react';
import banner from "../../assets/cover/datesNwalnut.webp";
const About = () => {
    return (
        <section className=' my-14 flex items-center justify-center px-3'>
            <div className='text-center'>
                <h1 className='text-3xl font-bold text-info'>About Khejur BD - Your Source for Premium Dates, Peanuts, and Seeds</h1>

                <div className='my-14'>
                    <img src={banner} alt="About Banner" className='md:w-3/4 lg:h-96 mx-auto rounded-xl lg:rounded-3xl' />
                </div>
                <p className='text-left font-medium'>At Khejur BD, our mission is to make premium dates, peanuts, and seeds accessible to everyone in Bangladesh. We prioritize quality, affordability, and convenience, and we are dedicated to ensuring your satisfaction with every purchase.</p>
                <div className="divider"></div>
                <div className='flex flex-col lg:flex-row items-start justify-between gap-10 my-10'>

                    <div className='text-left w-full'>

                        <div className='my-5'>
                            <h1 className='text-2xl font-bold text-primary'>Our Commitment to Quality and Authenticity</h1>
                            
                            <p className='font-medium my-2'>At Khejur BD, we take pride in offering you the finest selection of premium dates, peanuts, and seeds, sourced exclusively from Saudi Arabia. Our commitment to quality and authenticity sets us apart in the market.</p>
                        </div>

                        <div className='my-5'>
                            <h1 className='text-2xl font-bold text-primary'>Unbeatable Prices</h1>
                            <p className='font-medium my-2'>We want to ensure that you have access to the best products at the most competitive prices. While most of our products come from Saudi Arabia, our dedication to affordability means that our prices remain accessible. In many cases, you'll find our prices to be on par with local market rates, ensuring you get the best value for your money.</p>
                        </div>


                    </div>
                    <div className="divider lg:divider-horizontal"></div>
                    <div className='text-left w-full'>

                        <div className='my-5'>
                            <h1 className='text-2xl font-bold text-primary'>Nationwide Home Delivery</h1>
                            <p className='font-medium my-2'>No matter where you are in Bangladesh, we've got you covered. We provide home delivery services to all 64 districts across the country. You can sit back and relax, knowing that our products will reach your doorstep, no matter your location.</p>
                        </div>

                        <div className='my-5'>
                            <h1 className='text-2xl font-bold text-primary'>Delivery Charges</h1>
                            <p className='font-medium my-2'>For our valued customers in Dhaka city, we offer home delivery at a minimal charge of BDT 80. If you reside outside Dhaka, the delivery charge is slightly higher at BDT 130. If you're located outside Dhaka, we kindly request advance payment for the delivery charge.</p>
                        </div>


                    </div>


                </div>
            </div>
        </section>
    );
};

export default About;