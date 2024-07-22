import pic from "../../notes.png";
export default function ProfileInfo({ handleLogOut }) {
  return (
    <>
      <div className="flex gap-5 items-center">
        <img src={pic} alt="" className="w-8 h-8 object-cover rounded-full hidden sm:block " />
        <h1 className="text-xs sm:text-sm">John Doe</h1>
        <button onClick={handleLogOut} className="text-xs sm:text-sm text-red-500 hover:underline">
          Logout
        </button>
      </div>
    </>
  );
}
