// usercoreService.ts
import axios, { AxiosResponse } from 'axios';
import { GetUserResponse, UserCore } from '../types/types';

const API_URL = 'https://bnisa.idzone.in/api/admin/user-core';

// Fetch users with pagination
export const getUsers = async (page: number, size: number , searchQuery: string): Promise<GetUserResponse> => {
  const res: AxiosResponse<GetUserResponse> = await axios.get(`${API_URL}`, {
    params: {
      page,
      size,
      search: searchQuery || '',
    },
  });
  return res.data; // Return the response directly
};

// Create a new user
export const createUser = (userData: UserCore): Promise<AxiosResponse<UserCore>> => {
  return axios.post(`${API_URL}`, userData);
};

// Update an existing user
export const updateUser = (id: string, updatedData: UserCore): Promise<AxiosResponse<UserCore>> => {
  return axios.put(`${API_URL}?id=${id}`, updatedData);
};

// Delete a user
export const deleteUser = (id: string): Promise<AxiosResponse<void>> => {
  return axios.delete(`${API_URL}?id=${id}`);
};
