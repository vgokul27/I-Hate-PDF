import { motion } from "framer-motion";
import { useState } from "react";
import { FileMinus, Upload, CheckCircle, AlertCircle } from "lucide-react";

const WordToPdf = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      (file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "application/msword")
    ) {
      setSelectedFile(file);
    } else {
      alert("Please select a valid Word document (.doc or .docx)");
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
    if (
      file &&
      (file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "application/msword")
    ) {
      setSelectedFile(file);
    } else {
      alert("Please drop a valid Word document (.doc or .docx)");
    }
  };

  const handleConvert = () => {
    if (selectedFile) {
      // Conversion logic will go here
      alert(`Converting ${selectedFile.name} to PDF...`);
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
          <FileMinus className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-4">
            Word to PDF Converter
          </h1>
          <p className="text-gray-300 text-lg">
            Transform your Word documents into professional PDF files instantly
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
            <h3 className="text-lg font-semibold mb-2">Perfect Formatting</h3>
            <p className="text-gray-400 text-sm">
              Preserve all formatting, fonts, and images perfectly
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">Universal Format</h3>
            <p className="text-gray-400 text-sm">
              Create PDFs that work on any device and platform
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-400 text-sm">
              Convert your documents in seconds with one click
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
              {selectedFile
                ? selectedFile.name
                : "Drop your Word document here"}
            </h3>
            <p className="text-gray-400 mb-6">or</p>

            <label className="inline-block">
              <input
                type="file"
                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileSelect}
                className="hidden"
              />
              <span className="bg-green-400 hover:bg-green-500 text-gray-900 font-semibold px-8 py-3 rounded-lg cursor-pointer transition duration-300 inline-block">
                Select Word Document
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

          {selectedFile && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleConvert}
              className="w-full mt-6 bg-green-400 hover:bg-green-500 text-gray-900 font-semibold py-4 rounded-lg transition duration-300"
            >
              Convert to PDF
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
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-400 text-gray-900 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Select Word Document</h3>
              <p className="text-gray-400 text-sm">
                Choose your .doc or .docx file from your device
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-400 text-gray-900 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Convert</h3>
              <p className="text-gray-400 text-sm">
                Our tool instantly converts your Word document to PDF
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-400 text-gray-900 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Download</h3>
              <p className="text-gray-400 text-sm">
                Download your professional PDF document instantly
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WordToPdf;
