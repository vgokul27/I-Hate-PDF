import { motion } from "framer-motion";
import { Github, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-900 text-gray-300 py-10 mt-20"
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-24 text-center md:text-left">
        {/* Logo + Slogan */}
        <div>
          <Link
            to="/"
            className="text-2xl font-bold text-green-400 hover:text-green-300"
          >
            I Hate PDF
          </Link>
          <p className="text-sm text-gray-400 mt-2">
            Simplifying document conversions — fast, free, and secure.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-green-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/tools" className="hover:text-green-400 transition">
                Tools
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-green-400 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-400 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-6">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-400 transition"
            >
              <Github />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-400 transition"
            >
              <Instagram />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-400 transition"
            >
              <Twitter />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} I Hate PDF — All Rights Reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
