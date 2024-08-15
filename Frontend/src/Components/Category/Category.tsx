"Use Client";
"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import SectionTitle from "../SectionTitle/SectionTitle";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "@/lib/features/categorySlice";
import { RootState } from "@/lib/store";

const Category = () => {
  const {
    categories
  } = useSelector((state: RootState) => state.category);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  return (
    <div>
      <SectionTitle
        heading={"Order Online"}
        subHeading={"From 11:00am to 10:00pm"}
      />
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          '@0.00': {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          '@0.75': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '@1.00': {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          '@1.50': {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper py-15"
      >
        {categories.map((category) => (
          <SwiperSlide  key={category.name}>
            <div className="card bg-base-100  w-[180px] h-[280px] md:w-80 lg:h-[350px] shadow-xl">
              <figure>
                <img className="w-[180px] h-[120px] md:w-[320px] md:h-[215px]" src={category?.thumbnail} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="font-bold">{category.name}</h2>
                <p>{category?.slug}</p>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Category;
