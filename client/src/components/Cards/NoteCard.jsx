import { CiMapPin } from "react-icons/ci";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";
export default function NoteCard({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) {
  return (
    <div className=" cursor-pointer border border-gray-500 p-3 rounded-md bg-gray-100 opacity-65 hover:opacity-100">
      <div className="flex justify-between shadow-lg items-center mb-3">
        <div className="flex flex-col">
          <h1 className="uppercase text-sm">{title}</h1>
          <p className="text-xs text-red-500">{date}</p>
        </div>
        <CiMapPin
          className={isPinned ? "text-teal-500" : "text-gray-500"}
          onClick={onPinNote}
        />
      </div>
      <p className="text-black font-semibold text-md">
        {content?.slice(0, 60)}
      </p>
      <p className="bg-blue-200 w-fit p-1 text-xs text-black font-bold rounded-xl px-3">
        #{tags}
      </p>
      <div className="flex items-center justify-between mt-2">
        {/* edit */}
        <MdEditNote className="cursor-pointer" onClick={onEdit} />
        {/* delete and pin */}
        <div className="flex items-start">
          <MdDeleteOutline
            className="text-red-500 cursor-pointer"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
}
