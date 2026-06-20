import { AxiosResponse } from "axios";
import { cookies } from "next/headers";

import { api } from "./api";
import { Note, FetchNotesResponse } from "@/types/note";
import { User } from "@/types/user";

interface CheckSessionResponse {
  success: boolean;
}

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  return cookieStore.toString();
};

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string,
): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>("/notes", {
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
  const response = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>("/users/me", {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return response.data;
};

export const checkServerSession = async (): Promise<AxiosResponse<CheckSessionResponse>> => {
  const response = await api.get<CheckSessionResponse>("/auth/session", {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return response;
};
