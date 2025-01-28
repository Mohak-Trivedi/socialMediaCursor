import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add auth token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  signup: (userData) => api.post("/auth/signup", userData),
  login: (credentials) => api.post("/auth/login", credentials),
  logout: () => api.post("/auth/logout"),
};

export const posts = {
  create: (content) => api.post("/posts", { content }),
  getAll: () => api.get("/posts"),
  like: (postId) => api.post(`/posts/${postId}/like`),
  comment: (postId, content) =>
    api.post(`/posts/${postId}/comments`, { content }),
};

export default api;
