/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/lib/constants";
import { handleApiError } from "@/lib/helpers";

export const loginAdmin = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, payload);
    const { accessToken } = response.data.data;

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      console.log("✅ Login successful - Token saved");
    }
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getMe = async () => {
  try {
    const { data } = await apiClient.get(API_ENDPOINTS.AUTH.ME);
    return data;
  } catch (error) {
    console.log("heee");
    handleApiError(error);
  }
};

export const updateProfile = async (payload: any) => {
  try {
    const { data } = await apiClient.patch(API_ENDPOINTS.AUTH.UPDATE, payload);
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

// Helper function to logout
export const logout = () => {
  localStorage.removeItem("accessToken");
  sessionStorage.clear();
};
