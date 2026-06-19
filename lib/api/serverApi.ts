import { cookies } from "next/headers";
import axios from "axios";

import { Note, FetchNotesResponse } from "@/types/note";
import { User } from "@/types/user";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

const getHeaders = async () => {
  const cookieStore = await cookies();

  return {
    Cookie: cookieStore.toString(),
  };
};

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string,
): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(`${baseURL}/notes`, {
    headers: await getHeaders(),
    params: {
      search,
      page,
      perPage: 12,
      tag,
    },
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`${baseURL}/notes/${id}`, {
    headers: await getHeaders(),
  });

  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response = await axios.get<User>(`${baseURL}/users/me`, {
    headers: await getHeaders(),
  });

  return response.data;
};

export const checkSession = async (): Promise<User | null> => {
  const response = await axios.get<User | null>(`${baseURL}/auth/session`, {
    headers: await getHeaders(),
  });

  return response.data;
};
