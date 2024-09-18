// src/services/chapterService.ts
import axios from 'axios';

const API_URL = 'https://your-api-url/api/chapters'; // Replace with your actual API endpoint

// Fetch all chapters
export const getAllChapters = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new chapter
export const createChapter = async (chapter: { chapter: string; meetingDay: string }) => {
  const response = await axios.post(API_URL, chapter);
  return response.data;
};

// Edit a chapter
export const updateChapter = async (id: string, updatedChapter: { chapter: string; meetingDay: string }) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedChapter);
  return response.data;
};

// Delete a single chapter
export const deleteChapter = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Delete all chapters
export const deleteAllChapters = async () => {
  const response = await axios.delete(API_URL);
  return response.data;
};
