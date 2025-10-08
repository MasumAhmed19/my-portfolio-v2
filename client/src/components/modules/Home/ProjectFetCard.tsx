'use client'

import { IProject } from '@/types'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import VideoPlayer from '@/components/shared/VideoPlayer'
import { cn } from '@/lib/utils'

interface ProjectFetCardProps {
  el: IProject
  index: number
}

const ProjectFetCard = ({ el, index }: ProjectFetCardProps) => {
  return (
    <div className={cn("w-full mx-auto group", index % 2 === 1 && "pt-10")}>
      <div className="px-5 md:px-0">
        {/* Media Section - Clickable */}
        <div className="mb-5 relative overflow-hidden rounded-lg cursor-pointer">
          <Link href={`/projects/`} className="block relative w-full transition-transform duration-300 group-hover:scale-[1.02]">
            {el.video ? (
              <VideoPlayer 
                src={el.video} 
                autoPlay 
                loop 
                muted 
                playbackRate={1.25}
                className="w-full h-auto rounded-lg shadow-lg"
                disableFallback
              />
            ) : (
              <Image
                src={el.images[0]}
                alt={el.title}
                width={800}
                height={500}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            )}
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-lg pointer-events-none" />
          </Link>
        </div>

        {/* Content Section */}
        <div className="space-y-4 text-center md:text-left">
          {/* Title + Links */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Link href={`/projects/`}>
              <h3 className="text-2xl font-medium text-foreground group-hover:text-muted-foreground transition-colors cursor-pointer">
                {el.title}
              </h3>
            </Link>

            <div className="flex flex-wrap justify-center md:justify-end items-center gap-4">
              {el.liveLink && (
                <Link 
                  href={el.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-primary hover:text-muted-foreground transition-colors border-b border-primary hover:border-muted-foreground"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Live
                </Link>
              )}
              {el.githubLink && (
                <Link 
                  href={el.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  GitHub →
                </Link>
              )}
            </div>
          </div>

          {/* Tags */}
          {el.tags && el.tags.length > 0 && (
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {el.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="text-xs px-3 py-1 bg-primary/40 text-secondary-foreground rounded-full capitalize"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectFetCard