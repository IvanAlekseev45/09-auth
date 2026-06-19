import { api } from "./api";
import { User } from "@/types/user";
import { Note, FetchNotesResponse, NoteTypes } from "@/types/note";
interface AuthData {
  email: string;
  password: string;
}

interface UpdateUserData {
  username: string;
}

interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTypes;
}

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string,
): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>("/notes", {
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
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (data: CreateNoteData): Promise<Note> => {
  const response = await api.post<Note>("/notes", data);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const register = async (data: AuthData): Promise<User> => {
  const response = await api.post<User>("/auth/register", data);
  return response.data;
};

export const login = async (data: AuthData): Promise<User> => {
  const response = await api.post<User>("/auth/login", data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

interface CheckSessionResponse {
  success: boolean;
}

export const checkSession = async (): Promise<boolean> => {
  const response = await api.get<CheckSessionResponse>("/auth/session");
  return response.data.success;
};

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>("/users/me");
  return response.data;
};

export const updateMe = async (data: UpdateUserData): Promise<User> => {
  const response = await api.patch<User>("/users/me", data);
  return response.data;
};
