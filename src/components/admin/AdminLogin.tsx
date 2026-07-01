"use client";

import { FormEvent, useState } from "react";

import { adminApi } from "@/lib/api";

export function AdminLogin() {
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const username = String(form.get("username") || "");
    const password = String(form.get("password") || "");

    try {
      await adminApi.login(username, password);
      window.location.href = "/admin";
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed.");
    }
  }

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-4 py-12">
      <form onSubmit={onSubmit} className="w-full border border-zinc-200 bg-white p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Admin Login</p>
        <h1 className="mt-2 text-3xl font-bold text-zinc-950">Manage PhilWatch</h1>
        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-medium text-zinc-700">
            Username
            <input name="username" type="text" autoComplete="username" className="min-h-12 border border-zinc-300 px-3 text-base text-zinc-950 outline-none focus:border-zinc-950" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-zinc-700">
            Password
            <input name="password" type="password" autoComplete="current-password" className="min-h-12 border border-zinc-300 px-3 text-base text-zinc-950 outline-none focus:border-zinc-950" />
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
