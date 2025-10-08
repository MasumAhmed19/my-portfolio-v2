import { IProject } from "@/types";
import React from "react";
import ProjectFetCard from "./ProjectFetCard";

const FeaturedProjects = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project/`, {
    next: {
      revalidate: 3,
    },
  });

  const data = await res.json();
  const projects: IProject[] =
    data?.data?.filter((p: IProject) => p.isFeatured) || [];

  return (
    <div>
      <div className="max-w-7xl mx-auto flex items-center justify-between text-md px-5 md:px-0 py-[100px]">
        <h2 className="font-medium text-foreground/60 uppercase ">
          Recent Projects
        </h2>
        <h2 className="flex items-center justify-center uppercase">My Works</h2>
      </div>

      <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2  md:px-0 gap-10 ">
        {projects.map((el, idx:number) => (
          <ProjectFetCard key={idx} el={el} index={idx} />
        ))}
      </div>


    </div>
  );
};

export default FeaturedProjects;
