"Use Client";
"use client";
import { loginUser, reset } from "@/lib/features/userSlice";
import { RootState } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { redirect } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const {isLoginSuccess,isLoginError,errorMessage}=useSelector((state:RootState)=>state.user)
  const [email, setEmail] = useState<string>("");
  const [pass, setPassword] = useState<string>("");

  const dispatch = useDispatch()
  useEffect(()=>{
    if(isLoginSuccess){
      toast.success("Login success");
      dispatch(reset())
      redirect('/')
    }
    if(isLoginError){
      toast.error(errorMessage);
      dispatch(reset())
    }
  },[isLoginSuccess,isLoginError])

  function handSubmitForm(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    // Collect form data
    const formData = {
      email,
      pass,
    };
    dispatch(loginUser(formData));
  }

  return (
    <section className="flex items-center justify-center min-h-screen ">
     {/* <ToastContainer position="top-right"/> */}
      <div className="lg:h-[650px] h-full w-full max-w-full rounded-lg shadow-md bg-black text-white">
        <div className="h-full flex flex-col lg:flex-row justify-around items-center">
          <div className="w-full lg:w-1/2">
          <ToastContainer position="top-right"/>
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
            <h1 className="text-4xl font-bold text-center">Login</h1>
            <form className="pr-5 w-full" onSubmit={handSubmitForm}>
              <div className="my-4">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs mt-2 text-black"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full max-w-xs text-black"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <button
                  // disabled={disabled}
                  className="btn btn-warning w-full"
                  type="submit"
                >
                  Login
                </button>
              </div>
              <div className="text-center mt-3 hover:underline underline-offset-2 hover:cursor-pointer">
                <Link href="/registration">
                  <span className="text-orange-400">
                    New here? Create a New Account
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

export default LoginPage;
