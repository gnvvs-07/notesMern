import { Link } from "react-router-dom";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBox from "../SearchBox/SearchBox";
import { useState } from "react";
export default function Header() {
  // search value
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleLogOut = () => {
    // redirect to login page
    navigate("/login");
  };
  const onClearSearch = () => {
    setSearchQuery("");
  };
  const handleSearch = () => {
    //
  };
  return (
    <>
      <div className="p-3 flex justify-between items-center shadow-md font-semibold text-gray-500 text-2xl">
        <Link to="/notes">Notes</Link>
        <SearchBox
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClearSearch={onClearSearch}
          handleSearch={handleSearch}
        />
        <ProfileInfo handleLogOut={handleLogOut} />
      </div>
    </>
  );
}
