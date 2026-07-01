import type { EarthquakeFeed } from "@/types/article";

type EarthquakeWatchProps = {
  feed: EarthquakeFeed | null;
};

export function EarthquakeWatch({ feed }: EarthquakeWatchProps) {
  const latest = feed?.data.slice(0, 5) || [];

  return (
    <section className="border border-zinc-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-red-700">
            Earthquake Watch
          </p>
          <h2 className="mt-1 text-lg font-bold text-zinc-950">Latest PHIVOLCS Events</h2>
        </div>
        {feed ? (
          <a
            href={feed.source.url}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
          >
            PHIVOLCS
          </a>
        ) : null}
      </div>

      {latest.length ? (
        <div className="mt-4 grid gap-4">
          {latest.map((item) => (
            <article key={item.id} className="border-t border-zinc-100 pt-4 first:border-t-0 first:pt-0">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-2xl font-bold text-red-700">M {item.magnitude || "--"}</p>
                <p className="text-right text-xs font-medium text-zinc-500">{item.dateTime}</p>
              </div>
              <h3 className="mt-2 text-sm font-semibold leading-6 text-zinc-950">
                {item.location || item.title}
              </h3>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-zinc-600">
                <span>Depth: {item.depthKm ? `${item.depthKm} km` : "N/A"}</span>
                <span>
                  {item.latitude && item.longitude
                    ? `${item.latitude} N, ${item.longitude} E`
                    : "Coordinates N/A"}
                </span>
              </div>
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Official bulletin
              </a>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm leading-6 text-zinc-600">
          Latest PHIVOLCS earthquake data is temporarily unavailable.
        </p>
      )}
    </section>
  );
}
