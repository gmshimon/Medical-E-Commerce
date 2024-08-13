'use client'
import SectionTitle from '@/Components/SectionTitle/SectionTitle';
import { getAllUsers } from '@/lib/features/userSlice';
import { RootState } from '@/lib/store';
import React, { useEffect } from 'react';
import { FaUsers } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

const AdminHome = () => {
    const { carts } = useSelector((state: RootState) => state.cart);
    const {users} = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(getAllUsers())
    },[])
    
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
              {users.map((item, index) => (
                <tr key={item?._id}>
                  <th>{index + 1}</th>
                  <td>{item?.name}</td>
                  <td>{item?.email}</td>
                  <td>
                  {
                    item?.role === 'admin' ? (
                      <span className='badge badge-primary w-[70px]'>Admin</span>
                    ) :item?.role === 'super admin'? (<span className='badge badge-warning w-[70px] text-white'>Super Admin</span>): (
                      <span className='badge badge-success w-[70px] text-white'>User</span>
                    )
                  }
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