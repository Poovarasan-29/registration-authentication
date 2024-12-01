import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Signup from "./templates/Signup";
import Login from "./templates/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./templates/Home";
import ForgotPassword from "./templates/ForgotPassword";
import ResetNewPassword from "./templates/ResetNewPassword";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-new-password" element={<ResetNewPassword />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
