export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">About</p>
      <h1 className="mt-2 text-3xl font-bold text-zinc-950">About PhilWatch</h1>
      <div className="mt-5 grid gap-4 text-lg leading-8 text-zinc-700">
        <p>
          PhilWatch is a clean publishing front for Philippine community updates, local news
          summaries, guides, announcements, and public-interest explainers.
        </p>
        <p>
          The editorial goal is simple: use original wording, link to source material when
          applicable, and separate verified facts from opinion or commentary.
        </p>
      </div>
    </main>
  );
}
