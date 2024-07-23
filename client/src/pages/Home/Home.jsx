import NoteCard from "../../components/Cards/NoteCard";
import { IoAddCircleOutline } from "react-icons/io5";
import AddEditNotes from "./AddEditNotes";
import { useState } from "react";
import Modal from "react-modal";

export default function Home() {
  // setting modal
  const [openAddedModal, setOpenAddedModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <div className="p-3">
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <NoteCard
          title="title"
          date="22-07-24"
          content="This is the content of the note prepared"
          tags="tag"
          isPinned={true}
          onEdit={() => {}}
          onDelete={() => {}}
          onPinNote={() => {}}
        />
        <NoteCard
          title="title"
          date="22-07-24"
          content="This is the content of the note prepared"
          tags="tag"
          isPinned={true}
          onEdit={() => {}}
          onDelete={() => {}}
          onPinNote={() => {}}
        />
        <NoteCard
          title="title"
          date="22-07-24"
          content="This is the content of the note prepared"
          tags="tag"
          isPinned={true}
          onEdit={() => {}}
          onDelete={() => {}}
          onPinNote={() => {}}
        />
        <NoteCard
          title="title"
          date="22-07-24"
          content="This is the content of the note prepared"
          tags="tag"
          isPinned={true}
          onEdit={() => {}}
          onDelete={() => {}}
          onPinNote={() => {}}
        />
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
      {/* modal */}
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
          onClose={() => {
            setOpenAddedModal({ isShown: false, type: "add", data: null });
          }}
        />
      </Modal>
    </div>
  );
}
