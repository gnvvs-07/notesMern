import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { IoAddCircleOutline } from "react-icons/io5";
import NoteCard from "../../components/Cards/NoteCard";
import AddEditNotes from "./AddEditNotes";
import Header from "../../components/Header/Header";

export default function Home() {
  const [openAddedModal, setOpenAddedModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [isSearch, setIsSearch] = useState(false);
  const [allNotes, setAllNotes] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const getAllNotes = async () => {
    try {
      const res = await fetch(`/api/notes/get/${currentUser._id}`);
      if (!res.ok) throw new Error("Failed to fetch notes");
      const data = await res.json();
      setAllNotes(data);
      setIsSearch(false);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser._id) {
      getAllNotes();
    }
  }, [currentUser]);

  const handleNoteUpdate = async () => {
    await getAllNotes();
    setOpenAddedModal({ isShown: false, type: "add", data: null });
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const res = await fetch(`/api/notes/delete/${noteId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete note");

      await getAllNotes(); // Refresh the list of notes
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const onSearchNote = async (query) => {
    try {
      const res = await fetch(`/api/notes/search?query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Failed to search notes");
      const data = await res.json();
      setAllNotes(data.notes);
      setIsSearch(true);
    } catch (error) {
      console.error("Error searching notes:", error);
    }
  };
  const handlePinNote = async (noteId, isPinned) => {
    try {
      const res = await fetch(`/api/notes/edit/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isPinned: !isPinned }),
      });

      if (!res.ok) throw new Error("Failed to pin/unpin note");

      await getAllNotes(); // Refresh the list of notes
    } catch (error) {
      console.error("Error pinning/unpinning note:", error);
    }
  };

  return (
    <div className="p-3">
      <Header onSearchNote={onSearchNote} />
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {allNotes.length ? (
          allNotes.map((item) => (
            <NoteCard
              key={item._id}
              title={item.title}
              date={item.createdAt}
              content={item.content}
              tags={item.tags}
              isPinned={item.isPinned}
              onEdit={() => {
                setOpenAddedModal({
                  isShown: true,
                  type: "edit",
                  data: item,
                });
              }}
              onDelete={() => handleDeleteNote(item._id)}
              onPinNote={() => handlePinNote(item._id,item.isPinned)}
            />
          ))
        ) : (
          <p>No notes available.</p>
        )}
      </div>
      <button
        className="absolute bottom-10 right-10 z-100"
        onClick={() =>
          setOpenAddedModal({
            isShown: true,
            type: "add",
            data: null,
          })
        }
      >
        <IoAddCircleOutline className="h-10 w-10 text-white bg-blue-500 rounded-full opacity-85 hover:opacity-100" />
      </button>
      <Modal
        isOpen={openAddedModal.isShown}
        onRequestClose={() =>
          setOpenAddedModal({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
        }}
        contentLabel="Add/Edit Note"
        className="bg-white p-4 rounded-md w-[80%] sm:w-[60%] mt-40 mx-auto"
      >
        <AddEditNotes
          type={openAddedModal.type}
          noteData={openAddedModal.data}
          onClose={handleNoteUpdate}
        />
      </Modal>
    </div>
  );
}
