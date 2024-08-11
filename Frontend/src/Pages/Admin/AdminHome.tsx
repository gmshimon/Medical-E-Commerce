'use client'
import SectionTitle from '@/Components/SectionTitle/SectionTitle';
import { RootState } from '@/lib/store';
import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';

const AdminHome = () => {
    const { carts } = useSelector((state: RootState) => state.cart);
    return (
        <div>
      <SectionTitle heading={'Manage all Users'} subHeading={'How many??'} />
      <div>
        <div className='overflow-x-auto pl-10'>
          <table className='table'>
            {/* head */}
            <thead className='bg-orange-600 text-white text-1xl'>
              <tr>
                <th>#</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ROLE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((item, index) => (
                <tr key={item?.price}>
                  <th>{index + 1}</th>
                  <td>{item?.name}</td>
                  <td>{item?.price}</td>
                  <td>
                    <button
                    //   disabled={item?.role === 'admin'}
                      className='btn btn-warning'
                    >
                      <FaUsers />
                    </button>
                  </td>
                  <th>
                    <button
                      // onClick={() => handleDeleteItem(item._id)}
                      className='btn btn-error'
                    >
                      <MdDelete />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
};

export default AdminHome;