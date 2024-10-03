// usercore-service.ts
import axios, { AxiosResponse } from 'axios';
import { UserCore } from '../types/types';

const API_URL = 'https://bnisa.idzone.in/api/admin/user-core';

// Fetch users with pagination
export const getUsers = async (page: number, size: number): Promise<AxiosResponse<UserCore[]>> => {
  const res =  await axios.get(`${API_URL}`, {
    params: {
      page: page,
      size: size,
    },
  });
  return res.data
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
