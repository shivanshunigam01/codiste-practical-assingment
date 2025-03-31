import axios from "axios";
import { Post } from "../components/PostApp";


const API_URL = "http://localhost:3000/api";


export const createPost = async (userId: number, title: string, description: string, imageUrl: string): Promise<Post> => {
  const response = await axios.post(`${API_URL}/posts/create`, {
    userId,
    title,
    description,
    imageUrl,
  });
  return response.data;
};


export const toggleLike = async (postId: number, userId: number) => {
  const response = await axios.post(`${API_URL}/posts/like`, { postId, userId });
  return response.data;
};


export const fetchPosts = async (offset = 0, limit = 10): Promise<Post[]> => {
  const response = await axios.get(`${API_URL}/posts/list`, {
    params: { offset, limit },
  });
  return response.data;
};
