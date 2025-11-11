import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { name: "Merge PDF", path: "/merge-pdf" },
    { name: "PDF to Word", path: "/pdf-to-word" },
    { name: "Word to PDF", path: "/word-to-pdf" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white px-6 py-4 shadow-md z-50">
      <div className="flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-green-400 hover:text-green-300 transition"
          onClick={() => setIsOpen(false)}
        >
          I Hate PDF
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 text-lg">
          {links.map((link) => (
            <li
              key={link.name}
              className="hover:text-green-400 transition duration-300 cursor-pointer"
            >
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen(true)}
        >
          <Menu />
        </button>
      </div>

      {/* Sidebar for Mobile */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            ></motion.div>

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white shadow-lg flex flex-col p-6 z-50"
            >
              {/* Close Button */}
              <div className="flex justify-between items-center mb-8">
                <div className="text-2xl font-bold text-green-400">
                  I Hate PDF
                </div>
                <button className="text-2xl" onClick={() => setIsOpen(false)}>
                  <X />
                </button>
              </div>

              {/* Sidebar Links */}
              <ul className="space-y-6 text-lg">
                {links.map((link) => (
                  <motion.li
                    key={link.name}
                    whileHover={{ scale: 1.1, color: "#22c55e" }}
                    className="cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to={link.path}>{link.name}</Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
