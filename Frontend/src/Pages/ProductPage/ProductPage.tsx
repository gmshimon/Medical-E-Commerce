"use client";
import Cover from "@/Components/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Products from "@/Components/Products/Products";

const ProductPage = () => {
  const pathname = usePathname();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("categories.json")
      .then((res) => res.json())
      .then((data) => setCategories(data));
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
            <Tab>{item.name}</Tab>
          ))}
        </TabList>
        <TabPanel>
          <Products CategoryName={""} />
        </TabPanel>
        {categories.map((item) => (
          <TabPanel>Hello</TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default ProductPage;
