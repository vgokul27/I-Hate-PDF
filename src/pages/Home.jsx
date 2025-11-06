import { motion } from "framer-motion";

const Home = () => {
  return (
    <section className="min-h-screen flex flex-col items-center text-center bg-gray-950 text-white px-6">
      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-6xl font-extrabold mb-8 pt-32 lg:pl-12 lg:pr-12 text-green-400"
      >
        Convert Merge Simplify 
        <div className="pt-4 text-2xl md:text-6xl"> All Your PDFs in One Place</div>
      </motion.h1>

      {/* Animated Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="max-w-6xl text-gray-300 text-md md:text-xl mb-10 leading-relaxed"
      >
        <span className="text-green-400 font-semibold">I Hate PDF</span> is your
        all-in-one solution for managing and converting documents. Effortlessly
        transform your files — from <strong>PDF to Word</strong>,{" "}
        <strong>Word to PDF</strong>, and more — with speed, precision, and
        privacy. No installation needed, just upload and convert instantly.
      </motion.p>

      {/* Animated Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="bg-green-500 hover:bg-green-400 text-gray-900 font-semibold py-3 px-8 rounded-full shadow-md transition"
      >
        Get Started
      </motion.button>
    </section>
  );
};

export default Home;
