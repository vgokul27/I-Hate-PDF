import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "/src/components/Navbar";
import Home from "/src/pages/Home";
import About from "/src/pages/About";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-white">
        <Navbar />
        <div className="pt-24 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/merge-pdf" element={<div>Merge PDF Page</div>} />
            <Route path="/pdf-to-word" element={<div>PDF to Word Page</div>} />
            <Route path="/word-to-pdf" element={<div>Word to PDF Page</div>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
