import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "What is ClubHub?",
    answer:
      "ClubHub is a community-based platform where users can discover clubs, join events, and manage their own clubs easily.",
  },
  {
    question: "How can I join a club?",
    answer:
      "Simply create an account, browse available clubs, and send a membership request to the club you want to join.",
  },
  {
    question: "Is ClubHub free to use?",
    answer:
      "Yes, joining and exploring clubs is free. Some clubs or events may require a small membership or event fee.",
  },
  {
    question: "Who can create a club?",
    answer:
      "Any registered user can apply to create a club. Club creation requests are reviewed by the admin team.",
  },
  {
    question: "Can I manage events as a club manager?",
    answer:
      "Yes, approved club managers can create, update, and manage events and view participant registrations.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-xl"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left"
              >
                <span className="font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                <FaChevronDown
                  className={`transition-transform ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeIndex === index && (
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
