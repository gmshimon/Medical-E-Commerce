'use client'
import { RootState } from "@/lib/store";
import AdminHome from "@/Pages/Admin/AdminHome";
import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  const {user} = useSelector((state: RootState) => state.user);

    // if(user?.role==="admin"){
    //     redirect("/")
    // }
  return (
    <div>
      <AdminHome />
    </div>
  );
};

export default page;
