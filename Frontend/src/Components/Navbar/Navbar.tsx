"Use Client";
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { carts } = useSelector((state: RootState) => state.cart);
  const { id } = useSelector((state: RootState) => state.category);
  const { productID } = useSelector((state: RootState) => state.product);
  const { user } = useSelector((state: RootState) => state.user);
  const pathname = usePathname();
  const navOptions = (
    <>
      <li>
        <Link href="/product">Product</Link>
      </li>
      {user?.role === "admin" && (
        <li>
          <Link href="/admin">Admin</Link>
        </li>
      )}
      <li>
        <Link href="/login">Login</Link>
      </li>
    </>
  );
  useEffect(() => {}, [pathname]);
  if (
    pathname === "/admin" ||
    pathname === "/admin/add-product" ||
    pathname === "/admin/category" ||
    pathname === `/admin/edit-category/${id}` ||
    pathname === "/admin/manage-product" ||
    pathname === `/admin/edit-product/${productID}` ||
    pathname === "/admin/manage-order"
  )
    return null;
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
            className="menu menu-sm dropdown-content  bg-amber-500 text-white rounded-box absolute top-full z-60  mt-3 w-52 p-2 shadow"
          >
            {navOptions}
          </ul>
        </div>

        <Link className="btn btn-ghost text-xl" href={"/"}>
          MedHome
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {carts.length}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content  bg-amber-500 text-white z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">{carts.length} Items</span>
              <span className="text-white font-bold">
                Subtotal: $
                {carts.reduce((acc, curr) => acc + curr.totalPrice, 0)}
              </span>
              <div className="card-actions">
                <Link className="w-full" href="/cart">
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {user ? (
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
                <Link href="/profile">My Order</Link>
                <Link href="/profile">Logout</Link>
              </li>
            </ul>
          </div>
        ) : (
          <li>
            <Link href="/login">Login</Link>
          </li>
        )}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Navbar;
