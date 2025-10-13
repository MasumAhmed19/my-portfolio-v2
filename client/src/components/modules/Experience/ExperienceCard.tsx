import { IExperiece } from "@/types";
import Image from "next/image";
import React from "react";
import { ExternalLink, Linkedin } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface IProps {
  el: IExperiece;
}

const ExperienceCard = ({ el }: IProps) => {
  // console.log(el)
  return (
    <div className="flex flex-col gap-4 rounded-2xl mt-10 bg-background">
      <div className="flex items-center gap-5">
        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
          <Image
            src={el.images?.[0] || "/placeholder.png"}
            alt={`${el.companyName} logo`}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h3 className="text-base font-semibold text-foreground">
            {el.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {el.companyName} • {el.jobType}
          </p>
          <span className="text-xs text-foreground/60">
            {el.startDate} – {el.EndDate}
          </span>
        </div>
      </div>

      {/* Description */}
      {el.description && (
        <div className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              ul: ({ children }) => (
                <ul className="list-disc pl-5 space-y-1">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-5 space-y-1">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="text-foreground/90">{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold">{children}</strong>
              ),
            }}
          >
            {el.description}
          </ReactMarkdown>
        </div>
      )}

      {/* Tags */}
      {el.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {el.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs px-3 py-1 bg-primary/40 text-secondary-foreground  rounded-full capitalize"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Links (Optional) */}
      {(el.weblink || el.linkedIn) && (
        <div className="flex gap-3 mt-2">
          {el.weblink && (
            <a
              href={el.weblink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <ExternalLink size={14} />
              Website
            </a>
          )}
          {el.linkedIn && (
            <a
              href={el.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <Linkedin size={14} />
              LinkedIn
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ExperienceCard;
