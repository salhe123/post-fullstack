import api from "./api";
import { type Post } from "../types";

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>("/posts");
  return response.data;
};

export const getPost = async (id: string): Promise<Post> => {
  const response = await api.get<Post>(`/posts/${id}`);
  return response.data;
};

export const createPost = async (
  title: string,
  content: string): Promise<Post> => {
  const response = await api.post<Post>("/posts", { title, content });
  return response.data;
};

export const updatePost = async (
  id: string,
  title: string,
  content: string): Promise<Post> => {
  const response = await api.put<Post>(`/posts/${id}`, { title, content });
  return response.data;
};

export const deletePost = async (id: string): Promise<void> => {
  await api.delete(`/posts/${id}`);
};
