import React, { useRef, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import cta from '../assets/cta8.jpg';
import rental from '../assets/rental.jpg';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PortableDesign from '../assets/PortableDesign.webp'
import QuickSetup from '../assets/QuickSetup.webp'
import HighBrightness from '../assets/HighBrightness.jpeg'
import DurableConstruction from '../assets/DurableConstruction.png'
import VersatileMounting from '../assets/versatile-mounting..jpg'

const ShowcaseSlider = ({ showcaseData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!showcaseData || !showcaseData.images || showcaseData.images.length === 0)
    return null;

  const showcaseItems = showcaseData.images.map((img) => ({
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

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % showcaseItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [showcaseItems.length]);

  return (
    <section className="bg-[#EAF1FF] py-22">
      <div className="container mx-auto text-center px-4">
        {/* Section Title */}
        <div className="flex justify-center items-center mb-8 gap-4">
          <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-gray-900 font-['Poppins',sans-serif]">
            {showcaseData.title || "For Showcase"}
          </h2>

          {/* Optional "View All" button */}
          {/* <Link
            to="/gallery"
            className="inline-block bg-blue-900 text-white px-4 py-2 rounded-lg font-medium text-sm"
          >
            View All
          </Link> */}
        </div>

        {/* Slider */}
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={showcaseItems[currentIndex]?.image}
            alt={showcaseItems[currentIndex]?.title}
            className="w-full h-[500px] md:h-[550px] object-cover rounded-2xl"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl z-10"></div>

          {/* Slide title */}
          <h3 className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-xl md:text-2xl font-semibold drop-shadow-lg z-20">
            {showcaseItems[currentIndex]?.title}
          </h3>

          {/* Prev & Next buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-20"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-20"
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
  const scrollSpeed = 1;

  const animateScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollLeft += scrollSpeed;

    const maxOffset = el.scrollWidth - el.clientWidth;
    if (el.scrollLeft >= maxOffset) {
      el.scrollLeft = 0;
    }

    animationRef.current = requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    // Start animation
    animationRef.current = requestAnimationFrame(animateScroll);

    const el = scrollRef.current;
    if (!el) return;

    const stopScroll = () => cancelAnimationFrame(animationRef.current);
    const resumeScroll = () => {
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(animateScroll);
      }
    };

    el.addEventListener("mouseenter", stopScroll);
    el.addEventListener("mouseleave", resumeScroll);

    return () => {
      cancelAnimationFrame(animationRef.current);
      el.removeEventListener("mouseenter", stopScroll);
      el.removeEventListener("mouseleave", resumeScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!pixelPitchData?.images?.length) return null;

  // Duplicate list for seamless effect
  const fullList = [...pixelPitchData.images, ...pixelPitchData.images];

  return (
    <section className="bg-white py-20 md:py-16 lg:py-24 px-4 md:px-6 lg:px-10">
      <div className="container mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-black font-['Poppins',sans-serif]">
            {pixelPitchData.title}
          </h2>
        </div>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="overflow-x-hidden relative mx-auto"
          style={{ maxWidth: "1200px", width: "100%" }} // ✅ responsive + capped
        >
          <div className="flex gap-8 md:gap-10">
            {fullList.map((pitch, index) => (
              <div
                key={index}
                className="flex-shrink-0 text-center w-[140px] sm:w-[150px] md:w-[160px]"
              >
                <img
                  src={`https://xigiled.in/storage/${pitch.image}`}
                  alt={pitch.title}
                  className="w-full h-[140px] sm:h-[160px] md:h-[180px] p-4 object-cover rounded-2xl shadow-md"
                />
                <p className="mt-3 text-sm md:text-lg text-black font-['Montserrat',sans-serif] font-medium">
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

const RentalFeaturesSection = ({ featuresData }) => {
  // Add loading state check for the prop
  if (!featuresData) {
    return (
      <section className="py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27 bg-[#EAF1FF] flex flex-col items-center">
        <div className="text-center">Loading features...</div>
      </section>
    );
  }

  if (!featuresData.images || featuresData.images.length === 0) {
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

  // Organize images based on your actual API data
  const organizeFeatures = (images) => {
    // Map the API data to match your layout structure
    const portableDesign = images.find(img => img.title === 'Portable Design') || images[0];
    const quickSetup = images.find(img => img.title === 'Quick Setup') || images[1];
    const highBrightness = images.find(img => img.title === 'High Brightness') || images[2];
    const durableConstruction = images.find(img => img.title === 'Durable Construction') || images[3];
    const versatileMounting = images.find(img => img.title === 'Versatile Mounting') || images[4];

    return {
      portableDesign,
      quickSetup,
      highBrightness,
      durableConstruction,
      versatileMounting
    };
  };

  const features = organizeFeatures(featuresData.images);

  return (
    <section className="py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27 bg-[#EAF1FF] flex flex-col items-center">
      <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-center mb-10 font-['Poppins',sans-serif]">
        {featuresData.title || "Why Event Planners Choose Xigi Rental Displays"}
      </h2>

      <div className="container grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: Portable Design */}
        <div className="space-y-6">
          <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] p-5 h-full flex flex-col justify-between shadow-lg h-[581px]">
            <img
              src={getImageUrl(features.portableDesign.image)}
              alt={features.portableDesign.title}
              className="w-full object-cover rounded-md mb-4"
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.style.display = 'none';
              }}
            />
            <div>
              <h3 className="text-white text-xl font-bold mb-2">
                {features.portableDesign.title}
              </h3>
              {features.portableDesign.description && (
                <p className="text-white text-sm">
                  {features.portableDesign.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Column 2: Quick Setup + High Brightness */}
        <div className="space-y-6">
          <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] p-5 shadow-lg h-[250px]">
            <img
              src={getImageUrl(features.quickSetup.image)}
              alt={features.quickSetup.title}
              className="w-full h-45 object-cover rounded-md mb-3"
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.style.display = 'none';
              }}
            />
            <div>
              <h3 className="text-white text-lg font-semibold">
                {features.quickSetup.title}
              </h3>
              {features.quickSetup.description && (
                <p className="text-white text-sm">
                  {features.quickSetup.description}
                </p>
              )}
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] p-5 shadow-lg h-[307px]">
            <img
              src={getImageUrl(features.highBrightness.image)}
              alt={features.highBrightness.title}
              className="w-full object-cover rounded-md mb-3 h-48"
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.style.display = 'none';
              }}
            />
            <div>
              <h3 className="text-white text-lg font-semibold">
                {features.highBrightness.title}
              </h3>
              {features.highBrightness.description && (
                <p className="text-white text-sm">
                  {features.highBrightness.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Column 3: Durable Construction + Versatile Mounting */}
        <div className="space-y-6">
          <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] p-5 shadow-lg h-[307px]">
            <img
              src={getImageUrl(features.durableConstruction.image)}
              alt={features.durableConstruction.title}
              className="w-full object-cover rounded-md mb-3 h-55"
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.style.display = 'none';
              }}
            />
            <div>
              <h3 className="text-white text-lg font-semibold">
                {features.durableConstruction.title}
              </h3>
              {features.durableConstruction.description && (
                <p className="text-white text-sm">
                  {features.durableConstruction.description}
                </p>
              )}
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] p-5 shadow-lg h-[250px]">
            <img
              src={getImageUrl(features.versatileMounting.image)}
              alt={features.versatileMounting.title}
              className="w-full object-cover rounded-md mb-3 h-45"
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.style.display = 'none';
              }}
            />
            <div>
              <h3 className="text-white text-lg font-semibold">
                {features.versatileMounting.title}
              </h3>
              {features.versatileMounting.description && (
                <p className="text-white text-sm">
                  {features.versatileMounting.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Rental_Event_display = () => {
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
        const response = await fetch('https://xigiled.in/api/rental-event-series');
        
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
  };

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

  const rentalEventData = getSectionData('rental_event_series_section1');
  const mountingInstallationData = getSectionData('rental_event_series_section2');
  const pixelPitchData = getSectionData('rental_event_series_section3');
  const showcaseData = getSectionData('rental_event_series_section4');
  const featuresData = getSectionData('rental_event_series_section5');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
 
      {/* Banner Section - Keep as hardcoded */}
      <div className="relative h-[70vh] w-full">
        <img
          src={rental}
          alt="Rental & Event Series"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
          <h1 className="text-[28px] md:text-[32px] lg:text-[40px] font-semibold text-white text-center font-['Poppins',sans-serif]">
            Rental & Event Series
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
    <span className="text-blue-600 text-decoration-none font-medium">Rental & Event Series  </span>
  </span>
</div>
{/* Rental Event Section */}
{rentalEventData && (
  <section className="pb-30 px-4 md:px-12 lg:px-20 bg-white">
    {rentalEventData.images.map((item, index) => (
      <div
        key={index}
        className="container grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 mx-auto items-stretch"
      >
        {/* Text Left, Image Right - for even indexes */}
        {index % 2 === 0 ? (
          <>
            <div className="bg-[#F1F5F9] lg:col-span-5 rounded-xl p-8 flex flex-col justify-center h-auto">
              <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-gray-900 mb-5 md:mb-7 font-['Poppins',sans-serif]">
                {rentalEventData.title || "Rental & Event Solutions"}
              </h2>
              <p className="text-sm md:text-[17px] text-black mb-5 md:mb-7 font-['Montserrat',sans-serif] font-medium leading-relaxed">
                {rentalEventData.description ||
                  "Professional rental displays for events, concerts, extext-sm md:text-[17px] text-gray-700 mb-5 md:mb-7 font-['Montserrat',sans-serif] font-medium leading-relaxedhibitions, and corporate functions with fast setup and teardown..."}
              </p>
            </div>
            <div className="lg:col-span-7 h-auto">
              <img
                src={`https://xigiled.in/storage/${item.image}`}
                alt={rentalEventData.title || "Rental & Event Display"}
                className="w-full h-full rounded-xl drop-shadow-xl object-cover"
              />
            </div>
          </>
        ) : (
          <>
            {/* Image Left, Text Right - for odd indexes */}
            <div className="lg:col-span-7 h-auto">
              <img
                src={`https://xigiled.in/storage/${item.image}`}
                alt={rentalEventData.title || "Rental & Event Display"}
                className="w-full h-full rounded-xl drop-shadow-xl object-cover"
              />
            </div>
            <div className="bg-[#F1F5F9] lg:col-span-5 rounded-xl p-8 flex flex-col justify-center h-auto">
              <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-gray-900 mb-5 md:mb-7 font-['Poppins',sans-serif]">
                {rentalEventData.title || "Rental & Event Solutions"}
              </h2>
              <p className="text-sm md:text-[17px] text-gray-700 mb-5 md:mb-7 font-['Montserrat',sans-serif] font-medium leading-relaxed">
                {rentalEventData.description ||
                  "Professional rental displays for events, concerts, exhibitions, and corporate functions with fast setup and teardown..."}
              </p>
            </div>
          </>
        )}
      </div>
    ))}
  </section>
)}

{/* Mounting & Installation Section */}
{mountingInstallationData && (
  <section className="bg-[#EAF1FF] py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27">
    <div className="container mx-auto">
      {/* Section Title + Description */}
      <div className="text-center mb-10">
        <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-gray-900 font-['Poppins',sans-serif]">
          {mountingInstallationData.title || "Mounting & Installation"}
        </h2>

        {mountingInstallationData.description && (
          <p className="text-gray-900 text-[17px] mx-auto font-['Montserrat',sans-serif] font-medium max-w-2xl mt-4">
            {mountingInstallationData.description}
          </p>
        )}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mountingInstallationData.images.map((item, index) => (
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
    </div>
  </section>
)}


      {/* Pixel Pitch Section */}
      <PixelPitchScroll pixelPitchData={pixelPitchData} />

      {/* Showcase Section */}
      <ShowcaseSlider showcaseData={showcaseData} />

{/* Features Section */}
<RentalFeaturesSection featuresData={featuresData} />



{/* CTA Section - Updated Content Only */}
<section className="w-full py-20 md:py-17 container lg:py-27 px-4 md:px-5 lg:px-28">
  <div className="rounded-xl overflow-hidden shadow-lg bg-white flex flex-col md:flex-row h-auto md:h-[450px] lg:h-[480px]">
    
    {/* Left Image */}
    <div className="w-full md:w-5/12">
      <img
        src={cta}
        alt="Rental & Event Display"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Right Content */}
    <div className="w-full md:w-7/12 bg-[#E8F1FF] flex items-center p-8 md:p-8">
      <div className="text-center md:text-left ">
        <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-black mb-5 font-['Poppins',sans-serif] leading-[1.3]">
          Ready to Transform Your Event?
        </h2>
        <p className="text-black mb-6 text-base md:text-[17px] font-['Montserrat',sans-serif] leading-relaxed font-medium">
          With Xigi Rental & Event Displays, you're not just getting equipment – you're gaining a partner committed to making your event unforgettable.
        </p>
        <button
  onClick={handleCtaClick}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 cursor-pointer hover:from-indigo-700 hover:to-blue-700 text-white px-7 py-3 rounded-md shadow-md text-[16px] font-medium transition-all duration-300"
        >
          Book Your Event Date
        </button>
      </div>
    </div>
  </div>
</section>


      <Footer />
    </div>
  )
}

export default Rental_Event_display;