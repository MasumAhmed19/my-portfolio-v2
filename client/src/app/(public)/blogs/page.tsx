import AllBlogs from "@/components/modules/Blogs/AllBlogs";
import AllBlogsSkeleton from "@/components/modules/Blogs/AllBlogsSkeleton";
import React, { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    type?: "all" | "featured";
  }>;
}

export const revalidate = 60;

export const metadata = {
  title: "All Blogs | Masum’s Portfolio",
  description:
    "Browse all my latest tech blogs and insights on web development.",
};

const AllBlogsPage = async ({ searchParams }: PageProps) => {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={<AllBlogsSkeleton />}>
          <AllBlogs searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
};

export default AllBlogsPage;
