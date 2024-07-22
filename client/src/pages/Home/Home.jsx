import NoteCard from "../../components/Cards/NoteCard";
import { IoAddCircleOutline } from "react-icons/io5";
export default function Home() {
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
      <button className=" absolute bottom-10 right-10 z-100">
        <IoAddCircleOutline className="h-10 w-10 text-white bg-blue-500 rounded-full opacity-85 hover:opacity-100" />
      </button>
    </div>
  );
}
