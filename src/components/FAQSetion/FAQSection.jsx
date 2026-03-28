import { useState } from "react";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext";

const faqs = [
  {
    question: "What is ClubHub?",
    answer:
      "ClubHub is a community-based platform where users can discover clubs, join events, and manage their own clubs easily with a centralized dashboard.",
  },
  {
    question: "How can I join a club?",
    answer:
      "Simply create an account, browse available clubs, and send a membership request. Once approved, you'll get access to exclusive club content and events.",
  },
  {
    question: "Is ClubHub free to use?",
    answer:
      "Yes, joining and exploring clubs is free. However, some premium clubs or specific events may require a small membership or entry fee processed securely via Stripe.",
  },
  {
    question: "Who can create a club?",
    answer:
      "Any registered user can apply to create a club. Once you submit a request, our admin team reviews it to ensure community guidelines are met.",
  },
  {
    question: "Can I manage events as a club manager?",
    answer:
      "Absolutely! Approved club managers get access to a powerful dashboard to create, update, and track event registrations and member activities.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { isDark } = useTheme();

  return (
    <section
      className={`py-24 transition-colors duration-300 ${
        isDark ? "bg-[#05010d]" : "bg-white"
      }`}
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className={`text-5xl font-black tracking-tighter uppercase mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Got{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
              Questions?
            </span>
          </h2>
          <div className="h-1.5 w-24 bg-teal-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-6">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group p-[1px] rounded-2xl overflow-hidden"
              >
                {/* --- TRACING BORDER (Only when Active) --- */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`absolute inset-[-1000%] animate-border-trace ${
                        isDark
                          ? "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ec4899_50%,transparent_100%)]"
                          : "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#0d9488_50%,transparent_100%)]"
                      }`}
                    />
                  )}
                </AnimatePresence>

                {/* Accordion Item Body */}
                <div
                  className={`relative rounded-[15px] transition-all duration-300 ${
                    isActive
                      ? isDark
                        ? "bg-[#0b041a]"
                        : "bg-white shadow-xl"
                      : isDark
                        ? "bg-white/5 border border-white/10"
                        : "bg-gray-50 border border-gray-100"
                  }`}
                >
                  <button
                    onClick={() => setActiveIndex(isActive ? null : index)}
                    className="w-full flex justify-between items-center px-8 py-6 text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-4">
                      <FaQuestionCircle
                        className={`text-xl transition-colors ${
                          isActive
                            ? isDark
                              ? "text-pink-500"
                              : "text-teal-500"
                            : "text-gray-400"
                        }`}
                      />
                      <span
                        className={`text-lg font-black tracking-tight ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {faq.question}
                      </span>
                    </div>

                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      className={`p-2 rounded-full transition-colors ${
                        isActive
                          ? isDark
                            ? "bg-pink-500/10 text-pink-500"
                            : "bg-teal-500/10 text-teal-500"
                          : "text-gray-400"
                      }`}
                    >
                      <FaChevronDown />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div
                          className={`px-8 pb-8 pt-2 text-base font-medium leading-relaxed ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          <div
                            className={`w-full h-[1px] mb-6 ${isDark ? "bg-white/10" : "bg-gray-100"}`}
                          ></div>
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
