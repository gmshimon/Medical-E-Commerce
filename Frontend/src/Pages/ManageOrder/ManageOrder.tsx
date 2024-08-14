"use client";
import OrdersTable from "@/Components/OrdersTable/OrdersTable";
import Pagination from "@/Components/Pagination/Pagination";
import SectionTitle from "@/Components/SectionTitle/SectionTitle";
import { changeStatus, deleteOrder, getAllOrders, reset } from "@/lib/features/orderSlice";
import { RootState } from "@/lib/store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageOrder = () => {
  const { orders,isDeleteOrderSuccess,isDeleteOrderError,isUpdateOrderSuccess,isUpdateOrderError } = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  useEffect(()=>{
    if(isDeleteOrderSuccess){
      toast.success("Order deleted successfully");
      dispatch(reset())
    }
    if(isDeleteOrderError){
      toast.error("Failed to delete order");
      dispatch(reset())
    }
    if(isUpdateOrderSuccess){
      dispatch(getAllOrders());
      toast.success("Status updated");
      dispatch(reset())
    }
    if(isUpdateOrderError){
      dispatch(getAllOrders());
      toast.error("Failed to update status");
      dispatch(reset())
    }
  },[isDeleteOrderSuccess,isDeleteOrderError,isUpdateOrderSuccess,isUpdateOrderError])

  return (
    <>
    <SectionTitle heading={"Orders"} subHeading={"What's New"} />
          <ToastContainer position="top-right" />
          <OrdersTable orders={orders}/>
    </>
  );
};

export default ManageOrder;
