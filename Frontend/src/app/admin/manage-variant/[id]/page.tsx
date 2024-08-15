"use client";

import SectionTitle from "@/Components/SectionTitle/SectionTitle";
import { reset, updateVariant } from "@/lib/features/variantSlice";
import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { MdOutlineAddBusiness } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = ({ params }: { params: { id: string } }) => {
  const { variants,isUpdateVariantError,isUpdateVariantSuccess } = useSelector((state: RootState) => state.variant);
  const { user } = useSelector((state: RootState) => state.user);
  const [name, setName] = useState<String | any>("");
  const [price, setPrice] = useState<String | any>("");

  const dispatch = useDispatch()
  useEffect(() => {
    const result: Object | undefined = variants.find(
      (item) => item._id === params.id
    );
    setName(result?.name);
    setPrice(result?.price);
  }, [params]);

  useEffect(()=>{
    if(isUpdateVariantSuccess){
        toast.success("Updated variant successfully");
        setName("");
        setPrice("");
        dispatch(reset())
    }
    if(isUpdateVariantError){
        toast.error("Failed to update variant");
        dispatch(reset())
    }
  },[isUpdateVariantError,isUpdateVariantSuccess])

  const handleAddVariant = async (e: React.FormEvent) => {
    e.preventDefault();
    const data ={
        name,
        price,
    }
    dispatch(updateVariant({id:params.id,data:data}))
  };

  return (
    <section>
      <ToastContainer position="top-right" />
      <SectionTitle heading={"add variant"} subHeading={"What's New"} />
      <div className="flex justify-center">
        <div className=" bg-slate-100 px-10 py-5 w-full lg:w-[900px] rounded-md">
          <form className="max-w-full" onSubmit={handleAddVariant}>
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
                  <label htmlFor="price">Price *</label>
                </div>
                <input
                  required
                  name="price"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full "
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <button className="btn btn-active btn-warning text-white">
                Update Variant <MdOutlineAddBusiness />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default page;
