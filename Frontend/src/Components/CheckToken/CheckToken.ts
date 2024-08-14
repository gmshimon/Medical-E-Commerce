'use client'
import { setUserNull } from '@/lib/features/userSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const CheckToken = () => {
    const dispatch = useDispatch()
    const router = useRouter();
    const checkTokenExpiration = () => {
      const storedToken = localStorage.getItem("userToken");
      if (storedToken) {
        const { tokenExpiration } = JSON.parse(storedToken);
        const currentTime = new Date().getTime(); //get the current time 
        if (currentTime > tokenExpiration) { // check the time with the token expiration
            // TODO: implement logout 
            dispatch(setUserNull())
          localStorage.removeItem("userToken");
          router.replace("/");
        }
      } else {
        router.push("/login");
      }
    };

    return checkTokenExpiration
};

export default CheckToken;