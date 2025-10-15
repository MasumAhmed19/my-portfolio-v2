/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/lib/constants";
import { handleApiError } from "@/lib/helpers";
import { IProject } from "@/types";

interface GetProjectsParams {
  page?: number;
  limit?: number;
  isFeatured?: boolean;
  tags?: string[];
}

type ProjectResponse = {
  data: IProject[];
  meta: { page: number; limit: number; total: number; totalPages: number };
};

// For public/homepage use - gets featured projects
export async function getFeaturedProjects(): Promise<IProject[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/project/?limit=4&page=1&isFeatured=true`,
      {
        signal: controller.signal,
        next: { revalidate: 3600 }, // cache for 1 hour
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
    return [];
  }
}

// For dashboard use - gets all projects with pagination
export async function getProjects({
  page = 1,
  limit = 10,
  isFeatured,
  tags,
}: GetProjectsParams = {}): Promise<ProjectResponse | null> {
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

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/project/?${params.toString()}`,
      {
        signal: controller.signal,
        cache: "no-store", // Don't cache dashboard data
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
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

export async function getSingleProject(
  slug: string
): Promise<IProject | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/project/${slug}`,
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
    console.error("Failed to fetch project:", error);
    return null;
  }
}

export const createProject = async (payload: Partial<IProject>) => {
  try {
    const { data } = await apiClient.post(API_ENDPOINTS.PROJECT, payload);
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateProject = async (
  slug: string,
  payload: Partial<IProject>
) => {
  try {
    const { data } = await apiClient.patch(
      `${API_ENDPOINTS.PROJECT}/${slug}`,
      payload
    );
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteProject = async (slug: string) => {
  try {
    const { data } = await apiClient.delete(`${API_ENDPOINTS.PROJECT}/${slug}`);
    return data;
  } catch (error) {
    handleApiError(error);
  }
};