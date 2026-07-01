"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { formatDate } from "@/lib/articles";
import { adminApi } from "@/lib/api";
import type { SourceDraft } from "@/types/article";

function hasExtractedContent(draft: SourceDraft) {
  const rawExcerpt = draft.rawExcerpt?.trim() || "";
  if (rawExcerpt.length < 20) return false;
  if (rawExcerpt.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim() === draft.title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()) {
    return false;
  }
  if (draft.sourceId.startsWith("pagasa-") && !rawExcerpt.includes("\n")) {
    return false;
  }
  return true;
}

function contentStatus(draft: SourceDraft) {
  if (draft.article) return "Converted";
  if (draft.status === "converted") return "Article deleted";
  if (draft.status === "ignored") return "Ignored";
  if (hasExtractedContent(draft)) return "Source content ready";
  return "Will re-fetch on convert";
}

function draftStatusClass(draft: SourceDraft) {
  if (draft.article) return "bg-emerald-100 text-emerald-800";
  if (draft.status === "converted") return "bg-red-50 text-red-700";
  if (draft.status === "ignored") return "bg-zinc-100 text-zinc-700";
  return "bg-amber-100 text-amber-800";
}

export function SourceInbox() {
  const [drafts, setDrafts] = useState<SourceDraft[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void loadDrafts();
  }, []);

  async function loadDrafts() {
    try {
      await adminApi.me();
      const result = await adminApi.sourceDrafts();
      setDrafts(result.data);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load source drafts.");
      window.location.href = "/admin/login";
    }
  }

  async function scanSources() {
    setBusy(true);
    setMessage("");
    try {
      const result = await adminApi.scanSources();
      const created = result.results.reduce((sum, item) => sum + Number(item.created || 0), 0);
      setMessage(`Scan complete. New drafts: ${created}.`);
      await loadDrafts();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Source scan failed.");
    } finally {
      setBusy(false);
    }
  }

  async function convertDraft(id: number) {
    setBusy(true);
    try {
      await adminApi.convertSourceDraft(id);
      await loadDrafts();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to convert draft.");
    } finally {
      setBusy(false);
    }
  }

  async function ignoreDraft(id: number) {
    setBusy(true);
    try {
      await adminApi.ignoreSourceDraft(id);
      await loadDrafts();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to ignore draft.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 border-b border-zinc-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Admin</p>
          <h1 className="mt-2 text-3xl font-bold text-zinc-950">Government Source Inbox</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
            Pull PAGASA and PHIVOLCS public updates into reviewable drafts. Nothing is published
            automatically.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={busy}
            onClick={scanSources}
            className="bg-zinc-950 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            Scan Sources
          </button>
          <Link href="/admin" className="border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-700">
            Dashboard
          </Link>
        </div>
      </div>

      {message ? <p className="mt-4 text-sm text-zinc-700">{message}</p> : null}

      <section className="mt-6 overflow-hidden border border-zinc-200 bg-white">
        <div className="divide-y divide-zinc-200">
          {drafts.map((draft) => (
            <article key={draft.id} className="grid gap-4 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-700">
                    {draft.agency}
                  </span>
                  <span className={`px-2.5 py-1 text-xs font-semibold ${draftStatusClass(draft)}`}>
                    {draft.status}
                  </span>
                  <span className="text-sm text-zinc-500">{formatDate(draft.detectedAt)}</span>
                  {draft.category ? <span className="text-sm text-zinc-500">{draft.category.name}</span> : null}
                  <span
                    className={`px-2.5 py-1 text-xs font-semibold ${
                      hasExtractedContent(draft) || draft.article
                        ? "bg-emerald-50 text-emerald-800"
                        : "bg-amber-50 text-amber-800"
                    }`}
                  >
                    {contentStatus(draft)}
                  </span>
                </div>
                <h2 className="mt-2 text-lg font-bold text-zinc-950">{draft.title}</h2>
                <p className="mt-1 max-w-3xl text-sm leading-6 text-zinc-600">{draft.summary}</p>
                <a href={draft.sourceUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-sm font-semibold text-emerald-700">
                  Open source
                </a>
              </div>
              <div className="flex flex-wrap gap-2">
                {draft.article ? (
                  <Link href={`/admin/articles/${draft.article.id}/edit`} className="border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-700">
                    Edit Article
                  </Link>
                ) : null}
                {draft.status === "new" || (draft.status === "converted" && !draft.article) ? (
                  <>
                    <button type="button" disabled={busy} onClick={() => convertDraft(draft.id)} className="border border-emerald-300 px-3 py-2 text-sm font-semibold text-emerald-800 disabled:opacity-60">
                      {draft.status === "converted" ? "Convert Again" : "Convert"}
                    </button>
                    <button type="button" disabled={busy} onClick={() => ignoreDraft(draft.id)} className="border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-700 disabled:opacity-60">
                      Ignore
                    </button>
                  </>
                ) : null}
              </div>
            </article>
          ))}
          {drafts.length === 0 ? (
            <div className="p-8 text-center text-zinc-600">No source drafts yet. Run a scan to check configured sources.</div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
