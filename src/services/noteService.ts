import axios from "axios";
import type { Note } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${
  import.meta.env.VITE_NOTEHUB_TOKEN
}`;
const PER_PAGE = 12;

export const fetchNotes = async (
  search: string,
  page: number
): Promise<FetchNotesResponse> => {
  const options = {
    params: {
      search,
      page,
      perPage: PER_PAGE,
    },
  };
  const response = await axios.get<FetchNotesResponse>("/notes", options);
  return response.data;
};

export interface createNoteProps {
  title: string;
  content: string;
  tag: string;
}

export const createNote = async (newNote: createNoteProps): Promise<Note> => {
  const response = await axios.post<Note>("/notes", newNote);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${noteId}`);
  return response.data;
};
