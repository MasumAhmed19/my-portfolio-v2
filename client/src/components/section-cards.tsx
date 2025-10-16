"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProjects } from "@/services/projectService";
import { getBlogs } from "@/services/blogService";


export function SectionCards() {
  const [totalProjects, setTotalProjects] = useState<number>(0);
  const [totalBlogs, setTotalBlogs] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const projectsData = await getProjects();
      const blogsData = await getBlogs();

      if (projectsData?.meta?.total) setTotalProjects(projectsData.meta.total);
      if (blogsData?.meta?.total) setTotalBlogs(blogsData.meta.total);
    }

    fetchData();
  }, []);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      
      {/* Projects Card */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Projects</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalProjects}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <Link
            href="/dashboard/create-project"
            className="flex items-center bg-primary px-2 py-1 gap-2 rounded-sm"
          >
            <PlusCircle className="text-background" size={16} />
            <span className="text-background">Add Project</span>
          </Link>
        </CardFooter>
      </Card>

      {/* Blogs Card */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Blogs</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalBlogs}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <Link
            href="/dashboard/create-blog"
            className="flex items-center bg-primary px-2 py-1 gap-2 rounded-sm"
          >
            <PlusCircle className="text-background" size={16} />
            <span className="text-background">Create a Post</span>
          </Link>
        </CardFooter>
      </Card>

    </div>
  );
}
