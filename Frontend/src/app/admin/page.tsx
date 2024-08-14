
import { RootState } from "@/lib/store";
import AdminHome from "@/Pages/Admin/AdminHome";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  // const {user} = useSelector((state: RootState) => state.user);

  return (
    <div>
      <AdminHome />
    </div>
  );
};

export default page;
