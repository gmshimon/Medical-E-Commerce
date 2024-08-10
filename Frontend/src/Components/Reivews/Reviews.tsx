"Use Client";
"use client";
import React from "react";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

const reviews = [
  {
    _id: "643010e0f5a7e52ce1e8fa65",
    name: "Jane Doe",
    details:
      "Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    rating: 3,
  },
  {
    _id: "643010f9f5a7e52ce1e8fa66",
    name: "John Doe",
    details:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)",
    rating: 2,
  },
  {
    _id: "6430110af5a7e52ce1e8fa67",
    name: "MJ Doe",
    details:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)",
    rating: 5,
  },
  {
    _id: "64301123f5a7e52ce1e8fa68",
    name: "Sarah Smith",
    details:
      "I found the product to be incredibly useful and easy to use. The interface is intuitive, and it has all the features I need. Highly recommend it!",
    rating: 4,
  },
  {
    _id: "6430113af5a7e52ce1e8fa69",
    name: "Robert Johnson",
    details:
      "This is by far the best service I have ever used. The customer support is outstanding, and the product itself is top-notch. I couldn't be happier!",
    rating: 5,
  },
];

const Reviews = () => {
  return (<div>
    <Swiper navigation={true} modules={[Navigation]} className='mySwiper'>
        {reviews.map(review => (
          <SwiperSlide key={review._id}>
            <div className='flex justify-center'>
              <div className='flex flex-col md:w-[800px] items-center mx-24 my-16'>
                <Rating
                  style={{ maxWidth: 180,marginBottom:'60px' }}
                  value={review.rating}
                  readOnly
                />
                <svg
                  width='100'
                  height='86'
                  viewBox='0 0 100 86'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M34.615 39.1542L21.1533 39.1542C19.5506 39.1542 18.1881 38.5935 17.0662 37.4716C15.9449 36.3497 15.3835 34.9876 15.3835 33.3845V31.4623C15.3835 27.2152 16.8862 23.5897 19.8914 20.5846C22.8963 17.5805 26.5225 16.0778 30.7691 16.0778H34.615C35.6565 16.0778 36.5576 15.697 37.3191 14.9361C38.0803 14.1747 38.4608 13.2736 38.4608 12.2319V4.53889C38.4608 3.49738 38.0801 2.59543 37.3191 1.83408C36.5578 1.07379 35.6567 0.692383 34.615 0.692383L30.7691 0.692383C26.602 0.692383 22.6265 1.50446 18.84 3.12628C15.0539 4.74917 11.7791 6.9429 9.01428 9.70769C6.2497 12.4712 4.0566 15.7462 2.43393 19.5328C0.811258 23.3188 -0.000183105 27.2954 -0.000183105 31.4621L-0.000183105 73.7688C-0.000183105 76.9756 1.1211 79.6985 3.36472 81.9429C5.60854 84.1861 8.33355 85.3076 11.5385 85.3076H34.6164C37.8212 85.3076 40.5453 84.1861 42.7894 81.9429C45.0326 79.6985 46.1545 76.9756 46.1545 73.7688V50.6929C46.1545 47.4867 45.0326 44.7638 42.7879 42.5191C40.5449 40.2762 37.8197 39.1542 34.615 39.1542Z'
                    fill='#151515'
                  />
                  <path
                    d='M96.6366 42.5191C94.3936 40.2762 91.6692 39.1542 88.4637 39.1542L75.0022 39.1542C73.4004 39.1542 72.0366 38.5935 70.9166 37.4716C69.7942 36.3497 69.2339 34.9876 69.2339 33.3845V31.4623C69.2339 27.2152 70.7366 23.5897 73.7403 20.5846C76.7442 17.5805 80.3701 16.0778 84.6189 16.0778H88.4639C89.5056 16.0778 90.4074 15.697 91.1683 14.9361C91.9288 14.1747 92.3108 13.2736 92.3108 12.2319V4.53889C92.3108 3.49738 91.929 2.59543 91.1683 1.83408C90.4076 1.07379 89.5058 0.692383 88.4639 0.692383L84.6189 0.692383C80.4495 0.692383 76.4748 1.50446 72.6872 3.12628C68.9018 4.74917 65.628 6.9429 62.8632 9.70769C60.0984 12.4712 57.9043 15.7462 56.2822 19.5328C54.66 23.3188 53.8475 27.2954 53.8475 31.4621V73.7688C53.8475 76.9756 54.9698 79.6985 57.2128 81.9429C59.456 84.1861 62.1804 85.3076 65.3857 85.3076H88.4624C91.668 85.3076 94.3921 84.1861 96.6351 81.9429C98.8798 79.6985 99.9998 76.9756 99.9998 73.7688V50.6929C100 47.4865 98.8798 44.7638 96.6366 42.5191Z'
                    fill='#151515'
                  />
                </svg>
                <p className='py-8 text-justify font-normal'>{review.details}</p>
                <h3 className='text-3xl text-orange-400'>{review.name}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
  </div>);
};

export default Reviews;
