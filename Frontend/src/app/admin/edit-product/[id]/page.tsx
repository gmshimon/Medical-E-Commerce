"use client";
import SectionTitle from "@/Components/SectionTitle/SectionTitle";
import { createProduct, reset, updateProduct } from "@/lib/features/productSlice";
import { RootState } from "@/lib/store";
import { ChangeEvent, useEffect, useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const variants = [
  { name: "100mg", price: 12 },
  { name: "200mg", price: 15 },
  { name: "300mg", price: 18 },
  { name: "500mg", price: 20 },
];
const page = ({ params }: { params: { id: string } }) => {
  const { categories } = useSelector((state: RootState) => state.category);
  const { products } = useSelector((state: RootState) => state.product);
  const { isProductUpdateError, isProductUpdateSuccess } = useSelector(
    (state: RootState) => state.product
  );
  const [product, setProduct] = useState<Object | undefined>({});
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

  useEffect(() => {
    const result: Object | undefined = products.find(
      (item) => item._id === params.id
    );
    setProduct(result);
    setName(result?.name);
    setSlug(result?.slug);
    setDes(result?.description);
    setMeta(result?.metaKey);
    setPrice(result?.price);
    setDiscount(result?.discount);
    setCategory(result?.categories);
    setVariants(result?.variants);
    const arr =[]
    result.variants.map(v=>{
        const data= {
            name: v.name,
            price: v.price,
        }
        arr.push(data)
    })
    setVariants(arr)
    setPhotos(result?.photos);
    setStock(result?.stockStatus);
    setStatus(result?.status);
  }, []);

  useEffect(()=>{
    if(isProductUpdateSuccess){
        toast.success('Updated Succesfully')
        dispatch(reset())
    }
    if(isProductUpdateError){
        toast.error('Update went wrong')
        dispatch(reset())
    }
  },[isProductUpdateSuccess,isProductUpdateError])
  const handleVariantChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) =>
      JSON.parse(option.value)
    );
    console.log(selectedOptions);
    setVariants(selectedOptions);
  };

  const handleAddItem = (
    event: ChangeEvent<HTMLSelectElement>
  ): VoidFunction => {
    event.preventDefault();
    const data = {
        name:name,
        slug:slug,
        description:description,
        metaKey:metaKey,
        price:price,
        discount:discount,
        categories:category,
        variants:variant,
        stockStatus: stock,
        status: status,
    }
    dispatch(updateProduct({id: params.id,data}))
    console.log(data);
  }; 
  return (
    <section>
      <ToastContainer position="top-right" />
      <SectionTitle heading={"add product"} subHeading={"What's New"} />
      <div className="flex justify-center">
        <div className="bg-slate-100 px-10 py-7 w-full lg:w-[900px] rounded-md">
          <form className="max-w-full" onSubmit={handleAddItem}>
            {/* Product Name and Slug */}
            <div className="max-w-full flex flex-col lg:flex-row lg:space-x-4">
              <div className="flex-1">
                <label htmlFor="name">Product Name *</label>
                <input
                value={name}
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
                value={slug}
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
                value={price}
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
                value={discount}
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
                value={metaKey}
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
                value={status}
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
                value={category}
                  name="category"
                  className="select select-bordered w-full"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((item) => (
                    item?.name===category?
                    <option selected key={item.id} value={item.name}>
                      {item.name}
                    </option>:<option key={item.id} value={item.name}>
                      {item.name}
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
                  value={variant?.map(item => JSON.stringify(item))}
                  onChange={handleVariantChange}
                >
                  <option disabled value="">
                    Select Variant
                  </option>
                
                  {variants.map((item) => 
                   <option key={item.name} value={JSON.stringify(item)}>
                      {item.name} (${item.price})
                    </option>
                  )}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4">
              <label htmlFor="description">Description *</label>
              <textarea
              value={description}
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
            <div className="mt-4 flex">
              {
                photos?.map(v=>
                    <img className="h-[50px] w-[60px] ml-5" src={v}/>
                )
              }
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button className="btn btn-active btn-warning text-white">
                Add Item <FaUtensils />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default page;
