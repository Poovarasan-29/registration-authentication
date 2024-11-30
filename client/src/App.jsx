import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Signup from "./templates/Signup";
import Login from "./templates/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./templates/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
