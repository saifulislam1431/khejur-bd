import React from 'react';
import Banner from '../Banner/Banner';
import AllProducts from '../AllProducts/AllProducts';
import TopProducts from '../TopProducts/TopProducts';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <section>
            <Helmet>
                <title>Home | Khejur BD</title>
            </Helmet>
            <Banner />
            <AllProducts />
            <TopProducts />
        </section>
    );
};

export default Home;