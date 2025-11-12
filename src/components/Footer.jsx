import { motion } from "framer-motion";
import {
  Github,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Globe,
  Apple,
  PlaySquare,
} from "lucide-react";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-900 text-gray-300 pt-16 pb-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-10 sm:px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 text-left">
        {/* Columns: Product, Resources, Solutions, Legal, Company */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white tracking-wider">
            PRODUCT
          </h4>
          <ul className="text-xs space-y-2 mt-3 text-gray-300 lg:text-[16px]">
            <li className="hover:text-green-400 transition cursor-pointer">
              Home
            </li>
            <li className="hover:text-green-400 transition cursor-pointer">
              Features
            </li>
            <li className="hover:text-green-400 transition cursor-pointer">
              Tools
            </li>
            <li className="hover:text-green-400 transition cursor-pointer">
              FAQ
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white tracking-wider">
            RESOURCES
          </h4>
          <ul className="space-y-2 mt-3 text-gray-300 text-xs lg:text-[16px]">
            <li className="hover:text-green-400 transition cursor-pointer">
              iHatePDF Desktop
            </li>
            <li className="hover:text-green-400 transition cursor-pointer">
              iHatePDF Mobile
            </li>
            <li className="hover:text-green-400 transition cursor-pointer">
              iHate Sign
            </li>
            <li className="hover:text-green-400 transition cursor-pointer">
              iHate IMG
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white tracking-wider">
            SOLUTIONS
          </h4>
          <ul className="text-xs space-y-2 mt-3 text-gray-300 lg:text-[16px]">
            <li className="hover:text-green-400 transition cursor-pointer">
              Business
            </li>
            <li className="hover:text-green-400 transition cursor-pointer">
              Education
            </li>
            <li className="hover:text-green-400 transition cursor-pointer">
              Personal
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white tracking-wider">
            LEGAL
          </h4>
          <ul className="text-xs space-y-2 mt-3 text-gray-300 lg:text-[16px]">
            <li className="hover:text-green-400 transition cursor-pointer">
              Security
            </li>
            <li className="hover:text-green-400 transition cursor-pointer">
              Privacy policy
            </li>
            <li className="hover:text-green-400 transition cursor-pointer">
              Terms &amp; conditions
            </li>
            <li className="hover:text-green-400 transition cursor-pointer">
              Cookies
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white tracking-wider">
            COMPANY
          </h4>
          <ul className="text-xs space-y-2 mt-3 text-gray-300 lg:text-[16px]">
            <li className="hover:text-green-400 transition cursor-pointer">
              About us
            </li>
            <li className="hover:text-green-400 transition cursor-pointer">
              Contact us
            </li>
            <li className="hover:text-green-400 transition cursor-pointer">
              Blog
            </li>
            <li className="hover:text-green-400 transition cursor-pointer">
              Press
            </li>
          </ul>
        </div>

        {/* App store buttons column */}
        <div className="flex flex-col items-start sm:items-end space-y-3">
          <a className="w-28 sm:w-32 md:w-40 border border-gray-700 rounded-lg px-2 md:px-4 py-1 md:py-2 flex items-center space-x-2 md:space-x-3 hover:border-green-400 transition cursor-pointer">
            <PlaySquare className="w-4 h-4 md:w-6 md:h-6 text-green-400 flex-shrink-0" />
            <span className="text-left">
              <div className="text-[10px] md:text-xs text-gray-400 whitespace-nowrap">
                Get it on
              </div>
              <div className="text-[10px] md:text-xs font-semibold text-white whitespace-nowrap">
                Google Play
              </div>
            </span>
          </a>

          <a className="w-28 sm:w-32 md:w-40 border border-gray-700 rounded-lg px-2 md:px-4 py-1 md:py-2 flex items-center space-x-2 md:space-x-3 hover:border-green-400 transition cursor-pointer">
            <Apple className="w-4 h-4 md:w-6 md:h-6 text-green-400 flex-shrink-0" />
            <span className="text-left">
              <div className="text-[10px] md:text-xs text-gray-400 whitespace-nowrap">
                Download on the
              </div>
              <div className="text-[10px] md:text-xs font-semibold text-white whitespace-nowrap">
                App Store
              </div>
            </span>
          </a>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6">
        <div className="max-w-6xl mx-auto px-6 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Language selector */}
          <div className="flex items-center space-x-2">
            <button className="border border-gray-700 rounded-lg px-3 sm:px-4 py-2 flex items-center space-x-2 text-sm hover:border-green-400 transition">
              <Globe className="w-4 h-4 text-gray-300" />
              <span className="text-gray-300 font-medium">English</span>
            </button>
          </div>

          {/* Social icons center */}
          <div className="flex items-center space-x-4 sm:space-x-6 text-gray-300">
            <Twitter className="w-5 h-5 sm:w-6 sm:h-6 hover:text-green-400 transition cursor-pointer" />
            <Facebook className="w-5 h-5 sm:w-6 sm:h-6 hover:text-green-400 transition cursor-pointer" />
            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 hover:text-green-400 transition cursor-pointer" />
            <Instagram className="w-5 h-5 sm:w-6 sm:h-6 hover:text-green-400 transition cursor-pointer" />
          </div>

          {/* Copyright */}
          <div className="text-xs sm:text-sm text-gray-400 text-center md:text-right">
            © {new Date().getFullYear()} I Hate PDF — All Rights Reserved —
            Built by GOKUL
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
