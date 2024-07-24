import { Link } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { useState } from "react";
import { validateEmail } from "../../utils/forms";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../redux/user/userSlice.js";

export default function Login() {
  // navigation
  const navigate = useNavigate();
  // use states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { error_redux } = useSelector((state) => state.user);
  // dispatch
  const dispatch = useDispatch();

  // submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return dispatch(loginFailure("Please enter a valid email"));
    }
    if (!password) {
      setError("Please enter a password");
      return dispatch(loginFailure("Please enter a valid password"));
    }
    try {
      dispatch(loginStart());
      setError("");
      const res = await fetch("/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(loginSuccess(data));
        navigate("/notes");
      } else {
        dispatch(loginFailure(data.message));
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
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
          {error_redux && <p className="text-red-700 text-xs">{error_redux}</p>}
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
            className="p-3 bg-blue-500 text-white my-5 rounded-md w-1/4 hover:opacity-90"
          >
            Login
          </button>
        </form>
        <div className="text-right p-3">
          <span className="text-xs">Don't have an account? </span>
          <Link to="/register" className="text-xs text-blue-700">
            Create One
          </Link>
        </div>
      </div>
    </>
  );
}
