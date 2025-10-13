/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleApiError = (error: any) => {
  if (error.response) {
    console.error("API Error:", error.response.data);
    throw new Error(error.response.data.message || "Something went wrong");
  } else {
    console.error("Network Error:", error);
    throw new Error("Network error occurred");
  }
};
