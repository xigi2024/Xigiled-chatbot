import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // ✅ Import WhatsApp icon

const WhatsAppFloating = () => {
  const phoneNumber = '9494220622';

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed lg:bottom-[100px] md:bottom-[180px] bottom-[150px] right-[30px] z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsAppFloating;
