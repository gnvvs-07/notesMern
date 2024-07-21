import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="p-3 shadow-md font-semibold text-gray-500 text-2xl">
        <Link to="/notes">Notes</Link>
      </div>
    </>
  );
}
