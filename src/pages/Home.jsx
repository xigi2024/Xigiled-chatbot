import React, { useRef, useEffect, useState } from 'react'
import '../styles/Home.css';
import IN from '../assets/IN.png'
import bannervid from '../assets/videos/Xigiled.mp4'
import Header from '../components/Header';
import Footer from '../components/Footer';
import govIcon from '../assets/icon/goverment.png';
import indoorImage from '../assets/goverment.jpg';
import range from '../assets/icon/Complete_Range.gif'
import Transparent from '../assets/icon/Transparent_Pricing.gif'
import {
  Heart,
  LayoutGrid,
  Maximize2,
  Truck,
  BadgeDollarSign,
  Award, Megaphone,
  Layers,
  Eye
} from 'lucide-react';

import IN1 from '../assets/IN.png';
import IN2 from '../assets/IN.png';
import IN3 from '../assets/IN.png';



const features = [
  {
    title: "Enhanced Communication",
    desc: "Deliver powerful messages with high-impact visuals that grab attention and improve audience engagement.",
    image: IN1,
    icon: <Megaphone className="w-5 h-5 text-blue-700 mr-2" />,
  },
  {
    title: "Versatility Across Industries",
    desc: "Our solutions cater to multiple industries like retail, education, healthcare, and more with ease and flexibility.",
    image: IN2,
    icon: <Layers className="w-5 h-5 text-blue-700 mr-2" />,
  },
  {
    title: "Unmatched Visual Impact",
    desc: "Stunning visuals that captivate attention and elevate your brand presence in any space.",
    image: IN3,
    icon: <Eye className="w-5 h-5 text-blue-700 mr-2" />,
  },
];

