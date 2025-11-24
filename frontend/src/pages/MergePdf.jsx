import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FilePlus,
  Upload,
  CheckCircle,
  X,
  MoveUp,
  MoveDown,
  Trash2,
  Download,
  Loader2,
} from "lucide-react";

const MergePdf = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [isMerged, setIsMerged] = useState(false);
  const [mergedBlob, setMergedBlob] = useState(null);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const MAX_FILES = 10;

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    addFiles(files);
  };

  const addFiles = (files) => {
    const pdfFiles = files.filter((file) => file.type === "application/pdf");

    if (pdfFiles.length !== files.length) {
      alert("Please select only PDF files");
    }

    if (selectedFiles.length + pdfFiles.length > MAX_FILES) {
      alert(`Maximum ${MAX_FILES} files allowed`);
      return;
    }

    if (pdfFiles.length > 0) {
      setSelectedFiles([...selectedFiles, ...pdfFiles]);
      setError(null);
      setIsMerged(false);
      setMergedBlob(null);
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
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    setIsMerged(false);
    setMergedBlob(null);
  };

  const moveFileUp = (index) => {
    if (index > 0) {
      const newFiles = [...selectedFiles];
      [newFiles[index - 1], newFiles[index]] = [
        newFiles[index],
        newFiles[index - 1],
      ];
      setSelectedFiles(newFiles);
      setIsMerged(false);
      setMergedBlob(null);
    }
  };

  const moveFileDown = (index) => {
    if (index < selectedFiles.length - 1) {
      const newFiles = [...selectedFiles];
      [newFiles[index], newFiles[index + 1]] = [
        newFiles[index + 1],
        newFiles[index],
      ];
      setSelectedFiles(newFiles);
      setIsMerged(false);
      setMergedBlob(null);
    }
  };

  const handleMerge = async () => {
    if (selectedFiles.length < 2) {
      alert("Please select at least 2 PDF files to merge");
      return;
    }

    setIsMerging(true);
    setError(null);

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    try {
      const response = await fetch(`${API_URL}/api/merge-pdf`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Merge failed");
      }

      const blob = await response.blob();
      setMergedBlob(blob);
      setIsMerged(true);
      setIsMerging(false);
    } catch (error) {
      console.error("Merge error:", error);
      setError(error.message || "Failed to merge PDFs. Please try again.");
      setIsMerging(false);
    }
  };

  const handleDownload = () => {
    if (!mergedBlob) return;

    const url = window.URL.createObjectURL(mergedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `merged-${Date.now()}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedFiles([]);
      setIsMerged(false);
      setMergedBlob(null);
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
                PDFs merged successfully! Download started.
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
            Merge PDF Files
          </h1>
          <p className="text-gray-300 text-md">
            Combine multiple PDF documents into one seamless file
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
            {isMerging ? (
              <Loader2 className="w-16 h-16 mx-auto mb-4 text-green-400 animate-spin" />
            ) : (
              <Upload
                className={`w-16 h-16 mx-auto mb-4 transition-colors ${
                  isDragging ? "text-green-400" : "text-gray-500"
                }`}
              />
            )}
            <h3 className="text-xl font-semibold mb-2">
              {isMerging
                ? "Merging your PDFs..."
                : selectedFiles.length > 0
                ? `${selectedFiles.length} file(s) selected (Max ${MAX_FILES})`
                : "Drop your PDF files here"}
            </h3>
            {!isMerging && <p className="text-gray-400 mb-6">or</p>}

            {!isMerging && !isMerged && (
              <label className="inline-block">
                <input
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={selectedFiles.length >= MAX_FILES}
                />
                <span
                  className={`font-semibold px-8 py-3 rounded-lg cursor-pointer transition duration-300 inline-block ${
                    selectedFiles.length >= MAX_FILES
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-green-400 hover:bg-green-500 text-gray-900"
                  }`}
                >
                  Select PDF Files
                </span>
              </label>
            )}

            {selectedFiles.length > 0 && !isMerging && !isMerged && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 flex items-center justify-center gap-2 text-green-400"
              >
                <CheckCircle className="w-5 h-5" />
                <span>{selectedFiles.length} file(s) ready to merge</span>
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

          {/* Selected Files List */}
          {selectedFiles.length > 0 && !isMerging && !isMerged && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 space-y-3"
            >
              <h3 className="text-lg font-semibold text-green-400 mb-4">
                Selected Files ({selectedFiles.length}/{MAX_FILES})
              </h3>
              {selectedFiles.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-800 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="bg-green-400 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-gray-300 truncate">{file.name}</span>
                    <span className="text-gray-500 text-sm">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => moveFileUp(index)}
                      disabled={index === 0}
                      className={`p-2 rounded-lg transition ${
                        index === 0
                          ? "text-gray-600 cursor-not-allowed"
                          : "text-gray-400 hover:text-green-400 hover:bg-gray-700"
                      }`}
                    >
                      <MoveUp className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => moveFileDown(index)}
                      disabled={index === selectedFiles.length - 1}
                      className={`p-2 rounded-lg transition ${
                        index === selectedFiles.length - 1
                          ? "text-gray-600 cursor-not-allowed"
                          : "text-gray-400 hover:text-green-400 hover:bg-gray-700"
                      }`}
                    >
                      <MoveDown className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-gray-700 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Merge Button */}
          {selectedFiles.length >= 2 && !isMerging && !isMerged && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleMerge}
              className="w-full mt-6 bg-green-400 hover:bg-green-500 text-gray-900 font-semibold py-4 rounded-lg transition duration-300"
            >
              Merge {selectedFiles.length} PDF Files
            </motion.button>
          )}

          {/* Download Section */}
          {isMerged && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-gray-800 rounded-xl p-6"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <h3 className="text-xl font-semibold text-green-400">
                  Merge Complete!
                </h3>
              </div>
              <p className="text-gray-300 text-center mb-6">
                Your {selectedFiles.length} PDF files have been merged
                successfully. Click below to download.
              </p>
              <button
                onClick={handleDownload}
                className="w-full bg-green-400 hover:bg-green-500 text-gray-900 font-semibold py-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Merged PDF
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
              <h3 className="font-semibold mb-2">Select PDFs</h3>
              <p className="text-gray-400 text-sm">
                Choose up to 10 PDF files from your device
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-400 text-gray-900 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Arrange Order</h3>
              <p className="text-gray-400 text-sm">
                Reorder files using up/down arrows
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-400 text-gray-900 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Merge</h3>
              <p className="text-gray-400 text-sm">
                Click merge to combine all PDFs
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-400 text-gray-900 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold mb-2">Download</h3>
              <p className="text-gray-400 text-sm">
                Download your merged PDF file
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MergePdf;
