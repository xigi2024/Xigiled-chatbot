import React, { useRef, useEffect, useState } from 'react'
import {  useNavigate } from "react-router-dom";
import Footer from '../components/Footer'
import Header from '../components/Header'
import cta from '../assets/cta.png';
import event from '../assets/events.webp';

const ShowcaseSlider = ({ showcaseData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (showcaseData?.images?.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % showcaseData.images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showcaseData]);

  if (!showcaseData?.images) {
    return <div>Loading showcase...</div>;
  }

  return (
    <section className="bg-blue-100 py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-[45px] font-semibold text-black">{showcaseData.title}</h2>
          <button className="bg-blue-900 text-white px-4 py-2 rounded-lg font-medium text-sm">
            View All
          </button>
        </div>

        <div className="flex flex-col md:flex-row bg-blue-200 rounded-xl overflow-hidden">
          {/* Left Menu */}
          <div className="w-full md:w-1/3 p-10 space-y-4">
            {showcaseData.images.map((item, index) => (
              <div
                key={index}
                className={`text-[20px] font-medium cursor-pointer transition-colors duration-300 ${
                  index === currentIndex ? 'text-blue-700' : 'text-black'
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                {item.title}
              </div>
            ))}
          </div>

          {/* Vertical Divider Line */}
          <div className="hidden md:flex items-center justify-center ">
            <div className="w-[8px] h-125 rounded-2xl bg-blue-400"></div>
          </div>

          {/* Right Content */}
          <div className="relative w-full md:w-2/3 p-10">
            <img
              src={`http://127.0.0.1:8000/storage/${showcaseData.images[currentIndex].image}`}
              alt={showcaseData.images[currentIndex].title}
              className="w-full h-[400px] object-cover rounded-xl"
            />
            <div className="mt-4">
              <h3 className="text-[22px] font-semibold text-black">
                {showcaseData.images[currentIndex].title}
              </h3>
              <p className="text-[17px] text-gray-900 mb-3 font-['Montserrat',sans-serif] font-medium">
                {showcaseData.images[currentIndex].description || showcaseData.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const EventsExhibitions = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/event-exhibitions');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setApiData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to get section data by section name
  const getSectionData = (sectionName) => {
    return apiData.find(item => item.section === sectionName);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  }

  const heroSection = getSectionData('event_exhibition_section1');
  const smartDisplaySection = getSectionData('event_exhibition_section2');
  const mountingSection = getSectionData('event_exhibition_section3');
  const showcaseSection = getSectionData('event_exhibition_section4');
  const featuresSection = getSectionData('event_exhibition_section5');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Banner Section */}
      <div className="relative h-[70vh] w-full">
        <img
          src={event}
          alt="Events banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-semibold text-white text-center">
            Events & Exhibitions
          </h1>
        </div>
      </div>

      {/* Hero Section */}
      {heroSection && (
        <section className="py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27 bg-white">
          <div className="container mx-auto grid md:grid-cols-2 gap-20 items-center">
            {/* Left Image */}
            <div className="flex justify-center">
              <img
                src={`http://127.0.0.1:8000/storage/${heroSection.images[0].image}`}
                alt={heroSection.title}
                className="w-full h-[300px] md:h-[500px] lg:h-[500px] rounded-2xl object-cover"
              />
            </div>

            {/* Right Content */}
            <div>
              <h2 className="text-3xl md:text-[45px] font-semibold mb-4">
                {heroSection.title}
              </h2>
              <p className="text-gray-900 text-[17px] mb-6 leading-relaxed font-['Montserrat',sans-serif] font-medium">
                {heroSection.description}
              </p>
          
            </div>
          </div>
        </section>
      )}

      {/* Smart Display Types Section */}
      {smartDisplaySection && (
        <section className="bg-[#EAF1FF] py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-28">
          {/* Section Heading */}
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-[45px] font-semibold mb-2">
              {smartDisplaySection.title}
            </h2>
            {smartDisplaySection.description && (
              <p className="text-gray-900 max-w-2xl text-[17px] mx-auto font-['Montserrat',sans-serif] font-medium">
                {smartDisplaySection.description}
              </p>
            )}
          </div>

          {/* Display Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {smartDisplaySection.images.map((item, index) => (
              <div key={index} className="bg-black rounded-xl overflow-hidden shadow-md">
                <img
                  src={`http://127.0.0.1:8000/storage/${item.image}`}
                  alt={item.title}
                  className="w-full h-[230px] object-cover"
                />
                <div className="text-center py-4">
                  <p className="text-white font-['Montserrat',sans-serif] font-medium">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Mounting Section */}
      {mountingSection && (
        <section className="bg-white py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27">
          {/* Section Heading */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-[45px] font-semibold text-gray-900">
              {mountingSection.title}
            </h2>
            {mountingSection.description && (
              <p className="text-gray-900 max-w-2xl text-[17px] mx-auto font-['Montserrat',sans-serif] font-medium">
                {mountingSection.description}
              </p>
            )}
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {mountingSection.images.map((item, index) => (
              <div key={index} className="bg-[#EAF1FF] rounded-xl overflow-hidden shadow-md">
                <img
                  src={`http://127.0.0.1:8000/storage/${item.image}`}
                  alt={item.title}
                  className="w-full h-64 md:h-70 lg:h-100 object-cover"
                />
                <div className="text-center p-4">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Showcase Slider */}
      {showcaseSection && <ShowcaseSlider showcaseData={showcaseSection} />}

      {/* Features Section */}
      {featuresSection && (
        <section className="py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27 bg-white flex flex-col items-center">
          <h2 className="text-[45px] font-semibold text-center mb-5">{featuresSection.title}</h2>

          <div className="container grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Column 1: First feature (full height) */}
            {featuresSection.images[0] && (
              <div className="space-y-5">
                <div className="relative h-[600px] rounded-xl overflow-hidden">
                  <img
                    src={`http://127.0.0.1:8000/storage/${featuresSection.images[0].image}`}
                    alt={featuresSection.images[0].title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                    {featuresSection.images[0].title}
                  </div>
                </div>
              </div>
            )}

            {/* Column 2: Two features stacked */}
            <div className="space-y-5">
              {featuresSection.images[1] && (
                <div className="relative h-[250px] rounded-xl overflow-hidden">
                  <img
                    src={`http://127.0.0.1:8000/storage/${featuresSection.images[1].image}`}
                    alt={featuresSection.images[1].title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                    {featuresSection.images[1].title}
                  </div>
                </div>
              )}
              {featuresSection.images[2] && (
                <div className="relative h-[330px] rounded-xl overflow-hidden">
                  <img
                    src={`http://127.0.0.1:8000/storage/${featuresSection.images[2].image}`}
                    alt={featuresSection.images[2].title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                    {featuresSection.images[2].title}
                  </div>
                </div>
              )}
            </div>

            {/* Column 3: Two features stacked */}
            <div className="space-y-5">
              {featuresSection.images[3] && (
                <div className="relative h-[330px] rounded-xl overflow-hidden">
                  <img
                    src={`http://127.0.0.1:8000/storage/${featuresSection.images[3].image}`}
                    alt={featuresSection.images[3].title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                    {featuresSection.images[3].title}
                  </div>
                </div>
              )}
              {featuresSection.images[4] && (
                <div className="relative h-[250px] rounded-xl overflow-hidden">
                  <img
                    src={`http://127.0.0.1:8000/storage/${featuresSection.images[4].image}`}
                    alt={featuresSection.images[4].title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                    {featuresSection.images[4].title}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="w-full bg-[#f2f2fd] py-27 px-4">
        <div className="container mx-auto bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row items-center">
          {/* Left Image */}
          <div className="w-full md:w-1/2 h-[300px] md:h-[500px]">
            <img
              src={cta}
              alt="DOOH Display"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="w-full md:w-1/2 p-8 md:p-12 text-center md:text-left">
            <h2 className="text-3xl md:text-[45px] font-semibold text-black mb-2">
              Ready to Transform Your Events?
            </h2>
            <p className="text-gray-700 mb-6 text-base md:text-[17px] font-['Montserrat',sans-serif] font-medium">
              With Xigi LED displays, create memorable experiences that captivate your audience and elevate your events to the next level.
            </p>
            <button   onClick={() => navigate('/contact')}
             className="bg-gradient-to-r from-blue-600 to-indigo-600 cursor-pointer hover:from-indigo-700 hover:to-blue-700 text-white px-7 py-3 rounded-md shadow-md text-[16px] font-medium transition-all duration-300">
              See Solutions for Your Events
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default EventsExhibitions;