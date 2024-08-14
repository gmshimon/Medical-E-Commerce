"use client";
import Pagination from "@/Components/Pagination/Pagination";
import SectionTitle from "@/Components/SectionTitle/SectionTitle";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  reset,
  setCategoryId,
} from "@/lib/features/categorySlice";
import { RootState } from "@/lib/store";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { TbCategory } from "react-icons/tb";
const CategoryPage = () => {
  const {
    categories,
    isCategoryCreateSuccess,
    isCategoryCreateError,
    isCategoryDeleteError,
    isCategoryDeleteSuccess,
  } = useSelector((state: RootState) => state.category);
  const [name, setName] = useState<String>("");
  const [slug, setSlug] = useState<String>("");
  const [file, setFile] = useState<File | null>(null);

  const itemsPerPage = 5; // Number of items to show per page
  const totalPages = Math.ceil(categories.length / itemsPerPage); // Calculate total pages
  const [currentPage, setCurrentPage] = useState(1);
  //get all categories
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    if (isCategoryCreateSuccess) {
      toast.success("New Category Added !");
      dispatch(reset());
    }
    if (isCategoryCreateError) {
      toast.error("Something went wrong");
      dispatch(reset());
    }
    if (isCategoryDeleteSuccess) {
      toast.success("Deleted Successfully!");
      dispatch(reset());
    }
    if (isCategoryDeleteError) {
      toast.error("Delete unsuccessful!");
      dispatch(reset());
    }
  }, [
    isCategoryCreateSuccess,
    isCategoryCreateError,
    isCategoryDeleteError,
    isCategoryDeleteSuccess,
  ]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  //calculating the page in the pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const cartItems = categories.slice(indexOfFirstItem, indexOfLastItem);

  //  button to create category
  const handleAddItem = (event: any) => {
    event.preventDefault();
    const categoryData = {
      name,
      slug,
      image: file,
    };
    dispatch(createCategory(categoryData));
  };
  const handleCategoryEdit = (id: any) => {
    dispatch(setCategoryId(id));
  };
  const handleDeleteCategory = (id: any) => {
    dispatch(deleteCategory(id));
  };
  return (
    <section>
      <ToastContainer position="top-right" />
      <SectionTitle heading={"add Category"} subHeading={"What's New"} />
      <div className="flex justify-center">
        <div className=" bg-slate-100 px-10 py-7 w-full lg:w-[900px] rounded-md">
          <form className="max-w-full" onSubmit={handleAddItem}>
            <div className="max-w-full flex flex-col lg:flex-row lg:space-x-4 mt-4">
              <div className="flex-1">
                <div>
                  <label htmlFor="category">Name *</label>
                </div>
                <input
                  required
                  name="price"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full "
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex-1 mt-4 md:mt-0">
                <div>
                  <label htmlFor="price">Slug *</label>
                </div>
                <input
                  required
                  name="price"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full "
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <input
                type="file"
                accept="image/*"
                name="file"
                className="file-input w-full max-w-xs"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="mt-4">
              <button className="btn btn-active btn-warning text-white">
                Add Category <TbCategory />
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* category table */}
      <div>
        <div className="overflow-x-auto pl-10 mb-10 mt-5">
          <table className="table">
            {/* head */}
            <thead className="bg-orange-600 text-white text-1xl">
              <tr>
                <th>#</th>
                <th>NAME</th>
                <th>SLUG</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item?._id}>
                  <th>{indexOfFirstItem + index + 1}</th>
                  <td>{item?.name}</td>
                  <td>{item?.slug}</td>
                  <td>
                    <Link href={`/admin/edit-category/${item._id}`}>
                      <button
                        onClick={() => handleCategoryEdit(item._id)}
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
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
