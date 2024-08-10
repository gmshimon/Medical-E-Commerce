import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import ProductInterface from "@/Interface/product.interface";
import { CiShoppingCart } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Variant {
  name: string;
  price: number;
}

interface ModalProps {
  isOpen: boolean;
  product: ProductInterface;
  onClose: () => void;
  children: React.ReactNode;
}

const ProductModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  product,
  children,
}) => {
  if (!isOpen) return null;

  useEffect(() => {
    if (isOpen) {
      document?.getElementById("my_modal_1")?.showModal();
    }
  }, [isOpen]);
  const [timeLeft, setTimeLeft] = useState<number>(59); // Countdown timer starting at 59 seconds
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [activeVariant, setActiveVariant] = useState<Variant | null>(null);

  const handleVariantClick = (variantInfo: Variant) => {
    setActiveVariant(variantInfo);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // console.log("OTP submitted:", otp.join(""));
  };
  const handleAddCart = () => {
    console.log("Product from modal:", product);
  };
  return ReactDOM.createPortal(
    <dialog id="my_modal_1" className="modal">
        <ToastContainer position="top-right"/>
      <div className="modal-box w-3/4 max-w-4xl">
        {" "}
        {/* Adjust width here */}
        <div className="hero">
          <div className="hero-content flex-col lg:flex-row space-x-20">
            <img
              src={product.photos[0]}
              className="max-w-sm rounded-lg shadow-2xl h-[300px] w-[300px]"
            />
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="font-bold mt-3 text-2xl text-orange-700">
                $ {activeVariant?.price || product?.price}
              </p>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              {product.variants.map((variant) => (
                <button
                  key={variant.name}
                  onClick={() => handleVariantClick(variant)}
                  className={`btn btn-xs btn-outline btn-info mr-4 ${
                    activeVariant?.name === variant.name ? "btn-active" : ""
                  }`}
                >
                  {variant.name}
                </button>
              ))}
              <br />
              
              <button
                onClick={handleAddCart}
                className="btn btn-outline border-0 border-b-4 border-orange-400 mt-4"
              >
                <CiShoppingCart className="" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button
              onClick={onClose}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>,
    document.body // Render the modal into the body element
  );
};

export default ProductModal;
