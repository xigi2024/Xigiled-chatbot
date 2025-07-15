import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="bg-[#EAF1FF] rounded-lg p-4 mb-4 shadow cursor-pointer transition-all"
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center">
        <p className="text-black text-[15px] md:text-[17px] font-['Montserrat',sans-serif] font-medium">{question}</p>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transform transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </div>
      {open && (
        <div className="mt-4 text-gray-600 text-[14px] md:text-[16px] font-['Montserrat',sans-serif] font-medium">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQSection = () => {
  const faqList = [
    {
      question: 'What types of LED displays do you offer?',
      answer: 'We offer a wide range of LED displays including indoor LED walls, outdoor LED walls, standee LED walls, truck-mounted LED walls, and interactive LED displays. Each type is designed for specific use cases and environments.'
    },
    {
      question: 'How long does installation take?',
      answer: 'Installation time varies depending on the type and size of the LED display. Typically, a standard installation can take anywhere from 1-3 days. We provide a detailed timeline during the consultation phase.'
    },
    {
      question: 'Do you provide maintenance services?',
      answer: 'Yes, we offer comprehensive maintenance services including regular check-ups, repairs, and 24/7 technical support. We also provide AMC (Annual Maintenance Contract) options for long-term care.'
    },
    {
      question: 'What is the warranty period?',
      answer: 'Our LED displays come with a standard warranty period of 2 years. Extended warranty options are available for purchase. The warranty covers manufacturing defects and component failures.'
    },
    {
      question: 'Can you customize the display size?',
      answer: 'Yes, we can customize the display size according to your specific requirements. Our team will work with you to determine the optimal size based on your space and viewing distance.'
    }
  ];

  return (
    <section className="bg-[#fff] py-10 md:py-27 px-4 md:px-20">
      <h2 className="text-center text-2xl md:text-[45px] font-semibold mb-8 md:mb-10">
        Frequently Asked Questions
      </h2>
      <div className="max-w-4xl mx-auto">
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
};

export default FAQSection;
