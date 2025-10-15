import { getBlogs } from "@/services/blogService";
import BlogCard from "./BlogCard";
import BlogTabs from "./BlogTabs";
import BlogPagination from "./BlogPaginations";

interface SearchParams {
  page?: string;
  type?: "all" | "featured";
}

const AllBlogs = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
  // Await searchParams before accessing properties
  const resolvedParams = await searchParams;
  
  const page = Number(resolvedParams.page) || 1;
  const type = resolvedParams.type || "all";

  const isFeatured = type === "featured" ? true : undefined;

  const response = await getBlogs({
    page,
    limit: 8,
    isFeatured,
  });

  const blogs = response?.data || [];
  const meta = response?.meta;

  // console.log(blogs);

  return (
    <section className="max-w-7xl mx-auto py-35 px-6 flex flex-col gap-10 ">
      <BlogTabs activeTab={type} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {blogs.map((blog, i) => (
          <BlogCard key={i} post={blog} />
        ))}
      </div>
      {meta && (
        <BlogPagination
          currentPage={meta.page}
          totalPages={meta.totalPages}
          type={type}
        />
      )}
    </section>
  );
};

export default AllBlogs;