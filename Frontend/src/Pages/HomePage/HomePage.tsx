import Banner from '@/Components/Banner/Banner';
import Category from '@/Components/Category/Category';
import Reviews from '@/Components/Reivews/Reviews';
import React from 'react';

const HomePage = () => {
    return (
        <div>
            <Banner/>
            <Category/>
            <Reviews/>
        </div>
    );
};

export default HomePage;