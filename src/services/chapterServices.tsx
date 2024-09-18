// chapter-service.ts
import axios, { AxiosResponse } from 'axios';
import { Chapter, MeetingDay } from '../types/types';

const API_URL = 'https://uat.bnisa.idzone.in/api/admin/chapter';

// Fetch chapters with pagination (page and size)
export const getChapters = async (page: number, size: number): Promise<AxiosResponse<Chapter[]>> => {
  const res = await axios.get(`${API_URL}`, {
    params: {
      page: page,
      size: size,
    },
  });
  return res.data
};

// Create a new chapter
export const createChapter = (chapterData: { chapter: string; meetingDay: MeetingDay }): Promise<AxiosResponse<Chapter>> => {
  return axios.post(`${API_URL}`, chapterData);
};

// Update an existing chapter
export const updateChapter = (id: string, updatedData: { chapter: string; meetingDay: MeetingDay }): Promise<AxiosResponse<Chapter>> => {
  return axios.put(`${API_URL}`, { ...updatedData, id});
};

// Delete a chapter
export const deleteChapter = (id: string): Promise<AxiosResponse<void>> => {
  return axios.delete(`${API_URL}?id=${id}`);
};
