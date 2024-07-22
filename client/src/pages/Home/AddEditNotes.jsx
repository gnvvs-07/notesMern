export default function AddEditNotes() {
  return (
    <div className="p-3">
      <div className="flex flex-col border p-3 gap-2 justify-center">
        <input
          type="text"
          placeholder="Enter title of Note"
          className="bg-gray-100 p-3 rounded-lg outline-none w-full"
        />
        <textarea
          placeholder="Content"
          className="bg-gray-100 p-3 rounded-lg outline-none w-full"
          rows={7}
        ></textarea>
      </div>
      <div className="flex flex-col mt-3">
        <label className="mb-2">Tags</label>
        <button
          className="self-center sm:self-start bg-teal-500 p-3 rounded-md my-3 w-full sm:w-1/3"
          onClick={() => {}}
        >
          ADD
        </button>
      </div>
    </div>
  );
}
