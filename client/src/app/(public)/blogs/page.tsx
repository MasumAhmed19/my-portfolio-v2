import AllBlogs from '@/components/modules/Blogs/AllBlogs'
import React from 'react'

interface PageProps {
  searchParams: Promise<{
    page?: string;
    type?: "all" | "featured";
  }>;
}

const AllBlogsPage = async ({ searchParams }: PageProps) => {
  return (
    <section className=''>
      <div className='max-w-7xl mx-auto'>
        <AllBlogs searchParams={searchParams} />
      </div>
    </section>
  )
}

export default AllBlogsPage