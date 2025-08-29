import React, { useRef, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import cta from '../assets/cta2.jpg';
import outdoor from '../assets/outdoor led display.png';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Import feature images for outdoor (you'll need to add these)
import Weatherproof from '../assets/outdoor.avif'
import BrightDisplay from '../assets/bright-display.webp'
import EnergyEfficient from '../assets/energy-efficient.avif'
import RemoteControl from '../assets/remote-control.avif'
import DurableDesign from '../assets/durable-design.png'

const ShowcaseSlider = ({ showcaseData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!showcaseData || !showcaseData.images || showcaseData.images.length === 0) return null;

  const showcaseItems = showcaseData.images.map(img => ({
    title: img.title,
    image: `https://xigiled.in/storage/${img.image}`,
    description: img.description
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
        <div className="flex md:justify-center items-center mb-8">
          <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-gray-900 font-['Poppins',sans-serif]">
            {showcaseData.title || "For Showcase"}
          </h2>
        </div>

        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={showcaseItems[currentIndex]?.image}
            alt={showcaseItems[currentIndex]?.title}
            className="w-full h-[500px] md:h-[550px] object-cover rounded-2xl"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-90 rounded-2xl"></div>

          {/* Title + Description */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-white z-20 px-4">
            <h3 className="text-xl md:text-2xl font-semibold drop-shadow-lg">
              {showcaseItems[currentIndex]?.title}
            </h3>
            {showcaseItems[currentIndex]?.description && (
              <p className="mt-2 text-sm md:text-base drop-shadow-md">
                {showcaseItems[currentIndex]?.description}
              </p>
            )}
          </div>

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
  const animationRef = useRef(null);
  const scrollSpeed = 1; // pixels per frame

  const animateScroll = () => {
    const el = scrollRef.current;
    if (el) {
      el.scrollLeft += scrollSpeed;
      const maxOffset = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxOffset) {
        el.scrollLeft = 0;
      }
    }
    animationRef.current = requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animateScroll);

    const el = scrollRef.current;
    const handleMouseEnter = () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
    const handleMouseLeave = () => {
      animationRef.current = requestAnimationFrame(animateScroll);
    };

    if (el) {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (el) {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!pixelPitchData?.images?.length) return null;

  const fullList = [...pixelPitchData.images, ...pixelPitchData.images];

  return (
    <section className="bg-white py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27">
      <div className="container mx-auto">
        {/* Heading */}
<div className="text-left md:text-center mb-12">          
  <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-black font-['Poppins',sans-serif]">
            {pixelPitchData.title}
          </h2>
        </div>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="overflow-x-hidden relative w-full"
        >
          <div className="flex gap-6 md:gap-10">
            {fullList.map((pitch, index) => (
              <div
                key={index}
                className="flex-shrink-0 text-center w-[120px] sm:w-[140px] md:w-[160px]"
              >
                <img
                  src={`https://xigiled.in/storage/${pitch.image}`}
                  alt={pitch.title}
                  className="w-full h-[140px] sm:h-[160px] md:h-[180px] p-3 sm:p-4 md:p-5 object-cover rounded-2xl shadow-md"
                />
                <p className="mt-3 text-[13px] sm:text-[15px] md:text-lg text-black font-['Montserrat',sans-serif] font-medium">
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

const FeaturesSection = ({ featuresData }) => {
  // Early return if no data
  if (!featuresData || !featuresData.images || featuresData.images.length === 0) {
    return (
      <section className="py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27 bg-[#EAF1FF] flex flex-col items-center">
        <div className="text-center">No features data available</div>
      </section>
    );
  }

  // Helper function to get full image URL
  const getImageUrl = (imagePath) => {
    return `https://xigiled.in/storage/${imagePath}`;
  };

  // Get features from the data (use the actual images from API)
  const images = featuresData.images;

  return (
    <section className="py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27 bg-[#EAF1FF] flex flex-col w-full py-16 md:py-20 lg:py-24 p
x-4 md:px-8 lg:px-28">
      <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-left md:text-center mb-10 font-['Poppins',sans-serif]">
        {featuresData.title || "Why Outdoor Advertisers Choose Xigi LED"}
      </h2>

      <div className="container grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: First feature (tall card) */}
        <div className="space-y-6">
          {images[0] && (
            <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] lg:h-[605px] md:h-[450px] h-[400px] p-5 flex flex-col justify-between shadow-lg">
              <img
                src={getImageUrl(images[0].image)}
                alt={images[0].title}
                className="w-full h-105 object-cover rounded-md mb-1 flex-shrink-0"
                onError={(e) => {
                  console.error('Image failed to load:', e.target.src);
                  e.target.style.display = 'none';
                }}
              />
              <div className="flex-grow flex flex-col justify-end">
                <h3 className="text-white text-xl font-bold mb-2">
                  {images[0].title}
                </h3>
                {images[0].description && (
                  <p className="text-white text-sm">
                    {images[0].description}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Column 2: Second and third features */}
        <div className="space-y-6">
          {images[1] && (
            <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] h-[280px] lg:h-[260px] md:h-[200px] p-5 shadow-lg">
              <img
                src={getImageUrl(images[1].image)}
                alt={images[1].title}
                className="w-full h-50 lg:h-45 md:h-30 object-cover rounded-md mb-4"
                onError={(e) => {
                  console.error('Image failed to load:', e.target.src);
                  e.target.style.display = 'none';
                }}
              />
              <div>
                <h3 className="text-white text-lg font-semibold">
                  {images[1].title}
                </h3>
                {images[1].description && (
                  <p className="text-white text-xs mt-2">
                    {images[1].description}
                  </p>
                )}
              </div>
            </div>
          )}

          {images[2] && (
            <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] h-[300px] lg:h-[320px] md:h-[220px] p-5 shadow-lg">
              <img
                src={getImageUrl(images[2].image)}
                alt={images[2].title}
                className="w-full lg:h-60 md:h-35 object-cover rounded-md mb-3"
                onError={(e) => {
                  console.error('Image failed to load:', e.target.src);
                  e.target.style.display = 'none';
                }}
              />
              <div>
                <h3 className="text-white text-lg font-semibold">
                  {images[2].title}
                </h3>
                {images[2].description && (
                  <p className="text-white text-xs mt-2">
                    {images[2].description}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Column 3: Fourth and fifth features */}
        <div className="space-y-6">
          {images[3] && (
            <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] h-[300px] lg:h-[300px] md:h-[220px] p-5 shadow-lg">
              <img
                src={getImageUrl(images[3].image)}
                alt={images[3].title}
                className="w-full lg:h-55 md:h-35 h-54 object-cover rounded-md mb-3"
                onError={(e) => {
                  console.error('Image failed to load:', e.target.src);
                  e.target.style.display = 'none';
                }}
              />
              <div>
                <h3 className="text-white text-lg font-semibold">
                  {images[3].title}
                </h3>
                {images[3].description && (
                  <p className="text-white text-xs mt-2">
                    {images[3].description}
                  </p>
                )}
              </div>
            </div>
          )}

          {images[4] && (
            <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] h-[280px] lg:h-[280px] md:h-[200px] p-5 shadow-lg">
              <img
                src={getImageUrl(images[4].image)}
                alt={images[4].title}
                className="w-full lg:h-50 md:h-33 h-50 object-cover rounded-md mb-3"
                onError={(e) => {
                  console.error('Image failed to load:', e.target.src);
                  e.target.style.display = 'none';
                }}
              />
              <div>
                <h3 className="text-white text-lg font-semibold">
                  {images[4].title}
                </h3>
                {images[4].description && (
                  <p className="text-white text-xs mt-2">
                    {images[4].description}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Outdoor_Led = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

    const handleCtaClick = () => {
    navigate('/contact');
    sessionStorage.setItem('scrollToContactForm', 'true');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://xigiled.in/api/outdoor-led');
        
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

  const ruleOutdoorsData = getSectionData('outdoor_led_section1');
  const smartDisplayData = getSectionData('outdoor_led_section2');
  const pixelPitchData = getSectionData('outdoor_led_section3');
  const showcaseData = getSectionData('outdoor_led_section4');
  const featuresData = getSectionData('outdoor_led_section5');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
 
      {/* Banner Section - Keep as hardcoded */}
      <div className="relative h-[70vh] w-full">
        <img
          src={outdoor}
          alt="Outdoor Led"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
          <h1 className="text-[28px] md:text-[32px] lg:text-[40px] font-semibold text-white text-center font-['Poppins',sans-serif]">
            Outdoor LED Wall Display
          </h1>
        </div>
      </div>

      <div className=" pt-14  container text-sm text-gray-500 mb-10 space-y-5 md:space-y-5 lg:space-y-10">
  <span className="inline-flex items-center gap-2">
    <Link to="/" className="inline-flex items-center gap-1 text-decoration-none text-black hover:underline">
      🏠 Home
    </Link>
    <span>›</span>
    <Link to="/products" className="text-gray-500 text-decoration-none hover:text-blue-600 hover:underline">
      Products
    </Link>
    <span>›</span>
    <span className="text-blue-600 text-decoration-none font-medium">Outdoor Video Walls</span>
  </span>
</div>
{/* Rule the Outdoors Section */}
{ruleOutdoorsData && (
  <section className="pb-30 px-4 md:px-12 lg:px-20 bg-white">
    {ruleOutdoorsData.images.map((item, index) => (
      <div
        key={index}
        className="container grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 mx-auto"
      >
        {/* Text Left, Image Right - for even indexes */}
        {index % 2 === 0 ? (
          <>
            {/* Text box */}
            <div className="bg-[#F1F5F9] lg:col-span-5 rounded-xl p-8 h-auto lg:h-[500px] flex flex-col justify-center">
              <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-gray-900 mb-5 md:mb-7 font-['Poppins',sans-serif]">
                {ruleOutdoorsData.title || "Rule the Outdoors"}
              </h2>
              <p className="text-[16px] md:text-[17px] text-black font-medium font-['Montserrat',sans-serif] font-medium leading-relaxed">
                {ruleOutdoorsData.description ||
                  "Outdoor LED displays designed for maximum visibility and durability..."}
              </p>
            </div>

            {/* Image box */}
            <div className="lg:col-span-7 h-auto lg:h-[500px]">
              <img
                src={`https://xigiled.in/storage/${item.image}`}
                alt={ruleOutdoorsData.title || "Outdoor LED Display"}
                className="w-full h-full rounded-xl drop-shadow-xl object-cover"
              />
            </div>
          </>
        ) : (
          <>
            {/* Image Left */}
            <div className="lg:col-span-7 h-auto lg:h-[500px] flex">
              <img
                src={`https://xigiled.in/storage/${item.image}`}
                alt={ruleOutdoorsData.title || "Outdoor LED Display"}
                className="w-full h-full rounded-xl drop-shadow-xl object-cover"
              />
            </div>

            {/* Text Right */}
            <div className="bg-[#F1F5F9] lg:col-span-5 rounded-xl p-8 flex flex-col justify-center h-auto lg:h-[500px]">
              <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-gray-900 mb-5 md:mb-7 font-['Poppins',sans-serif]">
                {ruleOutdoorsData.title || "Rule the Outdoors"}
              </h2>
              <p className="text-sm md:text-[17px] text-gray-700 font-['Montserrat',sans-serif] font-medium leading-relaxed">
                {ruleOutdoorsData.description ||
                  "Outdoor LED displays designed for maximum visibility and durability..."}
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
    <div className="text-left md:text-center mb-10">
      <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-gray-900 font-['Poppins',sans-serif]">
        {smartDisplayData.title || "Smart Displays"}
      </h2>

      {smartDisplayData.description && (
        <p className="text-gray-900 text-[17px] mx-auto font-['Montserrat',sans-serif] font-medium max-w-2xl mt-4">
          {smartDisplayData.description}
        </p>
      )}
    </div>

    {/* Grid Layout */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {smartDisplayData.images.map((item, index) => (
        <div
          key={index}
          className="relative rounded-xl overflow-hidden shadow-md h-[300px] group"
        >
          {/* Image with gradient overlay */}
          <img
            src={`https://xigiled.in/storage/${item.image}`}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent opacity-90"></div>

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

<FeaturesSection featuresData={featuresData} />

{/* CTA Section */}
<section className="container w-full py-16 md:py-20 lg:py-24 px-4 md:px-8 lg:px-28">
  <div className="rounded-xl overflow-hidden shadow-lg bg-white flex flex-col md:flex-row h-auto md:h-[450px] lg:h-[480px]">

    {/* Left Image */}
    <div className="w-full md:w-5/12 h-64 md:h-auto">
      <img
        src={cta}
        alt="DOOH Display"
        className="w-full h-full object-cover"
      /> 
    </div>

    {/* Right Content */}
    <div className="w-full md:w-7/12 bg-[#E8F1FF] flex  p-6 md:p-10 lg:p-12">
      <div className="text-left w-full">
        <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-black mb-5 font-['Poppins',sans-serif] leading-[1.3]">
          Ready to Transform Your Advertising?
        </h2>
        <p className="text-black mb-6 text-base md:text-[17px] font-['Montserrat',sans-serif] leading-relaxed font-medium">
          With Xigi DOOH, you're not just getting ad space. you're gaining a partner committed to elevating your brand
        </p>
        <button
  onClick={handleCtaClick}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 cursor-pointer hover:from-indigo-700 hover:to-blue-700 text-white px-7 py-3 rounded-md shadow-md text-[16px] font-medium transition-all duration-300"
        >
          Book Outdoor Site Visit
        </button>
      </div>
    </div>

  </div>
</section>



      <Footer />
    </div>
  )
}

export default Outdoor_Led;