"use client";
import Cover from "@/Components/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Products from "@/Components/Products/Products";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "@/lib/features/categorySlice";
import { RootState } from "@/lib/store";
import { getAllProduct } from "@/lib/features/productSlice";

const ProductPage = () => {
  const {categories} = useSelector((state:RootState)=>state.category)
  const pathname = usePathname();
  // const [categories, setCategories] = useState([]);
  const dispatch = useDispatch()
  useEffect(() => {
    // fetch("categories.json")
    //   .then((res) => res.json())
    //   .then((data) => setCategories(data));
    dispatch(getAllProduct());
    dispatch(getAllCategories())
  }, []);

  return (
    <div>
      <Cover
        img={
          "https://images.aeonmedia.co/images/afef287f-dd6f-4a6a-b8a6-4f0a09330657/sized-kendal-l4ikccachoc-unsplash.jpg?width=3840&quality=75&format=auto"
        }
        title={"MedHome Product"}
        subtitle={
          "Empowering your health with trusted, effective medicine—your path to wellness begins here."
        }
      />
      <Tabs>
        <TabList>
          <Tab>All</Tab>
          {categories.map((item) => (
            <Tab key={item?._id}>{item.name}</Tab>
          ))}
        </TabList>
        <TabPanel>
          <Products CategoryName={""} />
        </TabPanel>
        {categories.map((item) => (
          <TabPanel>
          <Products CategoryName={item?.name} />
        </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default ProductPage;
