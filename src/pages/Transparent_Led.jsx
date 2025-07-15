import React, { useRef, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import cta from '../assets/cta.png';
import transparent from '../assets/transparent.jpg';
import { Link,useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://127.0.0.1:8000';

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
          <h2 className="text-[45px] font-semibold text-black">For Showcase</h2>
          <Link
            to="/gallery"
            className="inline-block bg-blue-900 text-white px-4 py-2 w-[30%] md:w-[15%] lg:w-[10%] rounded-lg font-medium text-sm text-center"
          >
            View All
          </Link>
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
          <div className="hidden md:flex items-center justify-center">
            <div className="w-[8px] h-125 rounded-2xl bg-blue-400"></div>
          </div>

          {/* Right Content */}
          <div className="relative w-full md:w-2/3 p-10">
            <img
              src={`${API_BASE_URL}/storage/${showcaseData[currentIndex].image}`}
              alt={showcaseData[currentIndex].title}
              className="w-full h-[400px] object-cover rounded-xl"
            />
            <div className="mt-4">
              <h3 className="text-[22px] font-semibold text-black">
                {showcaseData[currentIndex].title}
              </h3>
              <p className="text-[17px] text-gray-900 mb-3 font-['Montserrat',sans-serif] font-medium">
                {showcaseData[currentIndex].description || 'Experience the future of digital displays with our innovative solutions.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PixelPitchScroll = ({ pixelPitchData }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    let scrollInterval;

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        if (container) {
          container.scrollLeft += 1;

          // Reset scroll position without visual jump (for seamless loop)
          if (container.scrollLeft >= container.scrollWidth / 2) {
            container.scrollLeft = 0;
          }
        }
      }, 20);
    };

    const stopScroll = () => clearInterval(scrollInterval);

    if (container) {
      container.addEventListener('mouseenter', stopScroll);
      container.addEventListener('mouseleave', startScroll);
      startScroll();
    }

    return () => {
      if (container) {
        container.removeEventListener('mouseenter', stopScroll);
        container.removeEventListener('mouseleave', startScroll);
      }
      clearInterval(scrollInterval);
    };
  }, []);

  if (!pixelPitchData || pixelPitchData.length === 0) {
    return null;
  }

  // Duplicate content to simulate infinite scroll
  const fullList = [...pixelPitchData, ...pixelPitchData];

  return (
    <section className="bg-white py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[45px] font-semibold text-black">Pixel Pitch</h2>
        </div>

        {/* Scrollable List */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-2"
          style={{ scrollbarWidth: 'none' }}
        >
          {fullList.map((pitch, index) => (
            <div key={index} className="flex-shrink-0 text-center w-[140px] md:w-[160px]">
              <img
                src={`${API_BASE_URL}/storage/${pitch.image}`}
                alt={pitch.title}
                className="w-full h-[120px] md:h-[130px] object-cover rounded-2xl shadow-md"
              />
              <p className="mt-3 text-[15px] md:text-lg text-black font-['Montserrat',sans-serif] font-medium">
                {pitch.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Transparent_Led = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/transparent-led-displays');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setApiData(data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  // Extract data by section
  const sectionData = {};
  apiData.forEach(section => {
    sectionData[section.section] = section;
  });

  const seethroughBrilliance = sectionData['transparent_led_section1'];
  const smartDisplayTypes = sectionData['transparent_led_section2'];
  const pixelPitchSection = sectionData['transparent_led_section3'];
  const showcaseSection = sectionData['transparent_led_section4'];
  const featuresSection = sectionData['transparent_led_section5'];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Banner Section - Keep as hardcoded */}
      <div className="relative h-[70vh] w-full">
        <img
          src={transparent}
          alt="Industry Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-semibold text-white text-center">
            Transparent LED Displays
          </h1>
        </div>
      </div>

      {/* See Through Brilliance Section */}
      {seethroughBrilliance && (
        <section className="py-27 px-4 md:px-12 lg:px-20 bg-white space-y-5 md:space-y-5 lg:space-y-10">
          <div className="container grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-5 lg:gap-10 mx-auto">
            <div className="bg-[#F1F5F9] md:col-span-5 rounded-xl p-8 flex flex-col justify-center h-auto md:h-[400px]">
              <h2 className="text-3xl md:text-[45px] font-semibold text-gray-900 mb-5 md:mb-7">
                {seethroughBrilliance.title}
              </h2>
              <p className="text-sm md:text-[17px] text-gray-700 mb-5 md:mb-7 font-['Montserrat',sans-serif] font-medium">
                {seethroughBrilliance.description}
              </p>
              
            </div>
            <div className=" md:col-span-7">
              <img 
                src={`${API_BASE_URL}/storage/${seethroughBrilliance.images[0]?.image}`} 
                alt={seethroughBrilliance.images[0]?.title}
                className="w-full h-[400px] rounded drop-shadow-xl" 
              />
            </div>
          </div>
        </section>
      )}

      {/* Smart Display Types Section */}
      {smartDisplayTypes && (
        <section className="bg-[#EAF1FF] py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-[45px] font-semibold text-gray-900">
              {smartDisplayTypes.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {smartDisplayTypes.images.map((item, index) => (
              <div key={index} className="bg-[#fff] rounded-xl overflow-hidden shadow-md">
                <img
                  src={`${API_BASE_URL}/storage/${item.image}`}
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

      {/* Pixel Pitch Section */}
      {pixelPitchSection && (
        <PixelPitchScroll pixelPitchData={pixelPitchSection.images} />
      )}

      {/* Showcase Section */}
      {showcaseSection && (
        <ShowcaseSlider showcaseData={showcaseSection.images} />
      )}

      {/* Features Section */}
      {featuresSection && (
        <section className="py-16 bg-white px-4 flex flex-col items-center">
          <h2 className="text-[45px] font-semibold text-center mb-5">
            {featuresSection.title}
          </h2>

          <div className="container grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Dynamic feature layout based on available images */}
            {featuresSection.images.slice(0, 3).map((feature, index) => (
              <div key={index} className="space-y-5">
                <div className="relative h-[400px] rounded-xl overflow-hidden">
                  <img
                    src={`${API_BASE_URL}/storage/${feature.image}`}
                    alt={feature.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                    {feature.title}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional features if more than 3 */}
          {featuresSection.images.length > 3 && (
            <div className="container grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              {featuresSection.images.slice(3).map((feature, index) => (
                <div key={index + 3} className="space-y-5">
                  <div className="relative h-[300px] rounded-xl overflow-hidden">
                    <img
                      src={`${API_BASE_URL}/storage/${feature.image}`}
                      alt={feature.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                      {feature.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* CTA Section - Keep as hardcoded */}
      <section className="w-full bg-[#f2f2fd] py-27 px-4">
        <div className="container mx-auto bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 h-[300px] md:h-[500px]">
            <img
              src={cta} // Replace with your CTA image
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

export default Transparent_Led;