import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-950 text-zinc-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_1fr] lg:px-8">
        <div>
          <p className="text-xl font-bold text-white">PhilWatch</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
            Philippine community updates, public-interest explainers, local guides, and responsible news summaries.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link className="hover:text-white" href="/about">About</Link>
          <Link className="hover:text-white" href="/contact">Contact</Link>
          <Link className="hover:text-white" href="/admin/login">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
