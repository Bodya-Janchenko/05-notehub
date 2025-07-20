import css from "./App.module.css";

import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../servises/noteService";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [debounceSearchQuery] = useDebounce(searchQuery, 300);

  const { data } = useQuery({
    queryKey: ["notes", debounceSearchQuery, currentPage],
    queryFn: () => fetchNotes(debounceSearchQuery, currentPage),
    keepPreviousData: true,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages;

  const changeSearchQuery = (newQuery: string) => {
    setCurrentPage(1);
    setSearchQuery(newQuery);
  };

  return (
    <div className={css.app}>
      <Toaster position="top-right" reverseOrder={false} />
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={changeSearchQuery} />
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>
      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}
