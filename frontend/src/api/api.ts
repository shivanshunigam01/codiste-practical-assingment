import axios from 'axios';


const API_URL = 'http://localhost:3000/api/users';

export const loginUser = async (email: string) => {
  return axios.post(`${API_URL}/login`, { email });
};

export const getUserProfile = async (userId: string) => {
  return axios.get(`${API_URL}/profile`, { params: { userId } });
};

  export const updateUserProfile = async (userId: string, name: string, email: string) => {
    return axios.post(`${API_URL}/edit-name`, { name, email });
  };

  export const registerUser = async (name: string, email: string, password: string) => {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
    });
    return response.data;
  };