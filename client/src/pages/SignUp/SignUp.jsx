import { Link } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { useRef, useState } from "react";
import { validateEmail } from "../../utils/forms";
import pic from "../../notes.png";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  // navigation
  const navigate = useNavigate();
  // use states
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // image input ref
  const fileInputRef = useRef(null);
  // submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!name) {
      setError("Please enter name");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }
    setError("");
    // backend integration
    const res = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (data.success === false) {
      setError(data.message);
    }
    if (res.ok) {
      navigate("/login");
    }
  };
  // image input handlers
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handler to manage file input changes
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle the selected file (e.g., upload or display)
      console.log("Selected file:", file);
    }
  };
  return (
    <>
      <div className="border border-gray-500 m-3 rounded-lg">
        <h2 className="font-semibold text-center my-5 text-blue-500">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <img
            src={profilePic || pic}
            alt="upload profile picture"
            onClick={handleImageClick}
            className="cursor-pointer w-10 h-10 rounded-full object-cover mb-5"
          />
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <input
            type="text"
            placeholder="Name"
            className="border p-3 mb-5 rounded-md w-1/2 border-teal-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-3 mb-5 rounded-md w-1/2 border-teal-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-700 text-xs">{error}</p>}
          {/* submit button */}
          <button
            className="flex items-center gap-3 uppercase mt-5 p-3 bg-blue-500 rounded-md text-white"
            type="button"
          >
            <FaGoogle />
            continue with google
          </button>
          <button
            type="submit"
            className="p-3 bg-blue-500 text-white my-5 rounded-md hover:opacity-90"
          >
            SignUp
          </button>
        </form>
        <div className=" text-right p-3">
          <span className="text-xs"> have an account ? </span>
          <Link to="/login" className="text-xs text-blue-700">
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
