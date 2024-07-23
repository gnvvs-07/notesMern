import { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { IoCloseOutline } from "react-icons/io5";
export default function AddEditNotes({ noteData, type, onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");

  const handleAddNote = () => {
    if (!title || !content || !tags.length) {
      setError("Please fill all the fields");
      return;
    }
    setError("");
  };

  //   edit or adding notes
  const editNote = async () => {};
  const addNote = async () => {};
  if (type === "edit") {
    editNote();
  } else {
    addNote();
  }
  return (
    <div className=" relative p-3">
      <button className="absolute right-3 top-0" onClick={onClose}>
        <IoCloseOutline className="w-5 h-5 bg-slate-100 hover:bg-slate-200 relative rounded-full" />
      </button>
      <div className="flex flex-col border rounded-md p-3 gap-2 justify-center my-5">
        <input
          type="text"
          placeholder="Enter title of Note"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-100 p-3 rounded-lg outline-none w-full"
        />
        <textarea
          placeholder="Content"
          className="bg-gray-100 p-3 rounded-lg outline-none w-full"
          rows={7}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div className="flex flex-col mt-3">
        <label className="mb-2">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
        {/* error handling */}
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="self-center sm:self-start bg-teal-500 p-3 rounded-md my-3 w-full sm:w-1/3"
          onClick={handleAddNote}
        >
          ADD
        </button>
      </div>
    </div>
  );
}
