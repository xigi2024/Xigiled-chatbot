import React from 'react';

const Footer = () => (
  <footer className="bg-[#161616] text-white px-6 py-12">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
      {/* Logo + Description */}
      <div>
        <div className="flex items-start">
          <h1 className="text-5xl font-extrabold leading-none">XIGI</h1>
          <span className="text-xs font-bold ml-1 mt-1">LED</span>
        </div>
        <p className="mt-4 text-gray-300 leading-relaxed text-sm md:text-base">
          Welcome to XIGI, where we make advertising bold and effective. Experience the future of promotion and bring your business to the next level.
        </p>
      </div>
      {/* Our Services */}
      <div>
        <h3 className="text-xl font-bold mb-4">Our Services</h3>
        <ul className="space-y-2 text-gray-300">
          <li>› DOOH</li>
          <li>› Creative</li>
          <li>› Digital</li>
          <li>› Web & Mobile</li>
        </ul>
      </div>
      {/* Menu */}
      <div>
        <h3 className="text-xl font-bold mb-4">Menu</h3>
        <ul className="space-y-2 text-gray-300">
          <li>› Services</li>
          <li>› LED</li>
          <li>› Blogs</li>
          <li>› Contact</li>
        </ul>
      </div>
      {/* Contact Info */}
      <div>
        <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
        <ul className="text-gray-300 space-y-2 text-sm md:text-base">
          <li>XIGI Tech Pvt Ltd</li>
          <li>+91 9494220622</li>
          <li>live@xigi.in</li>
          <li>
            No:204,1A,1B,Balaji Nagar,<br />
            Near Kammavar College,<br />
            Kodivilarpatti, Theni - 625534,<br />
            Tamilnadu
          </li>
        </ul>
      </div>
    </div>
    {/* Bottom Bar */}
    <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
      Copyright©2024. XIGI Tech Pvt Ltd. All Right Reserved.
    </div>
  </footer>
);

export default Footer;