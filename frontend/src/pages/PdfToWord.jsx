import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FileText,
  Upload,
  CheckCircle,
  Loader2,
  Download,
  X,
} from "lucide-react";

const PdfToWord = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [isConverted, setIsConverted] = useState(false);
  const [convertedBlob, setConvertedBlob] = useState(null);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setError(null);
      setIsConverted(false);
      setConvertedBlob(null);
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
      setIsConverted(false);
      setConvertedBlob(null);
    } else {
      alert("Please drop a valid PDF file");
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) return;

    setIsConverting(true);
    setError(null);

    const formData = new FormData();
    formData.append("pdf", selectedFile);

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    try {
      const response = await fetch(`${API_URL}/api/pdf-to-word`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Conversion failed");
      }

      // Get the blob from response
      const blob = await response.blob();
      setConvertedBlob(blob);
      setIsConverted(true);
      setIsConverting(false);
    } catch (error) {
      console.error("Conversion error:", error);
      setError("Failed to convert PDF. Please try again.");
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!convertedBlob || !selectedFile) return;

    // Create download link
    const url = window.URL.createObjectURL(convertedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedFile.name.replace(".pdf", "")}-converted.docx`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    // Show success message
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // Reset state after download
      setSelectedFile(null);
      setIsConverted(false);
      setConvertedBlob(null);
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
                PDF converted successfully! Download started.
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
            PDF to Word Converter
          </h1>
          <p className="text-gray-300 text-md">
            Convert your PDF documents into editable Word files with ease
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
            {isConverting ? (
              <Loader2 className="w-16 h-16 mx-auto mb-4 text-green-400 animate-spin" />
            ) : (
              <Upload
                className={`w-16 h-16 mx-auto mb-4 transition-colors ${
                  isDragging ? "text-green-400" : "text-gray-500"
                }`}
              />
            )}
            <h3 className="text-xl font-semibold mb-2">
              {isConverting
                ? "Converting your PDF..."
                : selectedFile
                ? selectedFile.name
                : "Drop your PDF file here"}
            </h3>
            {!isConverting && <p className="text-gray-400 mb-6">or</p>}

            {!isConverting && !isConverted && (
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

            {selectedFile && !isConverting && !isConverted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 flex items-center justify-center gap-2 text-green-400"
              >
                <CheckCircle className="w-5 h-5" />
                <span>File selected successfully</span>
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

          {/* Convert Button */}
          {selectedFile && !isConverting && !isConverted && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleConvert}
              className="w-full mt-6 bg-green-400 hover:bg-green-500 text-gray-900 font-semibold py-4 rounded-lg transition duration-300"
            >
              Convert to Word
            </motion.button>
          )}

          {/* Download Section */}
          {isConverted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-gray-800 rounded-xl p-6"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <h3 className="text-xl font-semibold text-green-400">
                  Conversion Complete!
                </h3>
              </div>
              <p className="text-gray-300 text-center mb-6">
                Your PDF has been successfully converted to Word format. Click
                the button below to download your file.
              </p>
              <div className="bg-gray-900 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-green-400" />
                    <div>
                      <p className="font-semibold text-white">
                        {selectedFile.name.replace(".pdf", "")}-converted.docx
                      </p>
                      <p className="text-sm text-gray-400">Word Document</p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={handleDownload}
                className="w-full bg-green-400 hover:bg-green-500 text-gray-900 font-semibold py-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Word Document
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-400 text-gray-900 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Select PDF File</h3>
              <p className="text-gray-400 text-sm">
                Choose your PDF document from your device
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-400 text-gray-900 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Convert</h3>
              <p className="text-gray-400 text-sm">
                Our tool processes your PDF and converts it to Word
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-400 text-gray-900 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Download</h3>
              <p className="text-gray-400 text-sm">
                Download your converted Word document instantly
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PdfToWord;
