"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavMenuProps extends NavigationMenuProps {
  isAuthenticated?: boolean;
  orientation?: "horizontal" | "vertical";
}

const navLinks = [
  { name: "Home", href: "/", protected: false },
  { name: "Projects", href: "/projects", protected: false },
  { name: "About", href: "/about", protected: false },
  { name: "Blogs", href: "/blogs", protected: false },
  { name: "Dashboard", href: "/dashboard", protected: true },
];

export const NavMenu = ({ 
  isAuthenticated = false, 
  orientation = "horizontal",
  className,
  ...props 
}: NavMenuProps) => {
  const isVertical = orientation === "vertical";
  
  return (
    <NavigationMenu orientation={orientation} className={className} {...props}>
      <NavigationMenuList className={cn(
        "font-medium",
        isVertical 
          ? "flex-col items-start space-y-1 w-full" 
          : "gap-6 space-x-0"
      )}>
        {navLinks
          .filter((link) => !link.protected || isAuthenticated)
          .map((link) => (
            <NavigationMenuItem 
              key={link.href} 
              className={cn(isVertical && "w-full")}
            >
              <NavigationMenuLink asChild>
                <Link 
                  href={link.href}
                  className={cn(
                    isVertical && "block w-full py-3 px-4 rounded-md hover:bg-accent transition-colors text-base"
                  )}
                >
                  {link.name}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
