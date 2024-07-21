import { Link } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { useState } from "react";
import { validateEmail } from "../../utils/forms";
export default function Login() {
  // use states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }
    setError("");
  };
  return (
    <>
      <div className="border border-gray-500 m-3 rounded-lg">
        <h2 className="font-semibold text-center my-5 text-blue-500">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
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
            type="submit"
            className="p-3 bg-blue-500 text-white my-5 rounded-md w-1/4 hover:opacity-90"
          >
            Login
          </button>
        </form>
        <div className=" text-right p-3">
          <span className="text-xs">Dont have an account ? </span>
          <Link to="/register" className="text-xs text-blue-700">
            Create One
          </Link>
        </div>
      </div>
    </>
  );
}
