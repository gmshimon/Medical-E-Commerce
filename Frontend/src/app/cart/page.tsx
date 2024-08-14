"use client";
import CartPage from "@/Pages/CartPage/CartPage";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import CheckToken from "@/Components/CheckToken/CheckToken";

const page = () => {
const checkTokenExpiration = CheckToken()
useEffect(() => {
    // Call checkTokenExpiration every sec (1 * 1000 milliseconds)
    checkTokenExpiration();
    const tokenExpirationInterval = setInterval(checkTokenExpiration, 1 * 1000);
    // Clean up the interval on component unmount
    return () => clearInterval(tokenExpirationInterval);
  }, []);
  return (
    <div>
      <CartPage />
    </div>
  );
};

export default page;
