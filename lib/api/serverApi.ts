import axios from "axios";
import { cookies } from "next/headers";

import { Note, FetchNotesResponse } from "@/types/note";
import { User } from "@/types/user";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  return cookieStore.toString();
};

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string,
): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(`${baseURL}/notes`, {
    headers: {
      Cookie: await getCookieHeader(),
    },
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
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response = await axios.get<User>(`${baseURL}/users/me`, {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return response.data;
};

interface CheckSessionResponse {
  success: boolean;
}

export const checkSession = async (): Promise<boolean> => {
  const response = await axios.get<CheckSessionResponse>(`${baseURL}/auth/session`, {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return response.data.success;
};
