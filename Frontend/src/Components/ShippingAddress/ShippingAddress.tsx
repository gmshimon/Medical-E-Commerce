"use client";
import { setAddress, setDistrict, setDivision, setName, setPhone, setSubDistrict } from "@/lib/features/orderSlice";
import React from "react";
import { useDispatch } from "react-redux";

const ShippingAddress = () => {
    const dispatch = useDispatch()
  return (
    <section className="mt-3">
      <div className="flex justify-center">
        <div className="bg-slate-100 px-10 py-7 w-full lg:w-[900px] rounded-md">
        <h1 className="text-center text-2xl">Shipping Address</h1>
          <form className="max-w-full">
            {/* Product Name and Slug */}
            <div className="max-w-full flex flex-col lg:flex-row lg:space-x-4">
              <div className="flex-1">
                <label htmlFor="Division">Division</label>
                <input
                    onChange={(e) => dispatch(setDivision(e.target.value))}
                  required
                  name="Division"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full mt-2"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="District">District</label>
                <input
                    onChange={(e) => dispatch(setDistrict(e.target.value))}
                  required
                  name="District"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full mt-2"
                />
              </div>
            </div>

            {/* Sub District and Address */}
            <div className="max-w-full flex flex-col lg:flex-row lg:space-x-4 mt-4">
              <div className="flex-1">
                <label htmlFor="Sub District">Sub District</label>
                <input
                    onChange={(e) => dispatch(setSubDistrict(e.target.value))}
                  required
                  name="Sub District"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full mt-2"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="Address">Address</label>
                <input
                    onChange={(e) => dispatch(setAddress(e.target.value))}
                  required
                  name="Address"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full mt-2"
                />
              </div>
            </div>
            {/* Phone and Name */}
            <div className="max-w-full flex flex-col lg:flex-row lg:space-x-4 mt-4">
              <div className="flex-1">
                <label htmlFor="name">Name</label>
                <input
                    onChange={(e) => dispatch(setName(e.target.value))}
                  required
                  name="name"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full mt-2"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="Phone">Phone</label>
                <input
                    onChange={(e) => dispatch(setPhone(e.target.value))}
                  required
                  name="phone"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full mt-2"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ShippingAddress;
