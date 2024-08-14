"use client";

import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { changeStatus, deleteOrder } from "@/lib/features/orderSlice";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import Pagination from "../Pagination/Pagination";

const OrdersTable = ({ orders }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const itemsPerPage = 5; // Number of items to show per page
  const totalPages = Math.ceil(orders.length / itemsPerPage); // Calculate total pages
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  //calculating the page in the pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const cartItems = orders.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <section className="mb-5">
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
              {pathname === "/my-order" && <th>CANCEL</th>}
            </tr>
          </thead>
          <tbody>
            {cartItems?.map((item, index) => (
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
                    ) : item?.status === "cancelled" ? (
                      <span className="badge badge-xs badge-info w-[70px]">
                        Cancelled
                      </span>
                    ) : (
                      <span className="badge badge-xs badge-error w-[70px]">
                        Rejected
                      </span>
                    )}
                  </div>
                  <p className="text-xs mb-1">
                    {item?.createdAt.split("T")[0]}
                  </p>
                  <ul className="text-xs">
                    {item?.carts?.map((i) => (
                      <li className="mb-1">
                        {i?.name}({i?.variant})-{i?.quantity}P
                      </li>
                    ))}
                  </ul>
                </td>
                <td title={item?.address} className="text-xs">
                  <span>{item?.address}</span>
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {item?.district}, {item?.division}
                  </span>
                </td>
                <td>{item?.total_price}</td>
                {pathname === "/admin/manage-order" &&
                  (item?.status === "cancelled" ? (
                   <td>Cancelled</td>
                  ) : (
                    <td>
                      <button
                        onClick={() =>
                          dispatch(
                            changeStatus({ id: item._id, status: "delivered" })
                          )
                        }
                        className="btn btn-outline btn-xs btn-success text-sm mb-2 w-[80px]"
                      >
                        delivered
                      </button>
                      <button
                        onClick={() =>
                          dispatch(
                            changeStatus({ id: item._id, status: "rejected" })
                          )
                        }
                        className="btn btn-outline btn-xs btn-error text-sm w-[80px]"
                      >
                        Reject
                      </button>
                    </td>
                  ))}
                {pathname === "/admin/manage-order" && (
                  <th>
                    <button
                      onClick={() => dispatch(deleteOrder(item?._id))}
                      className="btn btn-error"
                    >
                      <MdDelete />
                    </button>
                  </th>
                )}
                {pathname === "/my-order" &&
                   (
                    <th>
                      <button
                      disabled={item?.status !=='pending'}
                        onClick={() =>
                          dispatch(
                            changeStatus({ id: item._id, status: "cancelled" })
                          )
                        }
                        className="btn btn-error"
                      >
                        Cancel
                      </button>
                    </th>
                  )}
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

export default OrdersTable;
