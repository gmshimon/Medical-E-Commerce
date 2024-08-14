"use client";
import CheckToken from "@/Components/CheckToken/CheckToken";
import OrdersTable from "@/Components/OrdersTable/OrdersTable";
import SectionTitle from "@/Components/SectionTitle/SectionTitle";
import { getAllOrders, getMyOrders, reset } from "@/lib/features/orderSlice";
import { RootState } from "@/lib/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyOrderPage = () => {
  const { orders, isUpdateOrderSuccess, isUpdateOrderError } = useSelector(
    (state: RootState) => state.order
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyOrders());
  }, []);

  useEffect(() => {
    if (isUpdateOrderSuccess) {
      dispatch(getAllOrders());
      toast.success("Status updated");
      dispatch(reset());
    }
    if (isUpdateOrderError) {
      dispatch(getAllOrders());
      toast.error("Failed to update status");
      dispatch(reset());
    }
  }, [isUpdateOrderSuccess, isUpdateOrderError]);
  const checkTokenExpiration = CheckToken();
  useEffect(() => {
    // Call checkTokenExpiration every sec (1 * 1000 milliseconds)
    checkTokenExpiration();
    const tokenExpirationInterval = setInterval(checkTokenExpiration, 1 * 1000);
    // Clean up the interval on component unmount
    return () => clearInterval(tokenExpirationInterval);
  }, []);
  return (
    <div>
      <SectionTitle heading={"My Order"} subHeading={"List"} />
      <ToastContainer position="top-right" />
      <OrdersTable orders={orders} />
    </div>
  );
};

export default MyOrderPage;
