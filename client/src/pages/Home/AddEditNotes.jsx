import React, { useState, useEffect } from "react";
import TagInput from "../../components/Input/TagInput";
import { IoCloseOutline } from "react-icons/io5";

export default function AddEditNotes({ noteData, type, onClose }) {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState("");

  useEffect(() => {
    if (type === "edit" && noteData) {
      setTitle(noteData.title);
      setContent(noteData.content);
      setTags(noteData.tags);
    }
  }, [noteData, type]);

  const handleAddNote = async () => {
    if (!title || !content || !tags.length) {
      setError("Please fill all the fields");
      return;
    }
    setError("");

    if (type === "edit") {
      await editNote();
    } else {
      await addNote();
    }
    onClose();
  };

  const editNote = async () => {
    try {
      const res = await fetch(`/api/notes/edit/${noteData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, tags }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update the note");
      }
      return data;
    } catch (error) {
      console.error("Edit error:", error);
      setError("Failed to update the note");
    }
  };

  const addNote = async () => {
    try {
      const res = await fetch("/api/notes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, tags }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to add the note");
      }
      console.log("Note added successfully:", data);
    } catch (error) {
      console.log("Add error:", error);
      setError("Failed to add the note");
    }
  };

  return (
    <div className="relative p-3">
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
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="self-center sm:self-start bg-teal-500 p-3 rounded-md my-3 w-full sm:w-1/3"
          onClick={handleAddNote}
        >
          {type === "edit" ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
}
