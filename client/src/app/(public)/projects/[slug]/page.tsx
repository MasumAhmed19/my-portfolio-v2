import {
  getAllProjectSlugs,
  getSingleProject,
} from "@/services/projectService";
import React from "react";
import { ExternalLink, Github } from "lucide-react";
import VideoPlayer from "@/components/shared/VideoPlayer";
import Image from "next/image";

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  // console.log(slugs)
  return slugs.map((slug) => ({ slug }));
}

export default async function SingleProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const project = await getSingleProject(slug);
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Project not found.
      </div>
    );
  }

  return (
    <article className="pt-[14vh] pb-20">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-5">
        {/* Title */}
        <h1 className="text-4xl font-semibold text-foreground mb-4 leading-tight tracking-tight">
          {project.title}
        </h1>

        {/* Description */}
        <p className="text-md leading-relaxed text-foreground/80 font-[400] mb-10">
          {project.description}
        </p>

      {project.video ? (
        <VideoPlayer
          src={project.video}
          autoPlay
          loop
          muted
          playbackRate={1.25}
          className="w-full h-auto rounded-lg shadow-lg"
          disableFallback
        />
      ) : (
        project.images && project.images.length > 0 && (
          <div className="mb-12 rounded-lg overflow-hidden h-[60vh]">
            <Image
              src={project.images[0]}
              alt={project.title}
              width={800}
              height={350}
              className="w-full h-full object-cover object-center"
              priority
            />
          </div>
        )
      )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12 mt-10">
          {project.tags?.map((tag: string) => (
            <span
              key={tag}
              className="text-sm px-3 py-1 bg-gray-100 text-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 mb-16">
          <a
            href={project.liveLink!}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-background rounded-full text-sm"
          >
            <ExternalLink size={16} />
            Live Demo
          </a>
          <a
            href={project.githubLink!}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-foreground rounded-full text-sm text-foreground hover:bg-primary hover:border-primary hover:text-background  transition"
          >
            <Github size={16} />
            GitHub
          </a>
        </div>

        {/* Optional: Additional images */}
        {project.images?.length > 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            {project.images.slice(1).map((img: string, idx: number) => (
              <img
                key={idx}
                src={img}
                alt={`${project.title} image ${idx + 1}`}
                className="w-full rounded-xl shadow-sm"
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export const revalidate = 180;
