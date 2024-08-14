"use client";
import CheckToken from "@/Components/CheckToken/CheckToken";
import Pagination from "@/Components/Pagination/Pagination";
import SectionTitle from "@/Components/SectionTitle/SectionTitle";
import {
  deleteProduct,
  getAllProduct,
  reset,
  setProductId,
} from "@/lib/features/productSlice";
import { RootState } from "@/lib/store";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageProduct = () => {
  const { products, isProductDeleteError, isProductDeleteSuccess } =
    useSelector((state: RootState) => state.product);
    const { user } = useSelector((state: RootState) => state.user);
  const itemsPerPage = 5; // Number of items to show per page
  const totalPages = Math.ceil(products?.length / itemsPerPage); // Calculate total pages
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (user?.role !== "admin") {
      redirect("/");
    }
  }, []);

  //check the token and user
  const checkTokenExpiration = CheckToken();
  useEffect(() => {
    // Call checkTokenExpiration every sec (1 * 1000 milliseconds)
    if (user?.role === "admin") {
      checkTokenExpiration();
      const tokenExpirationInterval = setInterval(
        checkTokenExpiration,
        1 * 1000
      );
      return () => clearInterval(tokenExpirationInterval);
    }
    // Clean up the interval on component unmount
  }, []);

  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  useEffect(() => {
    if (isProductDeleteError) {
      toast.error("Failed to delete product");
      dispatch(reset());
    }
    if (isProductDeleteSuccess) {
      toast.success("Product was successfully deleted");
      dispatch(reset());
    }
  }, [isProductDeleteSuccess, isProductDeleteError]);

  const handleDeleteCategory = (id) => {
    dispatch(deleteProduct(id));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  //calculating the page in the pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const cartItems = products?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className="mb-5">
      <ToastContainer position="top-right" />
      <SectionTitle heading={"Edit Product"} subHeading={"What's New"} />
      <div className="overflow-x-auto pl-10 mt-5 h-[500px] lg:h-[450px] ">
        <table className="table ">
          {/* head */}
          <thead className="bg-orange-600 text-white text-1xl">
            <tr>
              <th>#</th>
              <th>NAME</th>
              <th>SLUG</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={indexOfFirstItem + item?._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item?.photos[0]}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item?.name}</div>
                      <div className="my-2">
                        {item?.status === "active" ? (
                          <span className="badge badge-success w-[70px]">
                            Active
                          </span>
                        ) : (
                          <span className="badge badge-warning w-[70px]">
                            Inactive
                          </span>
                        )}
                      </div>
                      <div className="text-sm opacity-50 ">
                        {item?.stockStatus ? "Available" : "Stock out"}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {item?.slug}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {item?.metaKey}
                  </span>
                </td>
                <td>
                  {item?.price}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    -{item?.discount}
                  </span>
                </td>
                <td>
                  <Link href={`/admin/edit-product/${item._id}`}>
                    <button
                      onClick={() => dispatch(setProductId(item._id))}
                      //   disabled={item?.role === 'admin'}
                      className="btn btn-warning"
                    >
                      <FaEdit />
                    </button>
                  </Link>
                </td>
                <th>
                  <button
                    onClick={() => handleDeleteCategory(item._id)}
                    className="btn btn-error"
                  >
                    <MdDelete />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </section>
  );
};

export default ManageProduct;
