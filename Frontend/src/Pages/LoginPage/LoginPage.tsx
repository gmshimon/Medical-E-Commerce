"Use Client"
"use client"
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useState } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
  function handSubmitForm(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
     // Collect form data
     const formData = {
        email,
        password,
      };
  
      console.log(formData);
  }

  return (
    <section className="flex items-center justify-center min-h-screen ">
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
            <h1 className="text-4xl font-bold text-center">Login</h1>
            <form className="pr-5 w-full" onSubmit={handSubmitForm}>
              <div className="my-4">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs mt-2"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full max-w-xs"
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
                <Link href="/register">
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