/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/lib/constants";
import { handleApiError } from "@/lib/helpers";
import { IProject } from "@/types";

export async function getProjects(): Promise<IProject[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project/?limit=4&page=1&isFeatured=true`, {
      signal: controller.signal,
      next: { revalidate: 3600 } // cache for 1 hour
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    const data = await response.json();
    return data.data
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
}

export async function getSingleProjects(slug:string): Promise<IProject | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project/${slug}`, {
      signal: controller.signal,
      cache: 'no-store'
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    const data = await response.json();
    return data.data
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return null;
  }
}

export const createProject = async (payload: any) => {
  try {
    const { data } = await apiClient.post(API_ENDPOINTS.PROJECT, payload);
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateProject = async (slug: string, payload: any) => {
  try {
    const { data } = await apiClient.patch(`${API_ENDPOINTS.PROJECT}/${slug}`, payload);
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


