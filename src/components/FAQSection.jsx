import { useState } from "react";
import { ChevronDown } from "lucide-react"; // You can use any icon library or SVG

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="bg-white rounded-lg p-4 mb-4 shadow cursor-pointer transition-all"
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center">
        <p className="font-semibold text-black">{question}</p>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transform transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>
      {open && (
        <p className="text-gray-600 mt-2 text-sm">
          {answer}
        </p>
      )}
    </div>
  );
};

export default function FAQSection() {
  const faqList = [
    {
      question: "If you can imagine it, we can build it.",
      answer:
        "Yes, we specialize in turning your ideas into real-world, scalable solutions."
    },
    {
      question: "If you can imagine it, we can build it.",
      answer:
        "Our team works with you to make your vision a reality."
    },
    {
      question: "If you can imagine it, we can build it.",
      answer:
        "We tailor each project to meet your goals and expectations."
    },
    {
      question: "If you can imagine it, we can build it.",
      answer:
        "Our experience allows us to deliver even the most complex ideas."
    }
  ];

  return (
    <section className="bg-[#EAF1FF] py-16 px-4 md:px-20">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-10">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto">
        {faqList.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </section>
  );
}
