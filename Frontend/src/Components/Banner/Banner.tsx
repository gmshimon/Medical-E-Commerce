"Use Client"
"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const Banner = () => {
    return (
        <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
            <img src="/assets/Banner/1.png" alt="img 1" className='w-full' />
        </SwiperSlide>
        <SwiperSlide>
            <img src="/assets/Banner/2.png" alt="img 2" className='w-full' />
        </SwiperSlide>
        <SwiperSlide>
            <img src="/assets/Banner/3.png" alt="img 3" className='w-full' />
        </SwiperSlide>
      </Swiper>
    </>
    );
};

export default Banner;