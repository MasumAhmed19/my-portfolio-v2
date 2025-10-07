import Link from "next/link";
import React from "react";

interface SocialLinkProps {
  icon: React.ElementType; 
  name?: string;
  to?: string;
  iconSize?: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({
  icon: Icon,
  name = "facebook",
  to = "/",
  iconSize = "w-4 h-4",
}) => {
  return (
    <Link
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 text-sm hover:text-primary transition-colors"
    >
      <Icon className={iconSize} />
      <span>{name}</span>
    </Link>
  );
};

export default SocialLink;
