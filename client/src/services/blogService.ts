import apiClient from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/lib/constants";
import { handleApiError } from "@/lib/helpers";
import { IBlog } from "@/types";

interface GetBlogsParams {
  page?: number;
  limit?: number;
  isFeatured?: boolean;
  tags?: string[];
}
type BlogResponse = {
  data: IBlog[];
  meta: { page: number; limit: number; total: number; totalPages: number };
};

export async function getBlogs({
  page = 1,
  limit = 6,
  isFeatured,
  tags,
}: GetBlogsParams={}): Promise<BlogResponse | null> {
  try {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("limit", limit.toString());

    if (typeof isFeatured === "boolean") {
      params.set("isFeatured", String(isFeatured));
    }

    if (tags && tags.length > 0) {
      params.set("tags", tags.join(","));
    }

    // console.log(params)

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post/?${params.toString()}`,
      {
        signal: controller.signal,
        next: { revalidate: 60 }, 
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await response.json();
    return {
      data: data.data,
      meta: data.meta,
    };
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return null;
  }
}

export async function getSingleBlog(slug: string): Promise<IBlog | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post/${slug}`,
      {
        signal: controller.signal,
        cache: "no-store",
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return null;
  }
}

export const createBlog = async (payload: Partial<IBlog>) => {
  try {
    const { data } = await apiClient.post(API_ENDPOINTS.BLOG, payload);
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateBlog = async (slug: string, payload: Partial<IBlog>) => {
  try {
    const { data } = await apiClient.patch(
      `${API_ENDPOINTS.BLOG}/${slug}`,
      payload
    );
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteBlog = async (slug: string) => {
  try {
    const { data } = await apiClient.delete(`${API_ENDPOINTS.BLOG}/${slug}`);
    return data;
  } catch (error) {
    handleApiError(error);
  }
};
