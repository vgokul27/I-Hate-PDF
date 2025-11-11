import { motion } from "framer-motion";
import { useState } from "react";
import {
  FilePlus,
  FileMinus,
  FileText,
  Scissors,
  Minimize2,
  FileImage,
  ImageIcon,
  Code,
  FolderTree,
  PenTool,
  FileSignature,
  Sheet,
  Lock,
} from "lucide-react";

const tools = [
  {
    title: "Merge PDF",
    desc: "Combine multiple PDFs into one seamless document.",
    icon: <FilePlus size={40} />,
    color: "from-green-400 to-emerald-500",
  },
  {
    title: "PDF to Word",
    desc: "Convert your PDF files into editable Word documents.",
    icon: <FileText size={40} />,
    color: "from-blue-400 to-indigo-500",
  },
  {
    title: "Word to PDF",
    desc: "Turn your Word documents into professional PDFs instantly.",
    icon: <FileMinus size={40} />,
    color: "from-pink-400 to-rose-500",
  },
  {
    title: "Split PDF",
    desc: "Easily extract or split specific pages from your PDFs.",
    icon: <Scissors size={40} />,
    color: "from-yellow-400 to-orange-500",
  },
];

const upcomingFeatures = [
  {
    title: "Compress PDF",
    desc: "Reduce PDF file size while maintaining quality.",
    icon: <Minimize2 size={40} />,
  },
  {
    title: "PDF to PowerPoint",
    desc: "Convert PDF documents to editable PowerPoint presentations.",
    icon: <FileImage size={40} />,
  },
  {
    title: "PowerPoint to PDF",
    desc: "Transform your presentations into PDF format.",
    icon: <FileImage size={40} />,
  },
  {
    title: "PDF to Excel",
    desc: "Extract tables and data from PDFs to Excel spreadsheets.",
    icon: <Sheet size={40} />,
  },
  {
    title: "Excel to PDF",
    desc: "Convert your Excel spreadsheets into PDF documents.",
    icon: <Sheet size={40} />,
  },
  {
    title: "Edit PDF",
    desc: "Modify text, images, and content in your PDF files.",
    icon: <PenTool size={40} />,
  },
  {
    title: "Sign PDF",
    desc: "Digitally sign your PDF documents with ease.",
    icon: <FileSignature size={40} />,
  },
  {
    title: "PDF to JPG",
    desc: "Convert PDF pages into high-quality JPG images.",
    icon: <FileImage size={40} />,
  },
  {
    title: "JPG to PDF",
    desc: "Combine multiple images into a single PDF file.",
    icon: <ImageIcon size={40} />,
  },
  {
    title: "HTML to PDF",
    desc: "Convert web pages and HTML content to PDF format.",
    icon: <Code size={40} />,
  },
  {
    title: "Organize PDF",
    desc: "Rearrange, rotate, and manage your PDF pages.",
    icon: <FolderTree size={40} />,
  },
  {
    title: "Protect PDF",
    desc: "Add password protection and security to your PDF files.",
    icon: <Lock size={40} />,
  },
];

const Home = () => {
  // hovered state removed — we now use a simple hover-border via Tailwind
  const [_, setUnused] = useState(null);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center bg-gray-950 text-white px-6 pt-24">
      {/* Hero Text */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold mb-6 text-green-400"
      >
        Convert Merge Simplify
        <div className="pt-4">All Your PDFs in One Place</div>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="max-w-5xl text-gray-300 text-lg md:text-xl mb-16 leading-relaxed"
      >
        <span className="text-green-400 font-semibold">I Hate PDF</span> is your
        go-to platform for document conversion and management. Quickly transform
        files — from <strong>PDF to Word</strong>, <strong>Word to PDF</strong>,
        merging, and splitting — with ease and speed.
      </motion.p>

      {/* Cards Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.15 },
          },
        }}
        className="grid grid-cols-1 mb-10 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl"
      >
        {tools.map((tool, index) => (
          <motion.div
            key={tool.title}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            // smooth zoom on hover
            whileHover={{ scale: 1.06 }}
            transition={{ type: "tween", duration: 0.1, ease: "easeOut" }}
            className="bg-gray-900 rounded-2xl p-6 shadow-lg cursor-pointer relative overflow-hidden group border border-transparent hover:border-green-400 transition-all duration-200"
          >
            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              <div className="text-green-400">{tool.icon}</div>
              <h3 className="text-2xl font-semibold">{tool.title}</h3>
              <p className="text-gray-400 group-hover:text-white transition-colors duration-200 text-sm">
                {tool.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Upcoming Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl mt-20 mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-400">
          Upcoming Features
        </h2>
        <p className="text-gray-400 text-lg mb-12">
          Stay tuned for these exciting new tools coming soon!
        </p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {upcomingFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.06 }}
              transition={{ type: "tween", duration: 0.1, ease: "easeOut" }}
              className="bg-gray-900 rounded-2xl p-6 shadow-lg cursor-pointer relative overflow-hidden group border border-transparent hover:border-green-400 transition-all duration-200"
            >
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className="text-green-400">{feature.icon}</div>
                <h3 className="text-2xl font-semibold">{feature.title}</h3>
                <p className="text-gray-400 group-hover:text-white transition-colors duration-200 text-sm">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;
