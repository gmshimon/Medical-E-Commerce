"use client";

import SectionTitle from "@/Components/SectionTitle/SectionTitle";
import { createProduct, reset } from "@/lib/features/productSlice";
import { getAllVariants } from "@/lib/features/variantSlice";
import { RootState } from "@/lib/store";
import { ChangeEvent, useEffect, useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const variants = [
//   { name: "100mg", price: 12 },
//   { name: "200mg", price: 15 },
//   { name: "300mg", price: 18 },
//   { name: "500mg", price: 20 },
// ];

const AddProduct = () => {
  const { categories } = useSelector((state: RootState) => state.category);
  const { variants } = useSelector((state: RootState) => state.variant);
  const {isProductCreateError,isProductCreateSuccess} = useSelector((state: RootState) => state.product)
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDes] = useState("");
  const [metaKey, setMeta] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [category, setCategory] = useState("");
  const [variant, setVariants] = useState([]);
  const [photos, setPhotos] = useState<FileList | null>(null);
  const [stock, setStock] = useState(true);
  const [status, setStatus] = useState("active");

  const dispatch = useDispatch();

  const handleVariantChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) =>
      JSON.parse(option.value)
    );
    setVariants(selectedOptions);
  };

  useEffect(()=>{
    dispatch(getAllVariants())
  },[])

  useEffect(()=>{
    if(isProductCreateSuccess){
      toast.success("New Product created");
      dispatch(reset())
    }
    if(isProductCreateError){
      toast.error("Something went wrong");
      dispatch(reset())
    }
  },[isProductCreateSuccess,isProductCreateError])

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("metaKey", metaKey);
    formData.append("price", price.toString());
    formData.append("discount", discount.toString());
    formData.append("categories", category);
    formData.append("stockStatus", stock.toString());
    formData.append("status", status);

    // Append each variant
    variant.forEach((v, index) => {
      formData.append(`variants[${index}][name]`, v.name);
      formData.append(`variants[${index}][price]`, v.price.toString());
  });
    // Append each photo
    if (photos) {
      Array.from(photos).forEach((photo) => {
        formData.append("images", photo);
      });
    }

    dispatch(createProduct(formData));
  };

  return (
    <section>
      <ToastContainer position="top-right"/>
      <SectionTitle heading={"add product"} subHeading={"What's New"} />
      <div className="flex justify-center">
        <div className="bg-slate-100 px-10 py-7 w-full lg:w-[900px] rounded-md">
          <form className="max-w-full" onSubmit={handleAddItem}>
            {/* Product Name and Slug */}
            <div className="max-w-full flex flex-col lg:flex-row lg:space-x-4">
              <div className="flex-1">
                <label htmlFor="name">Product Name *</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  required
                  name="name"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full mt-2"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="slug">Slug *</label>
                <input
                  onChange={(e) => setSlug(e.target.value)}
                  required
                  name="slug"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full mt-2"
                />
              </div>
            </div>

            {/* Price and Discount */}
            <div className="max-w-full flex flex-col lg:flex-row lg:space-x-4 mt-4">
              <div className="flex-1">
                <label htmlFor="price">Price *</label>
                <input
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                  required
                  name="price"
                  type="number"
                  placeholder="Type here"
                  className="input input-bordered w-full mt-2"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="discount">Discount *</label>
                <input
                  onChange={(e) => setDiscount(parseFloat(e.target.value))}
                  required
                  name="discount"
                  type="number"
                  placeholder="Type here"
                  className="input input-bordered w-full mt-2"
                />
              </div>
            </div>

            {/* Meta Key and Status */}
            <div className="max-w-full flex flex-col lg:flex-row lg:space-x-4 mt-4">
              <div className="flex-1">
                <label htmlFor="metaKey">Meta Key *</label>
                <input
                  onChange={(e) => setMeta(e.target.value)}
                  required
                  name="metaKey"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full mt-2"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="status">Status *</label>
                <select
                  name="status"
                  className="select select-bordered w-full mt-2"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option disabled value="">
                    Select Status
                  </option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Category and Variant */}
            <div className="max-w-full flex flex-col lg:flex-row lg:space-x-4 mt-4">
              <div className="flex-1">
                <label htmlFor="category">Category *</label>
                <select
                  name="category"
                  className="select select-bordered w-full"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option disabled selected value="">
                    Select category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1 mt-4 md:mt-0">
                <label htmlFor="variant">Variant *</label>
                <select
                  name="variant"
                  multiple
                  className="select select-bordered w-full"
                  onChange={handleVariantChange}
                >
                  <option disabled value="">
                    Select Variant
                  </option>
                  {variants?.map((item) => (
                    <option key={item.name} value={JSON.stringify(item)}>
                      {item.name} (${item.price})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4">
              <label htmlFor="description">Description *</label>
              <textarea
                onChange={(e) => setDes(e.target.value)}
                required
                name="description"
                className="textarea textarea-bordered h-24 w-full"
                placeholder="Product Description"
              ></textarea>
            </div>

            {/* Stock Status */}
            <div>
              <label className="label cursor-pointer">
                <div className="flex items-center">
                  <span className="label-text">Stock in/out</span>
                  <input
                    checked={stock}
                    type="checkbox"
                    className="toggle ml-2"
                    onChange={(e) => setStock(e.target.checked)}
                  />
                </div>
              </label>
            </div>

            {/* File Upload */}
            <div className="mt-4">
              <input
                type="file"
                accept="image/*"
                name="photos"
                className="file-input w-full max-w-xs"
                multiple
                onChange={(e) => setPhotos(e.target.files)}
              />
              <small>Maximum 5 files</small>
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button className="btn btn-active btn-warning text-white">
                Add Product <IoIosAddCircle />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
