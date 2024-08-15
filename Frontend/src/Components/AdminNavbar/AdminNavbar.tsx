'use client'
import { setOrdersNull } from "@/lib/features/orderSlice";
import { logout } from "@/lib/features/userSlice";
import { RootState } from "@/lib/store";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckToken from "../CheckToken/CheckToken";

const navOptions = (
    <>
        <li>
          <Link href="/admin">
            All User
          </Link>
        </li>
        <li>
          <Link href="/admin/category">
            Manage Category
          </Link>
        </li>
        <li>
          <Link href="/admin/manage-product">
            Manage Product
          </Link>
        </li>
        <li>
          <Link href="/admin/add-product">
            Add Product
          </Link>
        </li>
        <li>
          <Link href="/admin/manage-variant">
            Manage Variant
          </Link>
        </li>
        <li>
          <Link href="/admin/manage-order">
            Manage Order
          </Link>
        </li>
    </>
  );
const AdminNavbar = () => {

  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch()

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

  return (
    <div className="navbar max-w-screen-xl relative z-50 bg-opacity-30 bg-amber-950 text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navOptions}
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl" href={"/"}>
          MedHome
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
     {navOptions}
        </ul>
      </div>
      <div className="navbar-end">
      {user&& (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img src={user?.photo} alt="" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content  bg-amber-500 text-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/profile">Profile</Link>
                <Link href="/my-order">My Order</Link>
                <span onClick={()=>{
                  dispatch(setOrdersNull())
                  dispatch(logout())
                }}>Logout</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;
