"use client";
export default function AllBlogsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-[15vh]">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-lg border bg-card p-4 shadow-sm" aria-hidden>
          <div className="mb-3 h-40 w-full rounded-md bg-gray-200/70 animate-pulse" />
          <div className="h-4 w-3/4 rounded bg-gray-200/70 animate-pulse mb-2" />
          <div className="h-3 w-full rounded bg-gray-200/70 animate-pulse mb-1" />
        </div>
      ))}
    </div>
  );
}