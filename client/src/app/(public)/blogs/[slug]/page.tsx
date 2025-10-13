import { getSingleBlog } from "@/services/blogService";
import Image from "next/image";
import React from "react";
import { Calendar, Eye, Tag } from "lucide-react";
import JsonbRenderer from "@/components/shared/JsonbRenderer";

// Force dynamic rendering
export const dynamic = "force-dynamic";

const SingleBlogPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params; 
  const response = await getSingleBlog(slug);
  const blog = response;

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center">
        <h1 className="text-2xl text-muted-foreground">Blog not found</h1>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 py-[150px]">
      {/* Header */}
      <header className="mb-8 border-b border-border pb-8">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight">
          {blog.title}
        </h1>

        {/* Description */}
        <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
          {blog.description}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <time dateTime={new Date(blog.createdAt).toISOString()}>
              {formatDate(blog.createdAt.toString())}
            </time>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>{blog.views} views</span>
          </div>
          {blog.isFeatured && (
            <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
              Featured
            </span>
          )}
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Tag className="w-4 h-4 text-muted-foreground" />
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Featured Image */}
      {blog.images && blog.images.length > 0 && (
        <div className="mb-12 rounded-lg overflow-hidden h-[60vh]">
          <Image
            src={blog.images[0]}
            alt={blog.title}
            width={800}
            height={350}
            className="w-full h-full object-cover object-center"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
       <JsonbRenderer content={blog.content} />
      </div>

      {/* Additional Images Gallery */}
      {blog.images && blog.images.length > 1 && (
        <div className="mt-12 border-t border-border pt-8">
          <h2 className="text-2xl font-bold mb-6">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {blog.images.slice(1).map((image, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`${blog.title} - Image ${index + 2}`}
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-border">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Last updated: {formatDate(blog.updatedAt.toString())}
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm hover:bg-secondary/80 transition-colors">
              Share
            </button>
            <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm hover:bg-secondary/80 transition-colors">
              Bookmark
            </button>
          </div>
        </div>
      </footer>
    </article>
  );
};

export default SingleBlogPage;
