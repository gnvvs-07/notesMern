import { Link } from "react-router-dom";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBox from "../SearchBox/SearchBox";
import { useState } from "react";

export default function Header({ onSearchNote }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/login");
  };

  const onClearSearch = () => {
    setSearchQuery("");
    onSearchNote(""); // Clear search results
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  return (
    <div className="p-3 flex justify-between items-center shadow-md font-semibold text-gray-500">
      <Link to="/notes" className="text-sm sm:text-md">Notes</Link>
      <SearchBox
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onClearSearch={onClearSearch}
        handleSearch={handleSearch}
      />
      <ProfileInfo handleLogOut={handleLogOut} />
    </div>
  );
}
