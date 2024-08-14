"use client";
import ProductInterface from "@/Interface/product.interface";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductModal from "../ProductModal/ProductModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { reset } from "@/lib/features/cartSlice";

// Define the type for props
interface ProductsProps {
  CategoryName: string;
}

// Define the component
const Products: React.FC<ProductsProps> = ({ CategoryName }) => {
  const { isCartItemAdded } = useSelector((state: RootState) => state.cart);
  const { products } = useSelector((state: RootState) => state.product);
  // Use the type in the state
  const [productsData, setProducts] = useState<ProductInterface[]>([]);
  const [singleProduct, setSingleProduct] = useState<ProductInterface | null>(
    null
  );
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    console.log(products)
    if (CategoryName) {
      const filteredProducts = products.filter((product) =>
        product.categories.includes(CategoryName)
      );
      setProducts(filteredProducts);
    } else {
      setProducts(products);
    }
  }, [CategoryName]);
  useEffect(() => {
    if(!isModalOpen){
      if (isCartItemAdded ) {
        console.log('ITem Added');
        toast.success("Item Added!");
        dispatch(reset());
      }
    }
    
  }, [isCartItemAdded, isModalOpen]);

  return (
    <div>
      <ToastContainer position="top-right" />
      {/* <h2 className="text-2xl font-bold text-center mb-4">{CategoryName}</h2> */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-10">
        {productsData?.map((item) => (
          <div
            key={item.name}
            className="card card-compact bg-base-100 w-96 shadow-xl relative"
          >
            <figure>
              {/* TODO: use product image */}
              <img
                src={item?.photos[0]}
                className="w-[384px] h-[281px] border-2 rounded-xl"
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
                    product={singleProduct}
                    children={undefined}
                  />
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
