// import SideNav from '@/app/ui/dashboard/sidenav';

import Link from "next/link";
import { BiCategoryAlt } from "react-icons/bi";
import {FaHome, FaList } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdNoteAdd, MdOutlineMenu, MdOutlineRateReview } from "react-icons/md";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-orange-400">
        <h1 className="text-center my-5 text-2xl font-bold">MED Home</h1>
        <ul className="menu">
          <>
          <li>
              <Link href="/admin">
                <FaPeopleGroup />
                All User
              </Link>
            </li>
            <li>
              <Link href="/admin/category">
              <BiCategoryAlt  />
                Manage Category
              </Link>
            </li>
            <li>
              <Link href="/dashboard/user-home">
              <FaList />
                Manage Product
              </Link>
            </li>
            <li>
              <Link href="/admin/add-product">
              <MdNoteAdd />
                Add Product
              </Link>
            </li>
            <li>
              <Link href="/dashboard/my-review">
                <MdOutlineRateReview />
                Manage Order
              </Link>
            </li>
          </>
          <div className="divider"></div>
          <li>
            <Link href="/">
              <FaHome />
              Home
            </Link>
          </li>
          <li>
            <Link href="/product">
              <MdOutlineMenu />
              Product
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-1">{children}</div>
    </div>
    // <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
    //   <div className="w-full flex-none md:w-64">

    //   </div>
    //   <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    // </div>
  );
}
