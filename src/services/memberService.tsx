// memberService.ts
import axios, { AxiosResponse } from 'axios';
import { GetMemberResponse, Member } from '../types/types';

const API_URL = 'https://bnisa.idzone.in/api/admin/member';

// Fetch members with pagination
export const getMembers = async (page: number, size: number, searchQuery: string): Promise<GetMemberResponse> => {
  const res: AxiosResponse<GetMemberResponse> = await axios.get(`${API_URL}`, {
    params: {
      page,
      size,
      search: searchQuery || '',
    },
  });
  return res.data; // Return the response directly
};

// Create a new member
export const createMember = (memberData: Member): Promise<AxiosResponse<Member>> => {
  return axios.post(`${API_URL}`, memberData);
};

// Update an existing member
export const updateMember = (id: string, updatedData: Member): Promise<AxiosResponse<Member>> => {
  return axios.put(`${API_URL}?id=${id}`, updatedData);
};

// Delete a member
export const deleteMember = (id: string): Promise<AxiosResponse<void>> => {
  return axios.delete(`${API_URL}?id=${id}`);
};
