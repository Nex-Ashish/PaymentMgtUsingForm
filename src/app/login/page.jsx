"use client"

import { useRouter } from 'next/navigation';
import { useState } from "react";

const adminData = {
  "email": "admin@gmail.com",
  "password": "admin@123",
}

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (email === adminData?.email && password === adminData?.password) {
      router.push('/dashboard');
      return;
    }

    if (!storedUser || storedUser.email !== email) {
      setError("User not found, please register");
      return;
    }

    if (storedUser.password !== password) {
      setError("Incorrect password");
      return;
    }

    router.push('/userInfo');
  };

  return (
    <div style={{ minHeight: "100vh" }} className="flex items-center justify-center bg-red-200 p-4">
      
      <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-10 w-full max-w-sm shadow-sm overflow-hidden">
        
        <div className="flex flex-col items-center mb-4">
          <h1 className=" text-3xl font-semibold  ">Welcome back</h1>
          <p className="text-base  mt-1">Sign in to your account</p>
        </div>

        {error && (
          <p className="text-red-600 text-sm border rounded-xl bg-red-100 p-1 mb-2">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium uppercase tracking-widest text-zinc-400">Email address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e?.target?.value)}
                name="email"
                placeholder="Enter email"
                required
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg outline-none focus:border-red-500 transition"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium uppercase tracking-widest text-zinc-400">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e?.target?.value)}
                name="password"
                placeholder="Enter your password"
                required
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg outline-none focus:border-red-500 transition"
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