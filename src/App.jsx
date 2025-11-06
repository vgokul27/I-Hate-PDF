import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "/src/components/Navbar";
import Home from "/src/pages/Home";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-white">
        <Navbar />
        <Home />
      </div>
    </Router>
  );
}

export default App;
