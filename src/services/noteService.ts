import axios from "axios";
import type { Note } from "../types/note";
import type { NoteTag } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const KEY = import.meta.env.VITE_NOTEHUB_TOKEN;
export const perPage = 12;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  searchNote: string,
  page: number
): Promise<FetchNotesResponse> => {
  const response = await axios<FetchNotesResponse>("/notes", {
    headers: {
      Authorization: `Bearer ${KEY}`,
    },
    params: {
      ...(searchNote !== "" && { search: searchNote }),
      page,
      perPage: perPage,
    },
  });

  return response.data;
};

interface createNoteProps {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (newNote: createNoteProps): Promise<Note> => {
  const response = await axios.post("/notes", newNote, {
    headers: {
      Authorization: `Bearer ${KEY}`,
    },
  });
  return response.data;
};

export const deleteNote = async (noteId: number) => {
  const response = await axios.delete(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${KEY}`,
    },
  });
  return response.data;
};
