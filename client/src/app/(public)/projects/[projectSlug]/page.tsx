import { IProject } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface ProjectPageProps {
  params: { projectSlug: string };
}

const fetchProject = async (projectSlug: string): Promise<IProject | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/project/${projectSlug}`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch project");

    return res.json();
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
};

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const project = await fetchProject(params.projectSlug);

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center text-muted-foreground">
        <h2 className="text-2xl font-semibold">Project not found</h2>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 md:px-6 py-10">
      {/* Title Section */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold mb-3 leading-tight">
          {project.title}
        </h1>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1 bg-primary/40 text-secondary-foreground rounded-full capitalize"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {project.views && (
          <p className="text-sm text-muted-foreground mt-4">
            {project.views} views • by{" "}
            <span className="text-foreground font-medium">Masum Ahmed</span>
          </p>
        )}
      </header>

      {/* Video Section */}
      {project.video && (
        <div className="w-full mb-10">
          <video
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            controls
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Description */}
      {project.description && (
        <section className="prose prose-neutral dark:prose-invert max-w-none text-justify leading-relaxed">
          <p className="text-lg text-foreground mb-6">{project.description}</p>
        </section>
      )}

      {/* Image Gallery */}
      {project.images && project.images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
          {project.images.map((img, idx) => (
            <div key={idx} className="relative w-full h-64 md:h-80">
              <Image
                src={img}
                alt={`${project.title} image ${idx + 1}`}
                fill
                className="object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
      )}

      {/* Links */}
      {(project.liveLink || project.githubLink) && (
        <footer className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-10 border-t border-border pt-6">
          {project.liveLink && (
            <Link
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-primary hover:text-muted-foreground transition-colors border-b border-primary hover:border-muted-foreground"
            >
              View Live →
            </Link>
          )}
          {project.githubLink && (
            <Link
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub →
            </Link>
          )}
        </footer>
      )}
    </article>
  );
};

export default ProjectPage;