"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  activeTab: "all" | "featured";
}

export default function BlogTabs({ activeTab }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", value);
    params.set("page", "1"); // reset to first page
    router.push(`/blogs?${params.toString()}`);
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="w-full border-b"
    >
      <TabsList className="p-0 bg-background justify-start rounded-none">
        <TabsTrigger
          value="all"
          className="cursor-pointer  rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-t-0 border-l-0 border-r-0  border-transparent data-[state=active]:border-primary"
        >
          All Blogs
        </TabsTrigger>
        <TabsTrigger
          value="featured"
          className="cursor-pointer  rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-t-0 border-l-0 border-r-0  border-transparent data-[state=active]:border-primary"
        >
          Featured
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
