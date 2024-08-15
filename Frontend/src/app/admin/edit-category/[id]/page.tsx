"use client";
import SectionTitle from "@/Components/SectionTitle/SectionTitle";
import {
  reset,
  updateCategory,
  updateCategoryImage,
} from "@/lib/features/categorySlice";
import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = ({ params }: { params: { id: string } }) => {
  const { categories, isCategoryUpdateSuccess, isCategoryUpdateError } =
    useSelector((state: RootState) => state.category);
    const { user } = useSelector((state: RootState) => state.user);
  const [category, setCategory] = useState<Object | undefined>({});
  const [name, setName] = useState<String>("");
  const [slug, setSlug] = useState<String>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<File | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const result: Object | undefined = categories.find(
      (item) => item._id === params.id
    );
    setCategory(result);
    setName(result?.name);
    setSlug(result?.slug);
  }, [file]);

  useEffect(() => {
    if (isCategoryUpdateSuccess) {
      toast.success("Updated category Successfully");
      setName("")
      setSlug("")
      dispatch(reset());
    }
    if(isCategoryUpdateError){
      toast.error("Update went wrong");
      dispatch(reset());
    }
  }, [isCategoryUpdateSuccess,isCategoryUpdateError]);

  const handleEditCategory = (e: any) => {
    e.preventDefault();
    if (fileData) {
      //TODO: update image
      const data = {
        id: params.id,
        image: fileData,
      };
      dispatch(updateCategoryImage(data));
    }
    const categoryData = {
      id: params.id,
      name,
      slug,
    };
    dispatch(updateCategory(categoryData));
    console.log(categoryData);
  };

  return (
    <section>
      <ToastContainer position="top-right" />
      <SectionTitle heading={"Edit Category"} subHeading={"What's New"} />
      <div className="flex justify-center">
        <div className=" bg-slate-100 px-10 py-7 w-full lg:w-[900px] rounded-md">
          <div className="flex justify-center">
            <img
              src={file || category?.thumbnail}
              alt="category image"
              className="h-[100px] w-[120px]"
            />
          </div>
          <form className="max-w-full" onSubmit={handleEditCategory}>
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
                  value={name}
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
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
            </div>
            <div className="max-w-full flex flex-col lg:flex-row lg:space-x-4 mt-4">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  name="file"
                  className="file-input w-full max-w-xs"
                  onChange={(e) => {
                    setFileData(e.target.files[0]);
                    setFile(URL.createObjectURL(e.target.files[0]));
                  }}
                />
              </div>
              {/* <div className="flex-1 mt-4 md:mt-0">
                 <img src={category?.thumbnail} alt="category image" className="h-[100px] w-[120px]"/>
              </div> */}
            </div>
            <div className="mt-4">
              <button className="btn btn-active btn-warning text-white">
                Edit Category <FaUtensils />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default page;
