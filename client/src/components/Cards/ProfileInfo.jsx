import pic from "../../notes.png";
export default function ProfileInfo({ handleLogOut }) {
  return (
    <>
      <div className="flex gap-5 items-center">
        <img src={pic} alt="" className="w-8 h-8 object-cover rounded-full " />
        <h1 className="text-sm">John Doe</h1>
        <button onClick={handleLogOut} className="text-sm text-red-500 hover:underline">
          Logout
        </button>
      </div>
    </>
  );
}
