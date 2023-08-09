import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
   <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-[100vh]">
      <div>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/signUp" element={<SignUp/>}/>
          </Routes>
          
      </div>
   </div>
  );
}

export default App;
