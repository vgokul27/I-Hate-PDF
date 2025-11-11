import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FilePlus,
  FileText,
  FileMinus,
  Scissors,
  ShieldCheck,
  Users,
} from "lucide-react";

const features = [
  {
    title: "Merge & Split",
    desc: "Combine or extract pages quickly and reliably.",
    icon: <FilePlus />,
  },
  {
    title: "Convert",
    desc: "PDF ⇄ Word, images, and other popular formats.",
    icon: <FileText />,
  },
  {
    title: "Create PDFs",
    desc: "Generate professional PDFs from documents or images.",
    icon: <FileMinus />,
  },
  {
    title: "Edit & Sign",
    desc: "Annotate, sign and manage documents with ease.",
    icon: <Scissors />,
  },
];

const About = () => {
  return (
    <section className="min-h-screen bg-gray-950 text-white px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 mb-4">
          About I Hate PDF
        </h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg mb-8">
          I Hate PDF was built to make document tasks simple, fast and
          accessible for everyone. We focus on reliable file conversions,
          straightforward tools, and strong privacy practices so you can manage
          documents without frustration.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Our mission</h2>
          <p className="text-gray-300">
            To remove friction from everyday document workflows — whether you're
            a student, professional, or business. We build fast,
            privacy-conscious tools that just work.
          </p>

          <h3 className="text-xl font-semibold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-400" /> Security &
            Privacy
          </h3>
          <p className="text-gray-300">
            We prioritize privacy: files are processed securely and retained
            only as long as necessary. For detailed info see our{" "}
            <Link to="/privacy" className="text-green-400 underline">
              Privacy Policy
            </Link>
            .
          </p>

          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Users className="w-5 h-5 text-green-400" /> Team & Community
          </h3>
          <p className="text-gray-300">
            Small, focused team committed to great UX and reliable performance.
            We welcome feedback and contributions — visit our{" "}
            <Link to="/contact" className="text-green-400 underline">
              Contact page
            </Link>
            .
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">What we offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-gray-900 rounded-2xl p-4 flex items-start gap-4"
              >
                <div className="text-green-400 mt-1">{f.icon}</div>
                <div>
                  <h4 className="font-semibold">{f.title}</h4>
                  <p className="text-gray-400 text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Get started</h3>
            <p className="text-gray-300 mb-4">
              Try our most popular tools on the{" "}
              <Link to="/" className="text-green-400">
                Home Page
              </Link>
              .
            </p>
            <div
              className="inline-block bg-green-400 text-gray-900 font-semibold px-5 py-2 rounded-lg shadow cursor-pointer hover:opacity-95 transition"
            >
              Contact Us
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto mt-12 text-center text-sm text-gray-400">
        <p>
          © {new Date().getFullYear()} I Hate PDF — Built with focus on
          simplicity, performance and privacy.
        </p>
      </div>
    </section>
  );
};

export default About;
