import { motion } from "framer-motion";
import { useState } from "react";
import { FilePlus, FileMinus, FileText, Scissors } from "lucide-react";

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

const Home = () => {
  // hovered state removed — we now use a simple hover-border via Tailwind
  const [_, setUnused] = useState(null);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center bg-gray-950 text-white px-6">
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
    </section>
  );
};

export default Home;
