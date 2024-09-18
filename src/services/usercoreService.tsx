// src/services/userCoreService.ts
import axios from 'axios';

const API_URL = 'https://your-api-url/api/usercore'; // Replace with your actual API URL

// Fetch all UserCore records
export const getAllUserCore = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Update a user
export const updateUserCore = async (id: string, updatedData: any) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
};

// Delete a user
export const deleteUserCore = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Delete all users
export const deleteAllUserCore = async () => {
  const response = await axios.delete(API_URL);
  return response.data;
};

// Upload bulk data (Excel)
export const uploadBulkUserCore = async (data: any) => {
  const response = await axios.post(`${API_URL}/bulk`, data);
  return response.data;
};
