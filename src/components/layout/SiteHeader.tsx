import Link from "next/link";

import { categories } from "@/lib/articles";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-2xl font-bold text-zinc-950">
            PhilWatch
          </Link>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-zinc-700">
            <Link className="hover:text-emerald-700" href="/">Home</Link>
            <Link className="hover:text-emerald-700" href="/search">Search</Link>
            <Link className="hover:text-emerald-700" href="/about">About</Link>
            <Link className="hover:text-emerald-700" href="/contact">Contact</Link>
            <Link className="hover:text-emerald-700" href="/admin/login">Admin</Link>
          </nav>
        </div>
        <nav className="flex gap-2 overflow-x-auto pb-1 text-sm">
          {categories.slice(0, 6).map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="shrink-0 border border-zinc-200 px-3 py-2 text-zinc-700 transition hover:border-emerald-700 hover:text-emerald-700"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
