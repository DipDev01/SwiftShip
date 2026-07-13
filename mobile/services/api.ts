const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
    
    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || `HTTP Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Network request failed at ${endpoint}:`, error);
    throw error;
  }
};