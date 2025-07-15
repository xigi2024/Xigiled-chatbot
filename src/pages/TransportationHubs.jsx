import React, { useRef, useEffect, useState } from 'react'
import {  useNavigate } from "react-router-dom";
import Footer from '../components/Footer'
import Header from '../components/Header'
import cta from '../assets/cta.png';
import transport from '../assets/transport.webp';

const API_BASE_URL = 'http://127.0.0.1:8000/api/transport-public-venues';

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

  if (!showcaseData?.images?.length) return null;

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
              {showcaseData.images[currentIndex].description && (
                <p className="text-[17px] text-gray-900 mb-3 font-['Montserrat',sans-serif] font-medium">
                  {showcaseData.images[currentIndex].description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TransportationHubs = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        if (result.status === 'success') {
          setApiData(result.data);
        } else {
          throw new Error('API returned error status');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  const section1Data = getSectionData('transport_public_venue_section1');
  const section2Data = getSectionData('transport_public_venue_section2');
  const section3Data = getSectionData('transport_public_venue_section3');
  const section4Data = getSectionData('transport_public_venue_section4');
  const section5Data = getSectionData('transport_public_venue_section5');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Banner Section */}
      <div className="relative h-[70vh] w-full">
        <img
          src={transport}
          alt="Industry Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-semibold text-white text-center">
            Transportation Hubs
          </h1>
        </div>
      </div>

      {/* Section 1 - Main Content */}
      {section1Data && (
        <section className="py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27 bg-white">
          <div className="container mx-auto grid md:grid-cols-2 gap-20 items-center">
            {/* Left Image */}
            <div className="flex justify-center">
              <img
                src={`http://127.0.0.1:8000/storage/${section1Data.images[0].image}`}
                alt={section1Data.title}
                className="w-full h-[300px] md:h-[500px] lg:h-[500px] rounded-2xl"
              />
            </div>

            {/* Right Content */}
            <div>
              <h2 className="text-3xl md:text-[45px] font-semibold mb-4">
                {section1Data.title}
              </h2>
              <p className="text-gray-900 text-[17px] mb-6 leading-relaxed font-['Montserrat',sans-serif] font-medium">
                {section1Data.description}
              </p>
          
            </div>
          </div>
        </section>
      )}

      {/* Section 2 - Smart Display Types */}
      {section2Data && (
        <section className="bg-[#EAF1FF] py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-28">
          {/* Section Heading */}
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-[45px] font-semibold mb-2">
              {section2Data.title}
            </h2>
            {section2Data.description && (
              <p className="text-gray-900 max-w-2xl text-[17px] mx-auto font-['Montserrat',sans-serif] font-medium">
                {section2Data.description}
              </p>
            )}
          </div>

          {/* Display Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {section2Data.images.slice(0, 4).map((item, index) => (
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

      {/* Section 3 - Mounting Installation */}
      {section3Data && (
        <section className="bg-white py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27">
          {/* Section Heading */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-[45px] font-semibold text-gray-900">
              {section3Data.title}
            </h2>
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {section3Data.images.map((item, index) => (
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

      {/* Section 4 - Showcase Slider */}
      {section4Data && <ShowcaseSlider showcaseData={section4Data} />}

      {/* Section 5 - Features */}
   {section5Data && (
  <section className="py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27 bg-white flex flex-col items-center">
    <h2 className="text-[45px] font-semibold text-center mb-5">{section5Data.title}</h2>

    <div className="container grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* First feature - always large (600px) */}
      {section5Data.images[0] && (
        <div className="space-y-5">
          <div className="relative h-[600px] rounded-xl overflow-hidden">
            <img
              src={`http://127.0.0.1:8000/storage/${section5Data.images[0].image}`}
              alt={section5Data.images[0].title}
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
              {section5Data.images[0].title}
            </div>
          </div>
        </div>
      )}

      {/* Middle column - alternating heights */}
      {section5Data.images.length > 1 && (
        <div className="space-y-5">
          {/* Second feature - medium (250px) */}
          {section5Data.images[1] && (
            <div className="relative h-[250px] rounded-xl overflow-hidden">
              <img
                src={`http://127.0.0.1:8000/storage/${section5Data.images[1].image}`}
                alt={section5Data.images[1].title}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                {section5Data.images[1].title}
              </div>
            </div>
          )}

          {/* Third feature - tall (330px) */}
          {section5Data.images[2] && (
            <div className="relative h-[330px] rounded-xl overflow-hidden">
              <img
                src={`http://127.0.0.1:8000/storage/${section5Data.images[2].image}`}
                alt={section5Data.images[2].title}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                {section5Data.images[2].title}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Right column - alternating heights */}
      {section5Data.images.length > 3 && (
        <div className="space-y-5">
          {/* Fourth feature - tall (330px) */}
          {section5Data.images[3] && (
            <div className="relative h-[330px] rounded-xl overflow-hidden">
              <img
                src={`http://127.0.0.1:8000/storage/${section5Data.images[3].image}`}
                alt={section5Data.images[3].title}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                {section5Data.images[3].title}
              </div>
            </div>
          )}

          {/* Fifth feature - medium (250px) */}
          {section5Data.images[4] && (
            <div className="relative h-[250px] rounded-xl overflow-hidden">
              <img
                src={`http://127.0.0.1:8000/storage/${section5Data.images[4].image}`}
                alt={section5Data.images[4].title}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                {section5Data.images[4].title}
              </div>
            </div>
          )}
        </div>
      )}
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
              Ready to Transform Your Advertising?
            </h2>
            <p className="text-gray-700 mb-6 text-base md:text-[17px] font-['Montserrat',sans-serif] font-medium">
              With Xigi DOOH, you're not just getting ad space – you're gaining a partner committed to elevating your brand
            </p>
            <button onClick={() => navigate('/contact')}
className="bg-gradient-to-r from-blue-600 to-indigo-600 cursor-pointer hover:from-indigo-700 hover:to-blue-700 text-white px-7 py-3 rounded-md shadow-md text-[16px] font-medium transition-all duration-300">
              See Solutions for Your Industry
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TransportationHubs;