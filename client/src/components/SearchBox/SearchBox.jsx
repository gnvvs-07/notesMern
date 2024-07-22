import { RxCross1 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";

export default function SearchBox({
  value,
  onChange,
  handleSearch,
  onClearSearch,
}) {
  return (
    <div className="flex items-center border p-2 border-gray-400 rounded-md text-sm w-1/2 justify-between bg-gray-50">
      <input
        type="text"
        placeholder="search note"
        value={value}
        onChange={onChange}
        className="outline-none text-gray-700 flex-grow bg-gray-50 font-semibold"
      />
      {/* if value exists, the cross appears, otherwise not */}
      {value && (
        <RxCross1 onClick={onClearSearch} className="cursor-pointer ml-2 text-red-500" />
      )}
      <CiSearch onClick={handleSearch} className="cursor-pointer ml-2 text-blue-500" />
    </div>
  );
}
