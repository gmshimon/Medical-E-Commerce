'use client'

import SectionTitle from "@/Components/SectionTitle/SectionTitle";
import { RootState } from "@/lib/store";
import { ChangeEvent } from "react";
import { FaUtensils } from "react-icons/fa";
import { useSelector } from "react-redux";

const AddProduct = () => {
    const { categories } = useSelector((state: RootState) => state.category);
    const handleAddItem = async (e) => {
        e.preventDefault()
    }
    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        // setSelectedCategories(selectedOptions);
        console.log(selectedOptions)
      };
    return (
        <section>
      <SectionTitle heading={'add product'} subHeading={"What's New"} />
      <div className='flex justify-center'>
        <div className=' bg-slate-100 px-10 py-7 w-full lg:w-[900px] rounded-md'>
          <form className='max-w-full' onSubmit={handleAddItem}>
            <div className=''>
              <div>
                <label htmlFor='name'>Product Name *</label>
              </div>
              <input
                required
                name='name'
                type='text'
                placeholder='Type here'
                className='input input-bordered w-full  mt-2'
              />
            </div>
            <div className='max-w-full flex flex-col lg:flex-row lg:space-x-4 mt-4'>
              <div className='flex-1'>
                <div>
                  <label htmlFor='category'>Category *</label>
                </div>
                <select
                  name='category'
                  multiple
                  className='select select-bordered w-full '
                  onChange={(e) => handleCategoryChange(e)}
                >
                  <option selected disabled value={''}>
                    Select category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex-1 mt-4 md:mt-0'>
              <div>
                  <label htmlFor='category'>Variant *</label>
                </div>
                <select
                  name='category'
                  multiple
                  className='select select-bordered w-full '
                  onChange={(e) => handleCategoryChange(e)}
                >
                  <option selected disabled value={''}>
                    Select Variant
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='mt-4'>
              <div>
                <label htmlFor='details'>Description</label>
              </div>
              <textarea
                name='details'
                className='textarea textarea-bordered h-24 w-full'
                placeholder='Recipe Details'
              ></textarea>
            </div>
            <div className='mt-4'>
              <input
                type='file'
                accept='image/*'
                name='file'
                className='file-input w-full max-w-xs'
              />
            </div>
            <div className='mt-4'>
              <button className='btn btn-active btn-warning text-white'>
                Add Item <FaUtensils />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    );
};

export default AddProduct;