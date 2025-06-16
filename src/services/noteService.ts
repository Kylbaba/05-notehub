import axios from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const noteServiceClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
// Виправила сигнатуру приймає лише searchText і page
export const fetchNotes = async (
  searchText: string,
  page: number
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page };
  if (searchText.trim()) params.search = searchText;

  const res = await noteServiceClient.get<FetchNotesResponse>("/", { params });
  return res.data;
};

//  Виправила типізацію параметра
export const createNote = async (noteData: {
  title: string;
  content?: string;
  tag: string;
}): Promise<Note> => {
  const res = await noteServiceClient.post<Note>("/", noteData);
  return res.data;
};

export const deleteNote = async (noteId: number): Promise<Note> => {
  const res = await noteServiceClient.delete<Note>(`/${noteId}`);
  return res.data;
};
