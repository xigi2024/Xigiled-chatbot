import React, { useRef, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import cta from '../assets/cta.png';
import flexible from '../assets/flexible.jpeg';
import { Link,useNavigate } from 'react-router-dom';

const ShowcaseSlider = ({ showcaseData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (showcaseData && showcaseData.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % showcaseData.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showcaseData]);

  if (!showcaseData || showcaseData.length === 0) {
    return null;
  }

  return (
    <section className="bg-blue-100 py-27">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-[45px] font-semibold text-black">Showcase</h2>
          <button className="bg-blue-900 text-white px-4 py-2 rounded-lg font-medium text-sm">
            View All
          </button>
        </div>

        <div className="flex flex-col md:flex-row bg-blue-200 rounded-xl overflow-hidden">
          {/* Left Menu */}
          <div className="w-full md:w-1/3 p-10 space-y-4">
            {showcaseData.map((item, index) => (
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
              src={`http://127.0.0.1:8000/storage/${showcaseData[currentIndex].image}`}
              alt={showcaseData[currentIndex].title}
              className="w-full h-[400px] object-cover rounded-xl"
            />
            <div className="mt-4">
              <h3 className="text-[22px] font-semibold text-black">
                {showcaseData[currentIndex].title}
              </h3>
              <p className="text-[17px] text-gray-900 mb-3 font-['Montserrat',sans-serif] font-medium">
                {showcaseData[currentIndex].description || "High-quality display solution"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FlexibleLed = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/flexible-curved-led-walls');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setApiData(data);
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

  // Helper function to render feature grid layout
  const renderFeatureGrid = (images) => {
    if (!images || images.length === 0) return null;

    return (
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Column 1: First image (tall) */}
        <div className="space-y-5">
          {images[0] && (
            <div className="relative h-[600px] rounded-xl overflow-hidden">
              <img
                src={`http://127.0.0.1:8000/storage/${images[0].image}`}
                alt={images[0].title}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                {images[0].title}
              </div>
            </div>
          )}
        </div>

        {/* Column 2: Second and third images */}
        <div className="space-y-5">
          {images[1] && (
            <div className="relative h-[250px] rounded-xl overflow-hidden">
              <img
                src={`http://127.0.0.1:8000/storage/${images[1].image}`}
                alt={images[1].title}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                {images[1].title}
              </div>
            </div>
          )}
          {images[2] && (
            <div className="relative h-[330px] rounded-xl overflow-hidden">
              <img
                src={`http://127.0.0.1:8000/storage/${images[2].image}`}
                alt={images[2].title}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                {images[2].title}
              </div>
            </div>
          )}
        </div>

        {/* Column 3: Fourth and fifth images */}
        <div className="space-y-5">
          {images[3] && (
            <div className="relative h-[330px] rounded-xl overflow-hidden">
              <img
                src={`http://127.0.0.1:8000/storage/${images[3].image}`}
                alt={images[3].title}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                {images[3].title}
              </div>
            </div>
          )}
          {images[4] && (
            <div className="relative h-[250px] rounded-xl overflow-hidden">
              <img
                src={`http://127.0.0.1:8000/storage/${images[4].image}`}
                alt={images[4].title}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                {images[4].title}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-900 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 text-lg">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Get section data
  const section1Data = getSectionData('flexible_curved_wall_section1');
  const section2Data = getSectionData('flexible_curved_wall_section2');
  const section3Data = getSectionData('flexible_curved_wall_section3');
  const section4Data = getSectionData('flexible_curved_wall_section4');
  const section5Data = getSectionData('flexible_curved_wall_section5');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Banner Section - Keep as hardcoded */}
      <div className="relative h-[70vh] w-full">
        <img
          src={flexible}
          alt="Flexible and curved"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-semibold text-white text-center">
            Flexible & Curved LED Walls
          </h1>
        </div>
      </div>

      {/* Section 1 - Dynamic Content */}
      {section1Data && (
        <section className="py-27 px-4 md:px-12 lg:px-20 bg-white space-y-10">
          <div className="container grid grid-cols-1 md:grid-cols-12 gap-10 mx-auto">
            <div className="bg-[#F1F5F9] md:col-span-5 rounded-xl p-8 flex flex-col justify-center h-auto md:h-[450px]">
              <h2 className="text-3xl md:text-[45px] font-semibold text-gray-900 mb-5 md:mb-7">
                {section1Data.title}
              </h2>
              <p className="text-sm md:text-[17px] text-gray-700 mb-5 md:mb-7 font-['Montserrat',sans-serif] font-medium">
                {section1Data.description}
              </p>
              
            </div>
            <div className=" md:col-span-7 ">
              {section1Data.images && section1Data.images[0] && (
                <img 
                  src={`http://127.0.0.1:8000/storage/${section1Data.images[0].image}`} 
                  alt={section1Data.images[0].title} 
                  className="w-full h-[450px] rounded drop-shadow-xl" 
                />
              )}
            </div>
          </div>

          {/* Second row if there's a second image */}
          {section1Data.images && section1Data.images[1] && (
            <div className="container grid grid-cols-1 md:grid-cols-12 gap-10 mx-auto">
              <div className=" md:col-span-7">
                <img 
                  src={`http://127.0.0.1:8000/storage/${section1Data.images[1].image}`} 
                  alt={section1Data.images[1].title} 
                  className="w-full h-[450px] rounded drop-shadow-xl" 
                />
              </div>
              <div className="bg-[#F1F5F9] md:col-span-5 rounded-xl p-8 flex flex-col justify-center h-auto md:h-[450px]">
                <h2 className="text-3xl md:text-[45px] font-semibold text-gray-900 mb-5 md:mb-7">
                  {section1Data.images[1].title}
                </h2>
                <p className="text-sm md:text-[17px] text-gray-700 mb-5 md:mb-7 font-['Montserrat',sans-serif] font-medium">
                  {section1Data.images[1].description || "Advanced display technology"}
                </p>
               
              </div>
            </div>
          )}
        </section>
      )}

      {/* Section 2 - Smart Display Types */}
      {section2Data && (
        <section className="bg-[#EAF1FF] py-27 px-4 md:px-12 lg:px-27">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-[45px] font-semibold text-gray-900">
              {section2Data.title}
            </h2>
          </div>

          <div className="container h-105 grid grid-cols-1 md:grid-cols-4 gap-15">
            {section2Data.images && section2Data.images.map((item, index) => (
              <div key={index} className="bg-[#ffff] rounded-xl overflow-hidden shadow-sm">
                <img
                  src={`http://127.0.0.1:8000/storage/${item.image}`}
                  alt={item.title}
                  className="w-full h-90 object-cover"
                />
                <div className="text-center p-4">
                  <h3 className="text-md md:text-[20px] font-semibold text-gray-900">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 3 - Shapes */}
      {section3Data && (
        <section className="bg-white py-27 px-4 md:px-12 lg:px-27">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-[45px] font-semibold text-gray-900">
              {section3Data.title}
            </h2>
          </div>

          <div className="container h-105 grid grid-cols-1 md:grid-cols-4 gap-15">
            {section3Data.images && section3Data.images.map((item, index) => (
              <div key={index} className="bg-[#f8f9fa] rounded-xl overflow-hidden shadow-sm">
                <img
                  src={`http://127.0.0.1:8000/storage/${item.image}`}
                  alt={item.title}
                  className="w-full h-90 object-cover"
                />
                <div className="text-center p-4">
                  <h3 className="text-md md:text-[20px] font-semibold text-gray-900">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 4 - Showcase Slider */}
      {section4Data && <ShowcaseSlider showcaseData={section4Data.images} />}

      {/* Section 5 - Features */}
      {section5Data && (
        <section className="py-16 bg-white px-4 flex flex-col items-center">
          <h2 className="text-[45px] font-semibold text-center mb-5">{section5Data.title}</h2>
          {renderFeatureGrid(section5Data.images)}
        </section>
      )}

      {/* CTA Section - Keep as hardcoded */}
      <section className="w-full bg-[#f2f2fd] py-27 px-4">
        <div className="container mx-auto bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 h-[300px] md:h-[500px]">
            <img
              src={cta}
              alt="DOOH Display"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-12 text-center md:text-left">
            <h2 className="text-3xl md:text-[45px] font-semibold text-black mb-2">
              Ready to Transform Your Advertising?
            </h2>
            <p className="text-gray-700 mb-6 text-base md:text-[17px] font-['Montserrat',sans-serif] font-medium">
              With Xigi DOOH, you're not just getting ad space – you're gaining a partner committed to elevating your brand
            </p>
            <button onClick={() => navigate('/contact')}
className="bg-gradient-to-r from-blue-600 to-indigo-600 cursor-pointer hover:from-indigo-700 hover:to-blue-700 text-white px-7 py-3 rounded-md shadow-md text-[16px] font-medium transition-all duration-300">
              See Solutions for Your Products
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FlexibleLed;