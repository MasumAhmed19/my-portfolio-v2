"use client";

import React from "react";

export default function ProjectLoadingSkeleton({
  count = 6,
}: {
  count?: number;
}) {
  return (
    <div className="py-6 mt-[12vh]">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <article
            key={i}
            className="rounded-lg border bg-card p-4 shadow-sm"
            aria-busy="true"
            aria-label="loading project"
          >
            <div className="mb-3 h-40 w-full rounded-md bg-gray-200/70 dark:bg-gray-700 animate-pulse" />
            <div className="h-4 w-3/4 rounded bg-gray-200/70 dark:bg-gray-700 animate-pulse mb-2" />
            <div className="h-3 w-full rounded bg-gray-200/70 dark:bg-gray-700 animate-pulse mb-1" />
            <div className="h-3 w-5/6 rounded bg-gray-200/70 dark:bg-gray-700 animate-pulse" />
            <div className="mt-3 flex gap-2">
              <span className="h-6 w-16 rounded bg-gray-200/70 dark:bg-gray-700 animate-pulse" />
              <span className="h-6 w-12 rounded bg-gray-200/70 dark:bg-gray-700 animate-pulse" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}