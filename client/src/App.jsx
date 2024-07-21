import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Welcome from "./pages/Welcome/Welcome";
import Header from "./components/Header/Header";
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/notes" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/" element={<Welcome />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
