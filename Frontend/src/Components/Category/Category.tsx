"Use Client";
"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import SectionTitle from "../SectionTitle/SectionTitle";

const Category = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("categories.json")
      .then((res) => res.json())
      .then((data) => setCategories(data));
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
        modules={[Pagination]}
        className="mySwiper py-15"
      >
        {categories.map((category) => (
          <SwiperSlide  key={category.name}>
            <div className="card bg-base-100 lg:w-80 shadow-xl">
              <figure>
                <img src={category?.thumbnail} alt="Shoes" />
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
