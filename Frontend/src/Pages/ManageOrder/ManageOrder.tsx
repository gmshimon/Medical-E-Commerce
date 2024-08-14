"use client";
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
  const pathname = usePathname();
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
    <section className="mb-5">
      <ToastContainer position="top-right" />
      <SectionTitle heading={"Orders"} subHeading={"What's New"} />
      <div className="overflow-x-auto pl-10 mt-5 h-[500px] lg:h-[450px] ">
        <table className="table ">
          {/* head */}
          <thead className="bg-orange-600 text-white text-1xl">
            <tr>
              <th>#</th>
              <th>CUSTOMER</th>
              <th>PRODUCT</th>
              <th>ADDRESS</th>
              <th>Price</th>
              {pathname === "/admin/manage-order" && (
                <>
                  <th>ACTION</th>
                  <th>Delete</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {orders?.map((item, index) => (
              <tr key={item?._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{item?.name}</div>
                      <div className="text-sm opacity-50 ">{item?.email}</div>
                      <div className="text-sm opacity-50 ">{item?.phone}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="my-2">
                    {item?.status === "delivered" ? (
                      <span className="badge badge-xs badge-success w-[70px]">
                        Delivered
                      </span>
                    ) : item?.status === "pending" ? (
                      <span className="badge badge-xs badge-warning w-[70px]">
                        Pending
                      </span>
                    ) : (
                      <span className="badge badge-xs badge-error w-[70px]">
                        Rejected
                      </span>
                    )}
                  </div>
                  <p  className="text-xs mb-1">{item?.createdAt.split("T")[0]}</p>
                  <ul className="text-xs">
                  {item?.carts?.map((i) => (
                      <li className="mb-1">
                        {i?.name}({i?.variant})-{i?.quantity}P
                      </li>
                  ))}
                  </ul>
                </td>
                <td title={item?.address} className="text-xs">
                  <span >{item?.address}</span>
                  <br />
                  <span className="badge badge-ghost badge-sm">
                  {item?.district}, {item?.division}
                  </span>
                </td>
                <td>{item?.total_price}</td>
                <td>
                    <button
                    onClick={()=>dispatch(changeStatus({id: item._id,status:"delivered"}))}
                      className="btn btn-outline btn-xs btn-success text-sm mb-2 w-[80px]"
                    >
                      delivered
                    </button>
                    <button
                     onClick={()=>dispatch(changeStatus({id: item._id,status:"rejected"}))}
                      className="btn btn-outline btn-xs btn-error text-sm w-[80px]"
                    >
                      Reject
                    </button>
                </td>
                <th>
                  <button
                  onClick={()=>dispatch(deleteOrder(item?._id))}
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
      {/* <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        /> */}
    </section>
  );
};

export default ManageOrder;
