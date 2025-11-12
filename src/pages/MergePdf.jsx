import { motion } from "framer-motion";
import { useState } from "react";
import {
  FilePlus,
  Upload,
  CheckCircle,
  X,
  MoveUp,
  MoveDown,
  Trash2,
} from "lucide-react";

const MergePdf = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const pdfFiles = files.filter((file) => file.type === "application/pdf");

    if (pdfFiles.length !== files.length) {
      alert("Please select only PDF files");
    }

    if (pdfFiles.length > 0) {
      setSelectedFiles([...selectedFiles, ...pdfFiles]);
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
    const pdfFiles = files.filter((file) => file.type === "application/pdf");

    if (pdfFiles.length !== files.length) {
      alert("Please drop only PDF files");
    }

    if (pdfFiles.length > 0) {
      setSelectedFiles([...selectedFiles, ...pdfFiles]);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const moveFileUp = (index) => {
    if (index > 0) {
      const newFiles = [...selectedFiles];
      [newFiles[index - 1], newFiles[index]] = [
        newFiles[index],
        newFiles[index - 1],
      ];
      setSelectedFiles(newFiles);
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
    }
  };

  const handleMerge = () => {
    if (selectedFiles.length >= 2) {
      // Merge logic will go here
      alert(`Merging ${selectedFiles.length} PDF files...`);
    } else {
      alert("Please select at least 2 PDF files to merge");
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
          <FilePlus className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-4">
            Merge PDF Files
          </h1>
          <p className="text-gray-300 text-lg">
            Combine multiple PDF documents into one seamless file
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
            <h3 className="text-lg font-semibold mb-2">Multiple Files</h3>
            <p className="text-gray-400 text-sm">
              Merge as many PDF files as you need in one go
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">Custom Order</h3>
            <p className="text-gray-400 text-sm">
              Arrange your PDFs in any order before merging
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">Quick Process</h3>
            <p className="text-gray-400 text-sm">
              Fast merging with maintained quality and formatting
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
              {selectedFiles.length > 0
                ? `${selectedFiles.length} file(s) selected`
                : "Drop your PDF files here"}
            </h3>
            <p className="text-gray-400 mb-6">or</p>

            <label className="inline-block">
              <input
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
              <span className="bg-green-400 hover:bg-green-500 text-gray-900 font-semibold px-8 py-3 rounded-lg cursor-pointer transition duration-300 inline-block">
                Select PDF Files
              </span>
            </label>

            {selectedFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 flex items-center justify-center gap-2 text-green-400"
              >
                <CheckCircle className="w-5 h-5" />
                <span>{selectedFiles.length} file(s) ready to merge</span>
              </motion.div>
            )}
          </div>

          {/* Selected Files List */}
          {selectedFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 space-y-3"
            >
              <h3 className="text-lg font-semibold text-green-400 mb-4">
                Selected Files ({selectedFiles.length})
              </h3>
              {selectedFiles.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="bg-green-400 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-gray-300 truncate">{file.name}</span>
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

          {selectedFiles.length >= 2 && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleMerge}
              className="w-full mt-6 bg-green-400 hover:bg-green-500 text-gray-900 font-semibold py-4 rounded-lg transition duration-300"
            >
              Merge {selectedFiles.length} PDF Files
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
              <h3 className="font-semibold mb-2">Select PDFs</h3>
              <p className="text-gray-400 text-sm">
                Choose multiple PDF files from your device
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
