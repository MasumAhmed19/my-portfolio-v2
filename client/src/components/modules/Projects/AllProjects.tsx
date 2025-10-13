"use client";

import { IProject } from "@/types";
import React, { useEffect, useState } from "react";
import ProjectFetCard from "../Home/ProjectFetCard";

const AllProjects = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/project/?limit=10&page=1`
        );
        const data = await res.json();
        setProjects(data?.data || []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-[200px] flex justify-center">
        <div className="text-center">Loading projects...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto py-[200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 md:px-0 gap-10">
          {projects.map((el, idx: number) => (
            <ProjectFetCard key={idx} el={el} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProjects;