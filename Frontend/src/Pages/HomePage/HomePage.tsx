'use client'
import Banner from '@/Components/Banner/Banner';
import Category from '@/Components/Category/Category';
import Reviews from '@/Components/Reivews/Reviews';
import { increment } from '@/lib/features/userSlice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const HomePage = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(increment()) 
    },[])
    return (
        <div>
            <Banner/>
            <Category/>
            <Reviews/>
        </div>
    );
};

export default HomePage;