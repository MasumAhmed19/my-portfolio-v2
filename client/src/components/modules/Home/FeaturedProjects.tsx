import { getProjects } from "@/services/projectService";
import ProjectFetCard from "./ProjectFetCard";

export default async function FeaturedProjects() {
  const projects = await getProjects();

  if (!projects.length) {
    return <div className="text-center py-10">No projects available</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-20 ">
      <div className="flex items-center justify-between text-md pb-15">
        <h2 className="font-medium text-foreground/60 uppercase ">Blog</h2>
        <h2 className="flex items-center justify-center uppercase">
          Sharing my learnings
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        {projects.map((project, index) => (
          <ProjectFetCard
            key={project.id || index}
            el={project}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
