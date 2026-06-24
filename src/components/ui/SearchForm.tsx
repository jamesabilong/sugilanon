export function SearchForm({ defaultValue = "" }: { defaultValue?: string }) {
  return (
    <form action="/search" className="flex w-full flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor="site-search">
        Search articles
      </label>
      <input
        id="site-search"
        name="q"
        defaultValue={defaultValue}
        placeholder="Search title, tag, category, or topic"
        className="min-h-12 flex-1 border border-zinc-300 bg-white px-4 text-base text-zinc-950 outline-none transition focus:border-zinc-950"
      />
      <button type="submit" className="min-h-12 bg-zinc-950 px-6 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-emerald-700">
        Search
      </button>
    </form>
  );
}
