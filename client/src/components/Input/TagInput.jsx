import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdClose } from "react-icons/md";

export default function TagInput({ tags, setTags }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addNewTag();
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="w-full">
      {/* Display tags */}
      {tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center bg-slate-100 px-2 py-1 rounded-full text-sm"
            >
              #{tag}
              <button className="ml-1" onClick={() => handleRemoveTag(tag)}>
                <MdClose className="text-red-500" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Add a tag"
          value={inputValue}
          className="flex-grow bg-gray-100 p-2 rounded-md outline-none"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={addNewTag}
          className="flex items-center justify-center bg-blue-500 p-2 rounded-full text-white"
        >
          <IoIosAdd className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
