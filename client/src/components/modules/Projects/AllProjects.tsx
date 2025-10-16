import { IProject } from "@/types";
import ProjectFetCard from "../Home/ProjectFetCard";

export const dynamic = "force-dynamic"; 

async function getProjects(): Promise<IProject[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project/?limit=10&page=1`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data?.data || [];
}

export default async function AllProjects() {
  const projects = await getProjects();

  return (
    <div className="max-w-7xl mx-auto py-[180px] px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {projects.map((el, idx) => (
          <ProjectFetCard key={el.slug} el={el} index={idx} />
        ))}
      </div>
    </div>
  );
}
