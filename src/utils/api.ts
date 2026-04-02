const BASE_URL = "http://localhost:8080";

export const authFetch = (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  return fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("token");
};