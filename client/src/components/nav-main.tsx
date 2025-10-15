"use client"

import { type Icon } from "@tabler/icons-react"
import {
  SidebarGroup,

  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {

  const pathname = usePathname();

  return (
   <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url;
          const Icon = item.icon;

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={cn(
                  "transition-colors",
                  isActive && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-background"
                )}
              >
                <Link href={item.url}>
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
