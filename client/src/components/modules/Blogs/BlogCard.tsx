import Link from "next/link";
import Image from "next/image";
import { IBlog } from "@/types";
import { Eye, Bookmark, MoreHorizontal, Calendar } from "lucide-react";

interface IProps {
  post: IBlog;
}

export default function BlogCard({ post }: IProps) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border/40 pb-6 transition-all duration-300"
    >
      {/* Left side: Text */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg sm:text-xl font-semibold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-muted-foreground mt-2 text-sm sm:text-base line-clamp-2">
          {post.description}
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-primary" />
            <span>
              {new Date(post.createdAt).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>
              {post.views >= 1000
                ? (post.views / 1000).toFixed(1) + "K"
                : post.views}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Bookmark className="w-4 h-4 cursor-pointer hover:text-blue-600" />
            <MoreHorizontal className="w-4 h-4 cursor-pointer hover:text-blue-600" />
          </div>
        </div>
      </div>

      {/* Right side: Image */}
      {post.images?.[0] && (
        <div className="relative w-full sm:w-32 md:w-36 h-48 sm:h-28 md:h-32 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
          <Image
            src={post.images[0]}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
    </Link>
  );
}
