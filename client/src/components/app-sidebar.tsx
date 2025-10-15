"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconFileAi,
  IconFileDescription,
  IconFilePlus,
  IconFileText,
  IconHelp,
  IconHome,
  IconListDetails,
  IconPlus,
  IconReport,
  IconSearch,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {  LogOutIcon } from "lucide-react";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

const data = {
  user: {
    name: "Masum Ahmed",
    email: "masum.ahmed1328@gmail.com",
    avatar: "https://i.ibb.co.com/KjN8t2q7/bw.jpg",
  },
  navMain: [
    {
      title: "Quick Action",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "All Blog",
      url: "/dashboard/all-blogs",
      icon: IconListDetails,
    },
    {
      title: "Create Blog",
      url: "/dashboard/create-blog",
      icon: IconFilePlus,
    },
    {
      title: "All Project",
      url: "/dashboard/all-projects",
      icon: IconChartBar,
    },
    {
      title: "Create Project",
      url: "/dashboard/create-project",
      icon: IconPlus,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  mainSiteNav: [
    {
      name: "Home",
      url: "/",
      icon: IconHome, // better than Database for "Home"
    },
    {
      name: "Projects",
      url: "/projects",
      icon: IconReport, // FileReport or Clipboard could also work
    },
    {
      name: "Blogs",
      url: "/blogs",
      icon: IconFileText, // FileText is perfect for blogs/articles
    },
    {
      name: "About",
      url: "/about",
      icon: IconUser, // User icon makes sense for "About"
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  
  const handleLogout = async () => {
    toast.loading("Logging out...");
    await signOut({ redirect: false });
    toast.dismiss();
    toast.success("Logged out successfully!");
    window.location.href = "/";
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard">
                <span className="text-base font-semibold">
                  Masum's Dashboard
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.mainSiteNav} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
        <div className="mt-auto">
          <button onClick={handleLogout} className="flex items-center gap-2 pl-4 cursor-pointer  py-2">
            <LogOutIcon size={20} /> <span className="text-sm">Logout</span>
          </button>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
