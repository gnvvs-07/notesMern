import React from "react";

export default function SearchBox({ value, onChange, onClearSearch, handleSearch }) {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative text-sm w-1/2">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        className="p-2 border rounded-md"
        placeholder="Search notes..."
      />
      {value && (
        <button onClick={onClearSearch} className="absolute right-0 top-0 mt-2 mr-2">
          Clear
        </button>
      )}
    </div>
  );
}
