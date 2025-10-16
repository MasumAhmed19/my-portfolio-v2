import EditBlogForm from "@/components/modules/Blogs/EditBlogForm";
import { getSingleBlog } from "@/services/blogService";
import React from "react";

export const dynamic = "force-dynamic";

const EditBlog = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const response = await getSingleBlog(slug);
  const blog = response;

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center">
        <h1 className="text-2xl text-muted-foreground">Blog not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <EditBlogForm blog={blog} />
    </div>
  );
};

export default EditBlog;