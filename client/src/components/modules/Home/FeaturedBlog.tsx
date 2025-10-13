import { getBlogs } from "@/services/blogService";
import BlogCard from "../Blogs/BlogCard";

const FeaturedBlog = async () => {
  const response = await getBlogs({ limit: 4, page: 1, isFeatured: true });
  const blogs = response?.data || [];

  // console.log(response)

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-6">
        {/* Section Header */}
        <div className="flex items-center justify-between text-md">
          <h2 className="font-medium text-foreground/60 uppercase ">
            Blog
          </h2>
          <h2 className="flex items-center justify-center uppercase">
            Sharing my learnings
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {blogs.map((blog, index) => (
            <BlogCard key={index} post={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlog;
