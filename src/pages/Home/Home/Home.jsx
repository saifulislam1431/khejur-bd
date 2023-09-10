import React from 'react';
import Banner from '../Banner/Banner';
import AllProducts from '../AllProducts/AllProducts';
import TopProducts from '../TopProducts/TopProducts';

const Home = () => {
    return (
        <section>
            <Banner />
            <AllProducts />
            <TopProducts />
        </section>
    );
};

export default Home;