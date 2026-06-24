"use client";

import { FormEvent, useState } from "react";

import { setAdminAuthenticated } from "@/lib/admin-storage";

export function AdminLogin() {
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");

    if (email === "admin@philwatch.local" && password === "admin123") {
      setAdminAuthenticated(true);
      window.location.href = "/admin";
      return;
    }

    setError("Use admin@philwatch.local and admin123 for the frontend MVP.");
  }

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-4 py-12">
      <form onSubmit={onSubmit} className="w-full border border-zinc-200 bg-white p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Admin Login</p>
        <h1 className="mt-2 text-3xl font-bold text-zinc-950">Manage PhilWatch</h1>
        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-medium text-zinc-700">
            Email
            <input name="email" type="email" defaultValue="admin@philwatch.local" className="min-h-12 border border-zinc-300 px-3 text-base text-zinc-950 outline-none focus:border-zinc-950" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-zinc-700">
            Password
            <input name="password" type="password" defaultValue="admin123" className="min-h-12 border border-zinc-300 px-3 text-base text-zinc-950 outline-none focus:border-zinc-950" />
          </label>
          {error ? <p className="text-sm text-red-700">{error}</p> : null}
          <button type="submit" className="min-h-12 bg-zinc-950 px-5 font-semibold text-white hover:bg-emerald-700">
            Log in
          </button>
        </div>
      </form>
    </main>
  );
}
