"Use Client";
"use client";
import Link from "next/link";
import React, { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from '../../lib/store';

const Navbar = () => {
  const {carts} = useSelector((state:RootState) =>state.cart)
  const navOptions = (
    <>
      <li>
        <Link href="/product">Product</Link>
      </li>
      <li>
        <Link href="/order/Salad">Order</Link>
      </li>
      {/* {
            user?.role==="admin" && <li>
            <Link href='/dashboard/all-user'>Admin</Link>
          </li>
          } */}
      <li>
        <Link href="/dashboard/cart">
          {/* <button className='btn'> */}
          <BsCart3 />
          <div className="badge badge-secondary">+{carts?.length}</div>
          {/* </button> */}
        </Link>
      </li>
      <li>
        <Link href="/login">Login</Link>
      </li>
      {/* {user?.email ? (
            <li onClick={() => dispatch(logOut())}>
              <Link>Logout</Link>
            </li>
          ) : (
            <li>
              <Link href='/login'>Login</Link>
            </li>
          )} */}
    </>
  );
  return (
    <div className="navbar max-w-screen-xl z-10 bg-opacity-30 bg-amber-950 text-white">
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
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      <div className="navbar-end">{/* <a className="btn">Button</a> */}</div>
    </div>
  );
};

export default Navbar;
