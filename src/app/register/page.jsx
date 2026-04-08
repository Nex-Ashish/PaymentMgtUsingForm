"use client"

import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("")

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== cPassword) {
      setError("Passwords do not match!");
      return;
    }

    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser && existingUser?.email === email) {
      setError("User already exists, please login");
      return;
    }

    const userData = { name, email, password };
    localStorage.setItem("user", JSON.stringify(userData));
    alert("Registration successful!");
    router.push('/login');
  };

  return (
    <div style={{ minHeight: "100vh" }} className="flex items-center justify-center bg-red-200 p-4">
      
      <div className="bg-white  rounded-2xl p-9 w-full max-w-sm">

        <div className="text-center mb-4">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">Create an account</h1>
        </div>

        {error && (
          <p className="text-red-600 text-sm border rounded-xl bg-red-100 p-1 mb-2">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-zinc-400">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e?.target?.value)}
              name="name"
              placeholder="Enter name"
              required
              className="w-full px-3 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-zinc-400">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e?.target?.value)}
              name="email"
              placeholder="Enter email"
              required
              className="w-full px-3 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-zinc-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="Enter password"
              required
              className="w-full px-3 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-zinc-400">Confirm Password</label>
            <input
              type="password"
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
              name="cPassword"
              placeholder="Confirm password"
              required
              className="w-full px-3 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 text-sm font-semibold text-white bg-red-700 hover:bg-red-800 active:scale-[0.98] rounded-lg transition tracking-wide mt-1"
          >
            Register
          </button>

          <p className="text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <span
              onClick={() => router.push('/login')}
              className="text-red-700 font-medium border border-red-200 px-2 py-0.5 rounded-full cursor-pointer hover:bg-red-50 transition"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}