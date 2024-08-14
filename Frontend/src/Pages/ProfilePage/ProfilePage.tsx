"use client";
import CheckToken from "@/Components/CheckToken/CheckToken";
import SectionTitle from "@/Components/SectionTitle/SectionTitle";
import { RootState } from "@/lib/store";
import React, { useEffect } from "react";
import { FaUtensils } from "react-icons/fa";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { user } = useSelector((state: RootState) => state.user);

  // check the token and user
  const checkTokenExpiration = CheckToken()
  useEffect(() => {
      // Call checkTokenExpiration every sec (1 * 1000 milliseconds)
      checkTokenExpiration();
      const tokenExpirationInterval = setInterval(checkTokenExpiration, 1 * 1000);
      // Clean up the interval on component unmount
      return () => clearInterval(tokenExpirationInterval);
    }, []);
  return (
    <section>
      <h1 className="text-center text-2xl my-10 font-bold">User Profile</h1>
      <div className="flex justify-center">
        <div className=" bg-slate-100 px-10 py-7 w-full lg:w-[900px] rounded-md">
          <form className="max-w-full">
            <div className="">
              <div>
                <label htmlFor="name">Recipe Name </label>
              </div>
              <input
                name="name"
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full  mt-2"
                value={user?.name}
              />
            </div>
            <div className="max-w-full flex flex-col lg:flex-row lg:space-x-4 mt-4">
              <div className="flex-1">
                <div>
                  <label htmlFor="category">Email </label>
                </div>
                <input
                  readOnly
                  name="name"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full "
                  value={user?.email}
                />
              </div>
              <div className="flex-1 mt-4 md:mt-0">
                <div>
                  <label htmlFor="price">Role </label>
                </div>
                <input
                  readOnly
                  name="price"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full "
                  value={user?.role}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
