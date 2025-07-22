import css from "./App.module.css";

import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NodeForm";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../servises/noteService";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCreatedNote, setIsCreatedNote] = useState<boolean>(false);

  const [debounceSearchQuery] = useDebounce(searchQuery, 300);

  const { data } = useQuery({
    queryKey: ["notes", debounceSearchQuery, currentPage],
    queryFn: () => fetchNotes(debounceSearchQuery, currentPage),
    keepPreviousData: true,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const changeSearchQuery = (newQuery: string) => {
    setCurrentPage(1);
    setSearchQuery(newQuery);
  };

  const toogleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toogleCreateNote = () => {
    setIsCreatedNote(!isCreatedNote);
  };

  return (
    <div className={css.app}>
      <Toaster position="top-right" reverseOrder={false} />
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={changeSearchQuery} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button
          className={css.button}
          onClick={() => {
            toogleModal();
            toogleCreateNote();
          }}
        >
          Create Note +
        </button>
      </header>
      {isModalOpen && (
        <Modal onClose={toogleModal}>
          {isCreatedNote && (
            <NoteForm
              onClose={() => {
                toogleModal();
                toogleCreateNote();
              }}
            />
          )}
        </Modal>
      )}
      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}
