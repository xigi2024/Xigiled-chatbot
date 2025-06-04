import React, { useRef, useEffect,useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import tiger from '../assets/Products/img1.jpg'
import featureImage from '../assets/Products/img1.jpg'
import {
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// image urls
import partyhall from '../assets/industry/partyhall.jpg';
import conference from '../assets/industry/conference.jpg';
import exhibition from '../assets/industry/exhibition.jpg';


const ShowcaseSection = () => {
  const showcases = [
    {
      url: partyhall, // Place your image in public/images
      title: "Party Hall",
    },
    {
      url: conference,
      title: "Conference Room",
    },
    {
      url: exhibition,
      title: "Exhibition Zone",
    },
  ];

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % showcases.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + showcases.length) % showcases.length);
  };

  return (
    <section className="bg-[#eaf2fe] py-16 px-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center mb-10">For Showcase</h2>

      <div className="relative w-full max-w-7xl h-[550px]  max-h-2xl rounded-xl overflow-hidden">
        <img
          src={showcases[current].url}
          alt={showcases[current].title}
          className="w-full h-auto object-cover rounded-xl"
        />

        {/* Left arrow */}
        <button
          onClick={prev}
          className="absolute top-1/2 -translate-y-1/2 left-3 bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-100"
        >
          <ChevronLeft />
        </button>

        {/* Right arrow */}
        <button
          onClick={next}
          className="absolute top-1/2 -translate-y-1/2 right-3 bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-100"
        >
          <ChevronRight />
        </button>

        {/* Caption */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-lg font-semibold bg-black/60 px-6 py-2 rounded-full">
          {showcases[current].title}
        </div>
      </div>
    </section>
  );
};

const Government = () => {
  return (
    <div className="min-h-screen flex flex-col">
    <Header />
  {/* Banner Section */}
      <div className="relative h-[60vh] w-full">
        <img
          src="/images/industry-banner.jpg"
          alt="Industry Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
          Government & Public Spaces 
          </h1>
        </div>
      </div>
      <section className="py-16 px-4 md:px-20 bg-white">
<div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
  {/* Left Image */}
  <div className="flex justify-center">
    <img
      src={tiger} // Change to your actual image path
      alt="Tiger Display"
      className="w-90 h-[500px] max-w-md"
    />
  </div>

  {/* Right Content */}
  <div>
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      Government & Public Spaces {" "}
      <span className="bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
      Public Spaces 
      </span>
    </h2>
    <p className="text-gray-700 mb-6 leading-relaxed">
      At XIGI Tech, we deliver tailored digital solutions across a wide
      range of industries — from retail and real estate to education and
      entertainment. Our technology adapts to your unique needs, helping
      you connect, engage, and grow in today's fast-moving digital world.
    </p>
    <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded transition">
      Experience Seamless
    </button>
  </div>
</div>
</section>

<section className="bg-[#EAF1FF] py-16 px-4 md:px-30">
  {/* Section Heading */}
  <div className="text-center mb-10">
    <h2 className="text-2xl md:text-3xl font-bold mb-2">
      Smart Displays for Smarter Governance
    </h2>
    <p className="text-gray-700 max-w-2xl mx-auto">
      A smart city project uses transparent LED in city squares for community updates and live streams
    </p>
  </div>

  {/* Display Cards */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
    {/* Card 1 */}
    <div className="bg-black rounded-xl overflow-hidden shadow-md">
      <img
        src="/images/smart1.png" // 🔁 Replace with your image path
        alt="Civic news"
        className="w-full h-[230px] object-cover"
      />
      <div className="text-center py-4">
        <p className="text-white font-semibold">Civic news</p>
      </div>
    </div>

    {/* Card 2 */}
    <div className="bg-black rounded-xl overflow-hidden shadow-md">
      <img
        src="/images/smart1.png"
        alt="Digital Hoardings"
        className="w-full h-[230px] object-cover"
      />
      <div className="text-center py-4">
        <p className="text-white font-semibold">Digital Hoardings</p>
      </div>
    </div>

    {/* Card 3 */}
    <div className="bg-black rounded-xl overflow-hidden shadow-md">
      <img
        src="/images/smart1.png"
        alt="Public Alerts"
        className="w-full h-[230px] object-cover"
      />
      <div className="text-center py-4">
        <p className="text-white font-semibold">Public Alerts</p>
      </div>
    </div>

    {/* Card 4 */}
    <div className="bg-black rounded-xl overflow-hidden shadow-md">
      <img
        src="/images/smart1.png"
        alt="Standard LED for GOV"
        className="w-full h-[230px] object-cover"
      />
      <div className="text-center py-4">
        <p className="text-white font-semibold">Standard LED for GOV</p>
      </div>
    </div>
  </div>
</section>

<section className="bg-white py-16 px-4 md:px-20">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-12">
          Hanging and Stacking Installation
        </h2>

        {/* Cards Container */}
        <div className="grid grid-cols-1 h-[550px] md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={tiger} // 🔁 Replace with actual image path
              alt="Smart Cities"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
              Smart Cities
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={tiger}  // 🔁 Replace with actual image path
              alt="Smart Communication"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
              Smart Communication
            </div>
          </div>
        </div>
      </div>
    </section>

<ShowcaseSection />

<section className="py-16 bg-white px-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center mb-10">Features</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl w-full">
        {/* Big Left Card */}
        <div className="md:row-span-2">
          <div className="relative h-full  rounded-xl overflow-hidden">
            <img
              src={featureImage}
              alt="High-definition"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
              High-definition
            </div>
          </div>
        </div>

        {/* Top Right - Small Cards */}
        <div className="grid grid-cols-2 gap-4 md:col-span-2">
          {["seamless", "wide angle", "vibrant color", "ultra-thin"].map((label, index) => (
            <div
              key={index}
              className="relative h-70 rounded-xl overflow-hidden"
            >
              <img
                src={featureImage}
                alt={label}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute bottom-4 left-3 text-white text-sm font-semibold">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

  {/* Content Section */}
  <section className="w-full bg-[#f2f2fd] py-16 px-4">
          <div className="max-w-7xl mx-auto bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row items-center">
            
            {/* Left Image */}
            <div className="w-full md:w-1/2 h-[300px] md:h-[400px]">
              <img
                src="/your-image-path.png" // replace with actual image path
                alt="DOOH Display"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Content */}
            <div className="w-full md:w-1/2 p-8 md:p-12 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Ready to Transform Your <br className="hidden md:block" /> Advertising?
              </h2>
              <p className="text-gray-700 mb-6 text-base md:text-lg">
                With Xigi DOOH, you're not just getting ad space – you're gaining a partner committed to elevating your brand
              </p>
              <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl text-base md:text-lg font-semibold transition">
                See Solutions for Your Industry
              </button>
            </div>
            
          </div>
        </section>
<Footer />
</div>
  )
}

export default Government