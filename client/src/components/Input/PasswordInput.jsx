import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
export default function PasswordInput({ value, onChange, placeholder }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex justify-between items-center p-3 border w-1/2 rounded-md border-teal-500">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder="Enter The passsword"
        className=" border border-transparent focus:outline-none"
      />
      {!showPassword ? (
        <IoEyeOff
          size={22}
          className="cursor-pointer"
          onClick={handleClick}
        />
      ) : (
        <IoEye
          size={22}
          className="text-teal-500 cursor-pointer hover:text-teal-700"
          onClick={handleClick}
        />
      )}
    </div>
  );
}
