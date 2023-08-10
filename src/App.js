import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Saved from "./pages/Saved";

function App() {
  return (
   <div className="bg-gradient-to-r from-blue-800 to-indigo-900">
      <div>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/signUp" element={<SignUp/>}/>
            <Route path="/saved" element={<Saved/>}/>
          </Routes>
      </div>
   </div>
  );
}

export default App;
