"use client";
"use client";
import CheckToken from "@/Components/CheckToken/CheckToken";
import Pagination from "@/Components/Pagination/Pagination";
import SectionTitle from "@/Components/SectionTitle/SectionTitle";
import { addVariant, deleteVariant, getAllVariants, reset, setVariantID } from "@/lib/features/variantSlice";
import { RootState } from "@/lib/store";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdOutlineAddBusiness } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageVariant = () => {
  const { variants,isCreateVariantError,isCreateVariantSuccess,isDeleteVariantSuccess,isDeleteVariantError } = useSelector((state: RootState) => state.variant);
  const { user } = useSelector((state: RootState) => state.user);
  const [name, setName] = useState<String|any>("");
  const [price, setPrice] = useState<String|any>("");

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
    dispatch(getAllVariants());
  }, []);

  useEffect(()=>{
    if(isCreateVariantSuccess){
        toast.success("Variant Created Successfully");
        dispatch(reset());
    }
    if(isCreateVariantError){
        toast.success("Something went wrong");
        dispatch(reset());
    }
    if(isDeleteVariantSuccess){
        toast.success("Variant Deleted Successfully");
        dispatch(reset());
    }
    if(isDeleteVariantError){
        console.log("hello");
        toast.error("Delete unsuccessful");
        dispatch(reset());
    }
  },[isCreateVariantSuccess,isCreateVariantError,isDeleteVariantSuccess,isDeleteVariantError])

  const handleAddVariant = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addVariant({ name, price:parseFloat(price) }));
    setName("");
    setPrice("");
  };

  const itemsPerPage = 5; // Number of items to show per page
  const totalPages = Math.ceil(variants?.length / itemsPerPage); // Calculate total pages
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  //calculating the page in the pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const cartItems = variants?.slice(indexOfFirstItem, indexOfLastItem);

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
                Add Variant <MdOutlineAddBusiness />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* category table */}
      <div className="mb-5">
        <div className="overflow-x-auto pl-10 mb-10 mt-5 h-[500px] lg:h-[420px]">
          <table className="table">
            {/* head */}
            <thead className="bg-orange-600 text-white text-1xl">
              <tr>
                <th>#</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item, index) => (
                <tr key={item?._id}>
                  <th>{indexOfFirstItem + index + 1}</th>
                  <td>{item?.name}</td>
                  <td>{item?.price}</td>
                  <td>
                  <Link href={`/admin/manage-variant/${item._id}`}>
                    <button
                      onClick={() => dispatch(setVariantID(item._id))}
                      className="btn btn-warning"
                    >
                      <FaEdit />
                    </button>
                    </Link>
                  </td>
                  <th>
                    <button
                        onClick={() => dispatch(deleteVariant(item._id))}
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
      </div>
    </section>
  );
};

export default ManageVariant;
