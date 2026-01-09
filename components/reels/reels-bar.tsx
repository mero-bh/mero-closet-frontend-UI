'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

type ReelItem = {
  name: string;
  url: string;
  size?: number;
  mtime?: string;
};

function isVideo(name: string) {
  const n = name.toLowerCase();
  return n.endsWith('.mp4') || n.endsWith('.webm') || n.endsWith('.mov') || n.endsWith('.m4v');
}

function formatBytes(bytes?: number) {
  if (bytes === undefined) return '';
  const units = ['B', 'KB', 'MB', 'GB'];
  let v = bytes;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i += 1;
  }
  const rounded = i === 0 ? Math.round(v).toString() : v.toFixed(1);
  return `${rounded} ${units[i]}`;
}

export function ReelsBar() {
  const backendBase = useMemo(
    () => (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'https://mero-admin.koyeb.app').replace(/\/$/, ''),
    []
  );
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || 'pk_448ea0ce3b5b682802ce8ba6bec567782e3a88a9eec38b5d3693ae4123ce2d31';

  const [items, setItems] = useState<ReelItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState<ReelItem | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function refresh() {
    if (!backendBase) {
      setError('NEXT_PUBLIC_MEDUSA_BACKEND_URL غير مضبوط.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${backendBase}/store/reels`, {
        cache: 'no-store',
        headers: {
          'x-publishable-api-key': publishableKey
        }
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `Failed to fetch reels (${res.status})`);
      }
      const data = await res.json();
      setItems(Array.isArray(data?.items) ? data.items : []);
    } catch (e: any) {
      setError(e?.message || 'فشل تحميل الريلز');
    } finally {
      setLoading(false);
    }
  }

  async function uploadFile(file: File) {
    if (!backendBase) {
      setError('NEXT_PUBLIC_MEDUSA_BACKEND_URL غير مضبوط.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch(`${backendBase}/store/reels/upload`, {
        method: 'POST',
        headers: {
          'x-publishable-api-key': publishableKey
        },
        body: form
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || `Upload failed (${res.status})`);
      }
      await refresh();
    } catch (e: any) {
      setError(e?.message || 'فشل رفع الملف');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="mx-auto w-full max-w-screen-2xl px-4 pt-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Reels</div>
          <div className="text-xs opacity-70">رفع صور/فيديو (مثل ريلز) وعرضهم في شريط علوي.</div>
        </div>

        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void uploadFile(f);
              e.currentTarget.value = '';
            }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-full border px-4 py-2 text-sm hover:opacity-80"
            disabled={loading}
          >
            {loading ? 'جاري...' : 'أنزل ريل 📥'}
          </button>
        </div>
      </div>

      {error ? (
        <div className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm">{error}</div>
      ) : null}

      <div className="mt-4">
        <div className="flex gap-3 overflow-x-auto pb-3">
          {items.map((it) => (
            <button
              key={it.name}
              type="button"
              onClick={() => setActive(it)}
              className="group relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border hover:opacity-90"
              title={it.name}
            >
              {isVideo(it.name) ? (
                <video
                  src={it.url}
                  className="h-full w-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={it.url} alt={it.name} className="h-full w-full object-cover" />
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black/45 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                {formatBytes(it.size)}
              </div>
            </button>
          ))}

          {!loading && items.length === 0 ? (
            <div className="text-sm opacity-70 py-6">ما فيه ريلز للحين—اضغط “أنزل ريل” 👆</div>
          ) : null}
        </div>
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 text-white">
              <div className="truncate text-sm">{active.name}</div>
              <div className="flex items-center gap-2">
                <a
                  href={active.url}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs hover:opacity-80"
                  download
                >
                  Download
                </a>
                <button
                  type="button"
                  className="rounded-full border border-white/20 px-3 py-1 text-xs hover:opacity-80"
                  onClick={() => setActive(null)}
                >
                  Close
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center bg-black">
              {isVideo(active.name) ? (
                <video src={active.url} controls className="max-h-[75vh] w-full" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={active.url} alt={active.name} className="max-h-[75vh] w-full object-contain" />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
