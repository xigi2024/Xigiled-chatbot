import React, { useRef, useEffect, useState, } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import cta from '../assets/cta.png';
import display from '../assets/display.jpg';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link,useNavigate } from 'react-router-dom';
import Highdefinition from '../assets/industry/High-definition.png'
import seamless from '../assets/industry/seamless.png'
import vibrantColor from '../assets/industry/vibrantColor.png'
import WideAngle from '../assets/industry/WideAngle.png'
import ultraThin from '../assets/industry/ultraThin.png'

const ShowcaseSlider = ({ showcaseData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!showcaseData || !showcaseData.images || showcaseData.images.length === 0) return null;

  const showcaseItems = showcaseData.images.map(img => ({
    title: img.title,
    image: `https://xigiled.in/storage/${img.image}`,
  }));

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % showcaseItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? showcaseItems.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % showcaseItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [showcaseItems.length]);

  return (
    <section className="bg-[#EAF1FF] py-22">
      <div className="container mx-auto text-center px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-gray-900 font-['Poppins',sans-serif]">
            {showcaseData.title || "For Showcase"}
          </h2>
          <Link
            to="/gallery"
            className="inline-block bg-blue-900 text-white px-4 py-2 rounded-lg font-medium text-sm"
          >
            View All
          </Link>
        </div>

        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={showcaseItems[currentIndex]?.image}
            alt={showcaseItems[currentIndex]?.title}
            className="w-full h-[500px] md:h-[550px] object-cover rounded-2xl"
          />
          <h3 className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-xl md:text-2xl font-semibold drop-shadow-lg ">
            {showcaseItems[currentIndex]?.title}
          </h3>

          {/* Prev & Next Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};



const PixelPitchScroll = ({ pixelPitchData }) => {
  const scrollRef = useRef(null);
  const scrollSpeed = 1;
  const animationRef = useRef(null);

  const animateScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollSpeed;
      const scrollWidth = scrollRef.current.scrollWidth;
      const halfWidth = scrollWidth / 2;

      if (scrollRef.current.scrollLeft >= halfWidth) {
        scrollRef.current.scrollLeft = 0;
      }
    }
    animationRef.current = requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animateScroll);

    const container = scrollRef.current;
    const handleMouseEnter = () => cancelAnimationFrame(animationRef.current);
    const handleMouseLeave = () => animationRef.current = requestAnimationFrame(animateScroll);

    if (container) {
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  if (!pixelPitchData?.images?.length) return null;

  // Duplicate for seamless scroll
  const fullList = [...pixelPitchData.images, ...pixelPitchData.images];

  return (
    <section className="bg-white py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-black font-['Poppins',sans-serif]">
            {pixelPitchData.title}
          </h2>
        </div>

        {/* Scrollable 5-item container */}
        <div
          ref={scrollRef}
          className="overflow-x-hidden relative"
          style={{ width: '1200px', margin: '0 auto' }} // 5 * (160px + gap ~8px)
        >
          <div className="flex gap-10">
            {fullList.map((pitch, index) => (
              <div
                key={index}
                className="flex-shrink-0 text-center w-[160px]"
              >
                <img
                  src={`https://xigiled.in/storage/${pitch.image}`}
                  alt={pitch.title}
                  className="w-full h-[180px] p-5 object-cover rounded-2xl shadow-md"
                />
                <p className="mt-3 text-[15px] md:text-lg text-black font-['Montserrat',sans-serif] font-medium">
                  {pitch.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};



const Indoor_Led = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://xigiled.in/api/indoor-led');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading...</p>
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
            <p className="text-lg text-red-600 mb-4">Error loading data: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const transformInteriorsData = getSectionData('indoor_led_section1');
  const smartDisplayData = getSectionData('indoor_led_section2');
  const pixelPitchData = getSectionData('indoor_led_section3');
  const showcaseData = getSectionData('indoor_led_section4');
  const featuresData = getSectionData('indoor_led_section5');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
 
      {/* Banner Section - Keep as hardcoded */}
      <div className="relative h-[70vh] w-full">
        <img
          src={display}
          alt="Indoor Led"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
          <h1 className="text-[28px] md:text-[32px] lg:text-[40px] font-semibold text-white text-center font-['Poppins',sans-serif]">
            Indoor LED Wall Display
          </h1>
        </div>
      </div>

      {/* Transform Interiors Section */}
      {transformInteriorsData && (
        <section className="py-27 px-4 md:px-12 lg:px-20 bg-white space-y-5 md:space-y-5 lg:space-y-10">
          {transformInteriorsData.images.map((item, index) => (
            <div key={index} className="container grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-5 lg:gap-10 mx-auto">
              {index % 2 === 0 ? (
                <>
                  {/* Text Left, Image Right */}
                  <div className="bg-[#F1F5F9] md:col-span-5 rounded-xl p-8 flex flex-col justify-center h-auto md:h-[400px]">
                    <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-gray-900 mb-5 md:mb-7 font-['Poppins',sans-serif]">{item.title}</h2>
                    <p className="text-sm md:text-[17px] text-gray-700 mb-5 md:mb-7 font-['Montserrat',sans-serif] font-medium">
                      {item.description}
                    </p>
                    
                  </div>
                  <div className="md:col-span-7 ">
                    <img src={`https://xigiled.in/storage/${item.image}`} alt={item.title} className="w-full h-[400px] rounded-xl drop-shadow-xl" />
                  </div>
                </>
              ) : (
                <>
                  {/* Image Left, Text Right */}
                  <div className=" md:col-span-7 ">
                    <img src={`https://xigiled.in/storage/${item.image}`} alt={item.title} className="w-full h-[400px] drop-shadow-xl" />
                  </div>
                  <div className="bg-[#F1F5F9] md:col-span-5 rounded-xl p-8 flex flex-col justify-center h-auto md:h-[500px]">
                    <h2 className="text-3xl md:text-[45px] font-medium text-gray-900 mb-5 md:mb-7">{item.title}</h2>
                    <p className="text-sm md:text-[17px] text-gray-700 mb-5 md:mb-7 font-['Montserrat',sans-serif] font-medium">
                      {item.description}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Smart Display Types Section */}
  {smartDisplayData && (
  <section className="bg-[#EAF1FF] py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27">
    <div className="text-center mb-10">
      <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-gray-900 font-['Poppins',sans-serif]">
        {smartDisplayData.title || "Smart Displays"}
      </h2>
      {smartDisplayData.description && (
        <p className="text-gray-900 text-[17px] mx-auto font-['Montserrat',sans-serif] font-medium max-w-2xl mt-4">
          {smartDisplayData.description}
        </p>
      )}
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {smartDisplayData.images.map((item, index) => (
        <div key={index} className="relative rounded-xl overflow-hidden shadow-md h-[300px] group">
          {/* Image with gradient overlay */}
          <img
            src={`https://xigiled.in/storage/${item.image}`}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-90"></div>
          
          {/* Content */}
          <div className="absolute inset-x-0 bottom-0 p-4 text-center">
            <h3 className="text-white text-xl font-['Montserrat',sans-serif] font-medium">
              {item.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  </section>
)}

      {/* Pixel Pitch Section */}
      <PixelPitchScroll pixelPitchData={pixelPitchData} />

      {/* Showcase Section */}
      <ShowcaseSlider showcaseData={showcaseData} />

      {/* Features Section */}
  <section className="py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27 bg-[#EAF1FF] flex flex-col items-center">
        <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-center mb-10 font-['Poppins',sans-serif]">
          Why Event Planners Choose Xigi LED
        </h2>

          <div className="container grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: High-definition */}
            <div className="space-y-6">
              <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] p-5 h-full flex flex-col justify-between shadow-lg">
                <img
                  src={Highdefinition}
                  alt="High-definition"
                  className="w-full object-cover rounded-md mb-4"
                />
                <div>
                  <h3 className="text-white text-xl font-bold mb-2">High-definition</h3>
                  <p className="text-white text-sm">
                    Crystal-clear visuals with stunning clarity ensure every detail stands out. Experience
                    sharp, lifelike images that captivate your audience instantly.
                  </p>
                </div>
              </div>
            </div>

            {/* Column 2: Seamless + Vibrant Color */}
            <div className="space-y-6">
              <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] p-5 shadow-lg">
                <img
                  src={seamless}
                  alt="Seamless"
                  className="mx-auto w-70 object-cover rounded-md mb-3"
                />
                <div>
                  <h3 className="text-white text-lg font-semibold">Seamless</h3>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] p-5 shadow-lg">
                <img
                  src={vibrantColor}
                  alt="Vibrant Color"
                  className="w-full object-cover rounded-md mb-3"
                />
                <div>
                  <h3 className="text-white text-lg font-semibold">Vibrant Color</h3>
                  <p className="text-white text-sm">
                    Vibrant colors that pop with brilliance, bringing every image to life.
                  </p>
                </div>
              </div>
            </div>

            {/* Column 3: Ultra-thin + Wide Angle */}
            <div className="space-y-6">
              <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] p-5 shadow-lg">
                <img
                  src={ultraThin}
                  alt="Ultra-thin"
                  className="w-66 object-cover rounded-md mb-3"
                />
                <div>
                  <h3 className="text-white text-lg font-semibold">Ultra-thin</h3>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] p-5 shadow-lg">
                <img
                  src={WideAngle}
                  alt="Wide Angle"
                  className="w-full object-cover rounded-md mb-3"
                />
                <div>
                  <h3 className="text-white text-lg font-semibold">Wide Angle</h3>
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* CTA Section - Keep as hardcoded */}
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
            <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-black mb-3 font-['Poppins',sans-serif]">
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
  )
}

export default Indoor_Led;