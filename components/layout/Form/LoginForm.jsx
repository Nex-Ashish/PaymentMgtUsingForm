"use client"

import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError("");

      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }

      const res = await fetch('/api/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify( { email, password } )
      })

      const data = await res.json();
      if(!data.success){
        // console.log('failed to get data')
        setError(data.error);
        return;
      }
    //   console.log(data?.user?.email,'get-data')

      if(data?.user?.email == "admin@gmail.com"){
        router.push('/dashboard');
        return
      }

      router.push('/userInfo')
    } catch (error) {
      console.log("failed to login")
    }
  };

  return (
    <div style={{ minHeight: "100vh" }} className="grid place-items-center justify-center bg-red-200 p-4">

      {/* <div className="w-full flex justify-center pt-1 md:pt-4 px-4">
        <div className="bg-white border border-red-300 rounded-xl px-6 py-2 shadow-sm text-center w-full max-w-sm">
          <h2 className="text-md font-semibold text-red-700">For: Admin Case</h2>
          <p className="text-sm text-gray-700">Email: admin@gmail.com</p>
          <p className="text-sm text-gray-700">Password: admin@123</p>
        </div>
      </div> */}
      
      <div className=" bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-10 w-full max-w-sm shadow-sm overflow-hidden">

        <div className="flex flex-col items-center mb-4">
          <h1 className=" text-3xl font-semibold  ">Welcome back</h1>
          <p className="text-base  mt-1">Sign in to your account</p>
        </div>

        {error && (
          <p className="text-red-600 text-sm border rounded-xl bg-red-100 p-1 mb-2">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium tracking-widest text-zinc-400">Email address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e?.target?.value)}
                name="email"
                placeholder="Enter email"
                required
                className="w-full pl-3 pr-3 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg outline-none focus:border-red-500 transition"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium tracking-widest text-zinc-400">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e?.target?.value)}
                name="password"
                placeholder="Enter your password"
                required
                className="w-full pl-3 pr-3 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg outline-none focus:border-red-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 text-sm font-semibold text-white bg-red-700 hover:bg-red-800 active:scale-[0.98] rounded-lg transition tracking-wide"
          >
            Login
          </button>

          <p className="text-center text-sm text-zinc-500">
            Don't have an account?{" "}
            <span
              onClick={() => router.push('/register')}
              className="text-red-700 font-medium border border-red-200 px-2 py-0.5 rounded-full cursor-pointer hover:bg-red-50 transition"
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}