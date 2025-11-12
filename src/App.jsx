import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "/src/components/Navbar";
import Home from "/src/pages/Home";
import About from "/src/pages/About";
import PdfToWord from "/src/pages/PdfToWord";
import WordToPdf from "/src/pages/WordToPdf";
import MergePdf from "/src/pages/MergePdf";
import SplitPdf from "/src/pages/SplitPdf";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pdf-to-word" element={<PdfToWord />} />
          <Route path="/word-to-pdf" element={<WordToPdf />} />
          <Route path="/merge-pdf" element={<MergePdf />} />
          <Route path="/split-pdf" element={<SplitPdf />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
