import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { IoAddCircleOutline } from "react-icons/io5";
import NoteCard from "../../components/Cards/NoteCard";
import AddEditNotes from "./AddEditNotes";

export default function Home() {
  const [openAddedModal, setOpenAddedModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [allNotes, setAllNotes] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const getAllNotes = async () => {
    try {
      const res = await fetch(`/api/notes/get/${currentUser._id}`);
      const data = await res.json();
      setAllNotes(data);
    } catch (error) {
      console.log("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, [currentUser]);

  const handleNoteUpdate = async () => {
    await getAllNotes();
    setOpenAddedModal({ isShown: false, type: "add", data: null });
  };

  const handleEditNote = (note) => {
    setOpenAddedModal({
      isShown: true,
      type: "edit",
      data: note,
    });
  };

  return (
    <div className="p-3">
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {allNotes.map((item, index) => (
          <NoteCard
            key={index}
            title={item.title}
            date={item.createdAt}
            content={item.content}
            tags={item.tags}
            isPinned={item.isPinned}
            onEdit={() => handleEditNote(item)}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        ))}
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
