import EditProjectForm from "@/components/modules/Projects/EditProjectForm";
import { getSingleProject } from "@/services/projectService";
import React from "react";

export const dynamic = "force-dynamic";

const EditProject = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const response = await getSingleProject(slug);
  const project = response;

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center">
        <h1 className="text-2xl text-muted-foreground">Project not found</h1>
      </div>
    );
  }

  return (
    <div className="py-8">
        <EditProjectForm project={project} />
    </div>
  );
};

export default EditProject;