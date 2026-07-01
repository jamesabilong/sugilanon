export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Contact</p>
      <h1 className="mt-2 text-3xl font-bold text-zinc-950">Contact PhilWatch</h1>
      <p className="mt-5 text-lg leading-8 text-zinc-700">
        Send article corrections, community announcements, source links, and publishing questions to
        the editorial team. This frontend MVP keeps contact handling static until backend mail or
        ticketing is added.
      </p>
      <a
        className="mt-6 inline-flex bg-zinc-950 px-5 py-3 text-sm font-semibold text-white"
        href="mailto:hello@philwatch.local"
      >
        hello@philwatch.local
      </a>
    </main>
  );
}
