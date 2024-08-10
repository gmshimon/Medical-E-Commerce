"use client";
import React, { useEffect, useState } from 'react';

// Define the type for a product
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockStatus: boolean;
}

// Define the type for props
interface ProductsProps {
  CategoryName: string;
}

// Define the component
const Products: React.FC<ProductsProps> = ({ CategoryName }) => {
  // Use the type in the state
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("products.json")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  console.log(CategoryName);

  return (
    <div>
      <h2 className='text-2xl font-bold text-center mb-4'>{CategoryName}</h2>
      <div className='grid md:grid-cols-3 gap-10'>
        {products.map(item => (
          <div key={item.id} className='card card-compact bg-base-100 w-96 shadow-xl'>
            <figure>
              <img
                src="https://images.aeonmedia.co/images/afef287f-dd6f-4a6a-b8a6-4f0a09330657/sized-kendal-l4ikccachoc-unsplash.jpg?width=3840&quality=75&format=auto"
                alt='Product'
              />
            </figure>
            <p className='absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white'>
              ${item.price}
            </p>
            <div className='card-body'>
              <h3 className='card-title text-center'>{item.name}</h3>
              <p>{item.description}</p>
              <div className='card-actions justify-center'>
                <button
                  disabled={!item.stockStatus}
                  // onClick={handleFoodItem}
                  className='btn btn-outline border-0 border-b-4 border-orange-400 mt-4'
                >
                  {item.stockStatus ? 'Add to Cart' : 'Stock out'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
