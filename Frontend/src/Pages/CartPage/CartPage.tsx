"use client";
import Pagination from "@/Components/Pagination/Pagination";
import cartInterface from "@/Interface/cart.interface";
import { decrementQuantity, incrementQuantity } from "@/lib/features/cartSlice";
import { RootState } from "@/lib/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CartPage = () => {
  const { carts } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const itemsPerPage = 5; // Number of items to show per page
  const totalPages = Math.ceil(carts.length / itemsPerPage); // Calculate total pages
  const [currentPage, setCurrentPage] = useState(1);
  const handleIncrementQuantity = (item: cartInterface): void => {
    dispatch(incrementQuantity(item));
  };

  const handleDecrementQuantity = (item: cartInterface): void => {
    dispatch(decrementQuantity(item));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const cartItems = carts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="mt-10">
      <div className="overflow-x-auto h-[600px] lg:h-[450px] ">
        <table className="table">
          {/* head */}
          <thead className="bg-orange-600 text-white text-1xl">
            <tr>
              <th>#</th>
              <th>NAME</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item?.price}>
                <th>{indexOfFirstItem + index + 1}</th>
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
                      <div className="text-sm opacity-50">
                        {item?.variant} (${item?.price})
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item?.totalPrice}</td>
                <td>
                  <div className="space-x-2 flex justify-start items-center">
                    <button
                      onClick={() => handleDecrementQuantity(item)}
                      className="btn btn-sm btn-square btn-outline"
                    >
                      -
                    </button>
                    <span>{item?.quantity}</span>
                    <button
                      onClick={() => handleIncrementQuantity(item)}
                      className="btn btn-sm btn-square btn-outline"
                    >
                      +
                    </button>
                  </div>
                </td>
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

      <div className="flex justify-center mt-10">
        <div>
          <table className="table-auto">
            <tbody className="text-2xl">
              <tr>
                <td className="px-4">Subtotal:</td>
                <td className="px-4">
                  ${carts.reduce((acc, curr) => acc + curr.totalPrice, 0)}
                </td>
              </tr>
              <tr>
                <td className="px-4">Shipping:</td>
                <td className="px-4">$5.00</td>
              </tr>
              <tr>
                <td className="px-4 font-bold">Total:</td>
                <td className="px-4 font-bold">
                  ${carts.reduce((acc, curr) => acc + curr.totalPrice, 0) + 5}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-5">
            <button className="btn btn-primary btn-block">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
