import api from "./api";
import { type Comment } from "../types";

export const getComments = async (postId: string): Promise<Comment[]> => {
  const response = await api.get<Comment[]>(`/posts/${postId}/comments`);
  return response.data;
};

export const createComment = async (
  postId: string,
  content: string): Promise<Comment> => {
  const response = await api.post<Comment>(`/posts/${postId}/comments`, {
    content,
  });
  return response.data;
};
