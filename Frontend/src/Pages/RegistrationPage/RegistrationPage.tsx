"Use Client";
"use client";
import Modal from "@/Components/Modal/Modal";
import { registerUser, reset, setisUserVerified } from "@/lib/features/userSlice";
import { RootState } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

const RegistrationPage = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState(false);
  const {isUserRegisterSuccess,isUserVerified} = useSelector((state: RootState)=>state.user)
  const dispatch = useDispatch()

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(()=>{
    if(isUserRegisterSuccess){
      openModal();
      dispatch(reset())
    }
    if(isUserVerified){
      dispatch(setisUserVerified())
      toast.success("User verified!");
    }
  },[isUserRegisterSuccess,isUserVerified])

  function handSubmitForm(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    // Collect form data
    const formData = {
      name,
      email,
      password,
      image:file
    };
    // openModal();
    dispatch(registerUser(formData));

  }

  return (
    <section className="flex items-center justify-center min-h-screen ">
      <ToastContainer position="top-right"/>
      <div className="lg:h-[650px] h-full w-full max-w-full rounded-lg shadow-md bg-black text-white">
        <div className="h-full flex flex-col lg:flex-row justify-around items-center">
          <div className="w-full lg:w-1/2">
            <Image
              alt="Login Image"
              src="/assets/Login/loginImg.png"
              layout="responsive"
              width={500}
              height={500}
              className="rounded-lg object-cover"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-center">Sign Up</h1>
            <form className="pr-5 w-full" onSubmit={handSubmitForm}>
              <div className="my-4">
                <label htmlFor="name">Full Name *</label>
                <input
                required
                  name="name"
                  type="text"
                  placeholder="Type Full Name"
                  className="input input-bordered w-full max-w-xs mt-2 text-black"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="my-4">
                <label htmlFor="email">Email *</label>
                <input
                required
                  name="email"
                  type="email"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs mt-2 text-black"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="password">Password *</label>
                <input
                required
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full max-w-xs text-black"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <input
                required
                  type="file"
                  // accept="image/*"
                  className="file-input file-input-bordered w-full max-w-xs text-black"
                  onChange={e=>{
                    setFile(e.target.files[0])
                    // setFileName(e.target.files[0].name)
                  }}
                />
                <Modal isOpen={isModalOpen} onClose={closeModal} children={undefined}></Modal>
              </div>
              <div>
                <button
                  className="btn btn-warning w-full"
                  type="submit"
                >
                  Register
                </button>
              </div>
              <div className="text-center mt-3 hover:underline underline-offset-2 hover:cursor-pointer">
                <Link href="/login">
                  <span className="text-orange-400">
                    Already have account ? Log in
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationPage;