const IndustrySection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="relative py-20 px-4 md:px-10 bg-white text-gray-900">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10">

          {/* Left: Text Content */}
          <div className="w-full md:w-6/12 order-2 md:order-1">
            <h2 className="text-4xl font-bold mb-10 leading-snug">
              One Solution. <br /> Endless Industry Applications.
            </h2>

            <div className="space-y-4">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl transition-all cursor-pointer flex flex-col ${activeIndex === idx
                    ? "bg-white shadow border-l-4 border-blue-700"
                    : "bg-transparent"
                    }`}
                  onMouseEnter={() => setActiveIndex(idx)}
                >
                  <div className="flex items-center">
                    {feature.icon}
                    <h3 className="text-lg font-semibold text-blue-800">{feature.title}</h3>
                  </div>
                  {activeIndex === idx && (
                    <p className="text-sm ml-7 text-gray-600 mt-2 font-['DM_Sans',sans-serif]">
                      {feature.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="w-full md:w-6/12 order-1 md:order-2 flex justify-center">
            <div className="w-full max-w-xl">
              {activeIndex !== null && (
                <img
                  src={features[activeIndex].image}
                  alt={features[activeIndex].title}
                  className="w-full h-auto object-cover rounded-2xl transition-all duration-500"
                />
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const serviceFeatures = [
  {
    icon: range,
    title: 'Nationwide Service',
    desc: 'Delivery, installation, and 24/7 support across India',
  },
  {
    icon: range,
    title: 'Complete Range',
    desc: 'Indoor, outdoor, truck-mounted, standees, interactive, transparent, flexible, rental, custom',
  },
  {
    icon: 'icons/service3.gif',
    title: '100% Custom-Fit',
    desc: 'Any size, pixel pitch, or creative shape tailored to your needs',
  },
  {
    icon: 'icons/service4.gif',
    title: 'Fastest Turnaround',
    desc: 'Quick delivery, easy finance, and comprehensive AMC plans',
  },
  {
    icon: Transparent,
    title: 'Transparent Pricing',
    desc: 'Certified quality with clear, upfront pricing',
  },
  {
    icon: 'icons/service6.gif',
    title: 'Trusted by 3,000+',
    desc: 'Brands, schools, institutions, and event organizers nationwide',
  },
];


const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-screen w-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          >
            <source src={bannervid} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

          <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
            <h1 className="text-5xl md:text-6xl bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent font-bold py-2">
              Brighten Every Space
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-[18px]">
              India's No.1 LED Video Wall & Display Experts. From retail stores to moving trucks, stadiums to auditoriums, events to government—Xigi LED powers your brand, message, and experience everywhere.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white mt-5 px-7 py-3 rounded-lg font-medium text-[17]">
              Get Instant Quote
            </button>
          </div>
        </div>

        {/* Why Choose Section */}
        <section className="py-27 px-4 md:px-8 bg-gradient-to-r from-white via-white to-[#f8f9fc]">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-[45px] font-semibold mb-10 text-gray-900">Why Choose Xigi LED?</h2>
            <div className="grid md:grid-cols-3 gap-10">
              {serviceFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition"
                >
                 <div className="bg-blue-100 w-14 h-14 flex items-center justify-center rounded-md mb-3">
  <img src={feature.icon} alt={feature.title} className="w-10 h-10 object-contain" />
</div>
                  <h3 className="font-semibold text-[23px] text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-[17px] text-gray-800 font-['DM_Sans',sans-serif]">{feature.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-md shadow-md text-sm font-medium">
                See Our Client Stories
              </button>
            </div>
          </div>
        </section>

        {/* New LED Display Range Section */}
        <section className="py-27 px-4 md:px-8 bg-[#F1F5F9]">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-[45px] font-semibold pb-10 text-center text-gray-900">
              Our Complete Range
            </h2>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Main Column - 9/12 */}
              <div className="w-full md:w-9/12 flex flex-col gap-4">

                {/* Row 1 – 3 boxes with different widths */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
                    <img src="/images/indoor-led-wall.jpg" className="w-full h-40 object-cover" alt="Indoor LED Wall" />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">Indoor LED Wall</h3>
                      
                    </div>
                  </div>
                  <div className="w-1/4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
                    <img src="/images/outdoor-led.jpg" className="w-full h-40 object-cover" alt="Outdoor LED Starter" />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">Outdoor LED Starter</h3>
                    </div>
                  </div>
                  <div className="w-1/3 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
                    <img src="/images/interactive-display.jpg" className="w-full h-40 object-cover" alt="Interactive LED Display" />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">Interactive LED Display</h3>
                    </div>
                  </div>
                </div>

                {/* Row 2 – 40% + 60% */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-[40%] bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
                    <img src="/images/transparent-led.jpg" className="w-full h-40 object-cover" alt="Transparent LED" />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">Transparent</h3>
                      <p className="text-gray-600 text-sm">See-through displays for store windows</p>
                    </div>
                  </div>
                  <div className="w-[60%] bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
                    <img src="/images/led-standee.jpg" className="w-full h-40 object-cover" alt="LED Standee Displays" />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">LED Standee Displays</h3>
                      <p className="text-gray-600 text-sm">Freestanding displays for exhibitions and retail spaces</p>
                    </div>
                  </div>
                </div>

                {/* Row 3 – 60% + 40% */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-[60%] bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
                    <img src="/images/xigi-display.jpg" className="w-full h-40 object-cover" alt="Xigi LED Technology" />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">Xigi</h3>
                      <p className="text-gray-600 text-sm">Our flagship high-performance LED technology</p>
                    </div>
                  </div>
                  <div className="w-[40%] bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
                    <img src="/images/flexible-led.jpg" className="w-full h-40 object-cover" alt="Flexible & Curved" />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">Flexible & Curved</h3>
                      <p className="text-gray-600 text-sm">Bendable displays for creative installations</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar - 3/12, Equal height with left */}
              <div className="w-full md:w-3/12 flex flex-col gap-4">
                <div className="flex flex-col h-full min-h-[700px] gap-4">
                  <div className="flex-1 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
                    <img
                      src="/images/truck-mounted.jpg"
                      className="w-full h-40 object-cover"
                      alt="Truck Mounted LED"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">Truck Mounted</h3>
                      <p className="text-gray-600 text-sm">Mobile advertising displays</p>
                    </div>
                  </div>

                  <div className="flex-1 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
                    <img
                      src="/images/custom-solutions.jpg"
                      className="w-full h-40 object-cover"
                      alt="Custom LED Solutions"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">Custom LED Solutions</h3>
                      <p className="text-gray-600 text-sm">Tailored displays for unique requirements</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Our Complete Range Section */}
        <section className="w-full py-20 px-4 bg-gradient-to-br from-[#e3ecfa] to-[#c7d7f5]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
            {/* Left: Text Content */}
            <div className="w-full md:w-4/12 flex flex-col justify-center">
              <h2 className="text-[40px] font-extrabold text-gray-900 mb-4 leading-snug font-['Poppins',sans-serif]">
                Our Complete <br /> Range
              </h2>
              <p className="text-[17px] text-gray-800 font-['DM_Sans',sans-serif] leading-relaxed  mb-6 mr-10">
                Creating immersive audio-visual experiences at concerts and events. AV technology blends sound and visuals for maximum impact.
              </p>
              <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white mr-10 py-3 rounded-xl font-semibold text-base shadow hover:from-blue-700 hover:to-blue-900 transition-all">
                Our Products
              </button>
            </div>

            {/* Right: Product Cards */}
            <div className="w-full md:w-8/12 flex justify-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  {
                    title: "Government & Public Spaces",
                    icon: govIcon,
                    image: indoorImage,
                  },
                  {
                    title: "Events & Exhibitions",
                    icon: "/images/icons/outdoor.png",
                    image: "/images/full/outdoor.png",
                  },
                  {
                    title: "Retail Environments",
                    icon: "/images/icons/truck.png",
                    image: "/images/full/truck.png",
                  },
                  {
                    title: "Corporate Offices",
                    icon: "/images/icons/standee.png",
                    image: "/images/full/standee.png",
                  },
                  {
                    title: "Transparent LED Displays",
                    icon: "/images/icons/transparent.png",
                    image: "/images/full/transparent.png",
                  },
                  {
                    title: "Interactive LED Displays",
                    icon: "/images/icons/interactive.png",
                    image: "/images/full/interactive.png",
                  },
                  {
                    title: "Flexible & Curved LED Walls",
                    icon: "/images/icons/flexible.png",
                    image: "/images/full/flexible.png",
                  },
                  {
                    title: "Flexible & Curved LED Walls",
                    icon: "/images/icons/flexible.png",
                    image: "/images/full/flexible.png",
                  },
                ].map((product, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl shadow flex flex-col items-center justify-center text-center p-6 font-bold text-black text-[15px] min-h-[180px] hover:shadow-lg transition-all relative group overflow-hidden"
                  >
                    {/* Default Small Icon */}
                    <img
                      src={product.icon}
                      alt={product.title}
                      className="w-18 h-18 mb-5 transition-all duration-300 group-hover:opacity-0 z-20"
                    />
                    {/* Full Image on Hover */}
                    <img
                      src={product.image}
                      alt={product.title + ' Large'}
                      className="absolute inset-0 w-full h-full object-cover bg-black  opacity-4 group-hover:opacity-100 transition-all duration-300 z-10"
                    />
                    <span className="relative z-20 group-hover:text-white transition-all duration-300">
                      {product.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* Support Section */}
        <section
          className="relative py-20 px-4 md:px-8 text-white"
          style={{
            backgroundImage: `url('../src/assets/heroimg.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-start mb-12 flex-wrap gap-4">
              <h2 className="text-3xl md:text-[40px] font-semibold max-w-lg">
                Our support team is here to assist you anytime
              </h2>
              <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition">
                Get Product Help
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Card 1 */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white">
                <div className="flex flex-col items-start gap-4">
                  <div className="bg-white/20 p-5 rounded-full">
                    <img src={govIcon} alt="Product Support" className="w-10 h-10 " />
                  </div>
                  <div>
                    <h3 className="text-[22px] font-semibold mb-2">Product Support</h3>
                    <p className="text-[17px] font-['DM_Sans',sans-serif] text-white/100">
                      Need help with your product? Let us provide you with the support you need to get back on track.
                      Our team is always ready to assist you with quick and reliable solutions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white">
                <div className="flex flex-col items-start gap-4">
                  <div className="bg-white/20 p-5 rounded-full">
                    <img src={govIcon} alt="Technical Support" className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-[22px] font-semibold mb-2">Technical Support</h3>
                    <p className="text-[17px] font-['DM_Sans',sans-serif] text-white/100">
                      Facing a technical issue? Our expert support team is here to help you troubleshoot and resolve problems quickly and efficiently. Reach out anytime for reliable assistance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Applications Section */}
        <IndustrySection />

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
      </main>
      <Footer />
    </div>
  );
};

export default Home;