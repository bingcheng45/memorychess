import React from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
// import Services from "./pages/services";
// import Contact from "./pages/contact";
// import SignUp from "./pages/signup";


function App() {
  return (
    <div className="h-auto w-full bg-black text-white pt-32 grid">
      <BrowserRouter basename="/memorychess">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route component={NotFound} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
