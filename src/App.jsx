import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "/src/components/Navbar";
import Home from "/src/pages/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-white">
        <Navbar />
        <div className="pt-20 flex-grow">
          <Home />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
