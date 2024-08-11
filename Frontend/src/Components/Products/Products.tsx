"use client";
import ProductInterface from "@/Interface/product.interface";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductModal from "../ProductModal/ProductModal";

// Define the type for props
interface ProductsProps {
  CategoryName: string;
}

// Define the component
const Products: React.FC<ProductsProps> = ({ CategoryName }) => {
  // Use the type in the state
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [singleProduct, setSingleProduct] = useState<ProductInterface | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/products.json");
        const data: ProductInterface[] = await response.json();
        if (CategoryName) {
          const filteredProducts = data.filter(product =>
            product.categories.includes(CategoryName)
          );
          setProducts(filteredProducts);
        } else {
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [CategoryName]);

  return (
    <div>
      <ToastContainer />
      {/* <h2 className="text-2xl font-bold text-center mb-4">{CategoryName}</h2> */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-10">
        {products.map((item) => (
          <div
            key={item.name}
            className="card card-compact bg-base-100 w-96 shadow-xl relative"
          >
            <figure>
              {/* TODO: use product image */}
              <img
                src="https://images.aeonmedia.co/images/afef287f-dd6f-4a6a-b8a6-4f0a09330657/sized-kendal-l4ikccachoc-unsplash.jpg?width=3840&quality=75&format=auto"
                alt={item.name}
              />
            </figure>
            <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">
              ${item.price.toFixed(2)}
            </p>
            <div className="card-body">
              <h3 className="card-title text-center">{item.name}</h3>
              <p>{item.description}</p>
              <p>Meta Key: {item.metaKey}</p>
              <div className="card-actions justify-center">
                <button
                  disabled={!item.stockStatus}
                  onClick={() => {
                    openModal();
                    setSingleProduct(item);
                    // toast.success("Success Notification !", {
                    //     position: "top-right",
                    // });
                  }}
                  className="btn btn-outline border-0 border-b-4 border-orange-400 mt-4"
                >
                  {item.stockStatus ? "Details" : "Stock out"}
                </button>
                {singleProduct && (
                  <ProductModal
                                isOpen={isModalOpen}
                                onClose={closeModal}
                                product={singleProduct} children={undefined}                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
