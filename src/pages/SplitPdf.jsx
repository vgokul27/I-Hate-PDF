import { motion } from "framer-motion";
import { useState } from "react";
import { Scissors, Upload, CheckCircle, FileText } from "lucide-react";

const SplitPdf = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [splitOption, setSplitOption] = useState("all"); // all, range, or custom

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
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
    } else {
      alert("Please drop a valid PDF file");
    }
  };

  const handleSplit = () => {
    if (selectedFile) {
      // Split logic will go here
      alert(`Splitting ${selectedFile.name} using ${splitOption} mode...`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-28 px-6 pb-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Scissors className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-4">
            Split PDF Files
          </h1>
          <p className="text-gray-300 text-lg">
            Extract or split specific pages from your PDF documents
          </p>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">Multiple Options</h3>
            <p className="text-gray-400 text-sm">
              Split by pages, ranges, or extract all pages
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">Precise Control</h3>
            <p className="text-gray-400 text-sm">
              Choose exactly which pages you want to extract
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">Quality Preserved</h3>
            <p className="text-gray-400 text-sm">
              Original quality and formatting maintained
            </p>
          </div>
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
            <Upload
              className={`w-16 h-16 mx-auto mb-4 transition-colors ${
                isDragging ? "text-green-400" : "text-gray-500"
              }`}
            />
            <h3 className="text-xl font-semibold mb-2">
              {selectedFile ? selectedFile.name : "Drop your PDF file here"}
            </h3>
            <p className="text-gray-400 mb-6">or</p>

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

            {selectedFile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 flex items-center justify-center gap-2 text-green-400"
              >
                <CheckCircle className="w-5 h-5" />
                <span>File selected successfully</span>
              </motion.div>
            )}
          </div>

          {/* Split Options */}
          {selectedFile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <h3 className="text-lg font-semibold text-green-400 mb-4">
                Choose Split Mode
              </h3>
              <div className="space-y-4">
                {/* All Pages Option */}
                <div
                  onClick={() => setSplitOption("all")}
                  className={`bg-gray-800 rounded-lg p-4 cursor-pointer transition-all ${
                    splitOption === "all"
                      ? "border-2 border-green-400"
                      : "border-2 border-transparent hover:border-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked={splitOption === "all"}
                      onChange={() => setSplitOption("all")}
                      className="w-5 h-5 text-green-400 cursor-pointer"
                    />
                    <div>
                      <h4 className="font-semibold">Extract All Pages</h4>
                      <p className="text-sm text-gray-400">
                        Split PDF into individual pages
                      </p>
                    </div>
                  </div>
                </div>

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
                          placeholder="1"
                          className="w-20 bg-gray-700 rounded px-3 py-2 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400">To:</label>
                        <input
                          type="number"
                          min="1"
                          placeholder="10"
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
                        placeholder="e.g., 1,3,5-7,10"
                        className="w-full bg-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {selectedFile && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleSplit}
              className="w-full mt-6 bg-green-400 hover:bg-green-500 text-gray-900 font-semibold py-4 rounded-lg transition duration-300"
            >
              Split PDF
            </motion.button>
          )}
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">
            How It Works ?
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
