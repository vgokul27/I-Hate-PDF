import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Scissors,
  Upload,
  CheckCircle,
  Download,
  X,
  Loader2,
} from "lucide-react";

const SplitPdf = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [splitOption, setSplitOption] = useState("range");
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState("");
  const [customPages, setCustomPages] = useState("");
  const [isSplitting, setIsSplitting] = useState(false);
  const [isSplit, setIsSplit] = useState(false);
  const [splitBlob, setSplitBlob] = useState(null);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setError(null);
      setIsSplit(false);
      setSplitBlob(null);
    } else {
      alert("Please select a valid PDF file");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setError(null);
      setIsSplit(false);
      setSplitBlob(null);
    } else {
      alert("Please drop a valid PDF file");
    }
  };

  const handleSplit = async () => {
    if (!selectedFile) return;

    setIsSplitting(true);
    setError(null);

    const formData = new FormData();
    formData.append("pdf", selectedFile);
    formData.append("split_mode", splitOption);

    if (splitOption === "range") {
      formData.append("start_page", startPage);
      if (endPage) {
        formData.append("end_page", endPage);
      }
    } else if (splitOption === "custom") {
      formData.append("custom_pages", customPages);
    }

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${API_URL}/api/split-pdf`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Split failed");
      }

      const blob = await response.blob();
      setSplitBlob(blob);
      setIsSplit(true);
      setIsSplitting(false);
    } catch (error) {
      console.error("Split error:", error);
      setError(error.message || "Failed to split PDF. Please try again.");
      setIsSplitting(false);
    }
  };

  const handleDownload = () => {
    if (!splitBlob || !selectedFile) return;

    const url = window.URL.createObjectURL(splitBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedFile.name.replace(".pdf", "")}-split.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedFile(null);
      setIsSplit(false);
      setSplitBlob(null);
      setStartPage(1);
      setEndPage("");
      setCustomPages("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-24 px-6 pb-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3"
            >
              <CheckCircle className="w-6 h-6" />
              <span className="font-semibold">
                PDF split successfully! Download started.
              </span>
              <button
                onClick={() => setShowSuccess(false)}
                className="ml-4 hover:bg-green-600 rounded-full p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-green-400 mb-4">
            Split PDF Files
          </h1>
          <p className="text-gray-300 text-md">
            Extract or split specific pages from your PDF documents
          </p>
        </motion.div>

        {/* File Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gray-900 rounded-2xl p-8 mb-8"
        >
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              isDragging
                ? "border-green-400 bg-gray-800"
                : "border-gray-700 hover:border-green-400"
            }`}
          >
            {isSplitting ? (
              <Loader2 className="w-16 h-16 mx-auto mb-4 text-green-400 animate-spin" />
            ) : (
              <Upload
                className={`w-16 h-16 mx-auto mb-4 transition-colors ${
                  isDragging ? "text-green-400" : "text-gray-500"
                }`}
              />
            )}
            <h3 className="text-xs lg:text-xl font-semibold mb-2">
              {isSplitting
                ? "Splitting your PDF..."
                : selectedFile
                ? selectedFile.name
                : "Drop your PDF file here"}
            </h3>
            {!isSplitting && <p className="text-gray-400 mb-6">or</p>}

            {!isSplitting && !isSplit && (
              <label className="inline-block">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <span className="bg-green-400 hover:bg-green-500 text-gray-900 font-semibold px-8 py-3 rounded-lg cursor-pointer transition duration-300 inline-block">
                  Select PDF File
                </span>
              </label>
            )}

            {selectedFile && !isSplitting && !isSplit && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 flex items-center justify-center gap-2 text-green-400"
              >
                <CheckCircle className="w-5 h-5" />
                <span className="text-xs lg:text-lg">File selected successfully</span>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 flex items-center justify-center gap-2 text-red-400"
              >
                <span>{error}</span>
              </motion.div>
            )}
          </div>

          {/* Split Options */}
          {selectedFile && !isSplitting && !isSplit && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <h3 className="text-lg font-semibold text-green-400 mb-4">
                Choose Split Mode
              </h3>
              <div className="space-y-4">
                {/* Page Range Option */}
                <div
                  onClick={() => setSplitOption("range")}
                  className={`bg-gray-800 rounded-lg p-4 cursor-pointer transition-all ${
                    splitOption === "range"
                      ? "border-2 border-green-400"
                      : "border-2 border-transparent hover:border-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="radio"
                      checked={splitOption === "range"}
                      onChange={() => setSplitOption("range")}
                      className="w-5 h-5 text-green-400 cursor-pointer"
                    />
                    <div>
                      <h4 className="font-semibold">Page Range</h4>
                      <p className="text-sm text-gray-400">
                        Extract specific page range
                      </p>
                    </div>
                  </div>
                  {splitOption === "range" && (
                    <div className="ml-8 flex gap-4 items-center">
                      <div>
                        <label className="text-sm text-gray-400">From:</label>
                        <input
                          type="number"
                          min="1"
                          value={startPage}
                          onChange={(e) =>
                            setStartPage(parseInt(e.target.value) || 1)
                          }
                          className="w-20 bg-gray-700 rounded px-3 py-2 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400">To:</label>
                        <input
                          type="number"
                          min="1"
                          value={endPage}
                          onChange={(e) => setEndPage(e.target.value)}
                          placeholder="Last"
                          className="w-20 bg-gray-700 rounded px-3 py-2 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Custom Pages Option */}
                <div
                  onClick={() => setSplitOption("custom")}
                  className={`bg-gray-800 rounded-lg p-4 cursor-pointer transition-all ${
                    splitOption === "custom"
                      ? "border-2 border-green-400"
                      : "border-2 border-transparent hover:border-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="radio"
                      checked={splitOption === "custom"}
                      onChange={() => setSplitOption("custom")}
                      className="w-5 h-5 text-green-400 cursor-pointer"
                    />
                    <div>
                      <h4 className="font-semibold">Custom Pages</h4>
                      <p className="text-sm text-gray-400">
                        Extract specific pages (e.g., 1,3,5-7)
                      </p>
                    </div>
                  </div>
                  {splitOption === "custom" && (
                    <div className="ml-8">
                      <input
                        type="text"
                        value={customPages}
                        onChange={(e) => setCustomPages(e.target.value)}
                        placeholder="e.g., 1,3,5-7,10"
                        className="w-full bg-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Split Button */}
          {selectedFile && !isSplitting && !isSplit && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleSplit}
              className="w-full mt-6 bg-green-400 hover:bg-green-500 text-gray-900 font-semibold py-4 rounded-lg transition duration-300"
            >
              Split PDF
            </motion.button>
          )}

          {/* Download Section */}
          {isSplit && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-gray-800 rounded-xl p-6"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <h3 className="text-xl font-semibold text-green-400">
                  Split Complete!
                </h3>
              </div>
              <p className="text-sm lg:text-md text-gray-300 text-center mb-6">
                Your PDF has been split successfully. Click below to download.
              </p>
              <button
                onClick={handleDownload}
                className="w-full bg-green-400 hover:bg-green-500 text-gray-900 font-semibold py-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Split PDF
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* How it Works ? Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">
            How it Works ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-green-400 text-gray-900 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Select PDF</h3>
              <p className="text-gray-400 text-sm">
                Choose the PDF file you want to split
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-400 text-gray-900 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Choose Mode</h3>
              <p className="text-gray-400 text-sm">
                Select how you want to split your PDF
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-400 text-gray-900 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Split</h3>
              <p className="text-gray-400 text-sm">
                Process your PDF with selected options
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-400 text-gray-900 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold mb-2">Download</h3>
              <p className="text-gray-400 text-sm">
                Download your extracted pages
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SplitPdf;
