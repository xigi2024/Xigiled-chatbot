import React, { useRef, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import cta from '../assets/cta7.jpg';
import standee from '../assets/standee.jpg';
import { ChevronRight, ChevronDown ,ChevronLeft} from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import SEOMetaTags from '../components/SEOMetaTags';
import FAQSchema from '../components/FAQSchema'; // Add this import
import { faqData } from '../data/faqData'; // Add this import


const FAQItem = ({ question, answer, isActive, onClick }) => {
  return (
    <div
      className="bg-[#EAF1FF] rounded-lg p-4 mb-4 shadow cursor-pointer transition-all"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <p className="text-black text-[15px] md:text-[17px] font-['Montserrat',sans-serif] font-medium">
          {question}
        </p>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transform transition-transform ${
            isActive ? "rotate-180" : ""
          }`}
        />
      </div>
      {isActive && (
        <div className="mt-4 text-gray-700 text-[14px] leading-relaxed md:text-[16px] font-['Montserrat',sans-serif] font-medium">
          {answer}
        </div>
      )}
    </div>
  );
};

const StandeeFeaturesSection = ({ featuresData }) => {
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
    const plugAndPlay = images.find(img => img.title === 'Plug-and-play') || images[0];
    const usbWifi = images.find(img => img.title === 'USB/WiFi content update') || images[1];
    const lightweight = images.find(img => img.title === 'Lightweight') || images[2];
    const easyTransport = images.find(img => img.title.includes('Easy transport')) || images[3];
    const slimProfile = images.find(img => img.title === 'Slim Profile') || images[4];

    return {
      plugAndPlay,
      usbWifi,
      lightweight,
      easyTransport,
      slimProfile
    };
  };

  const features = organizeFeatures(featuresData.images);

  return (
    <section className="py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27 bg-[#EAF1FF] flex flex-col items-center">
      <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-left md:text-center mb-10 font-['Poppins',sans-serif]">
        {featuresData.title === "Features" ? "Why Retailers Choose Xigi LED Standees" : featuresData.title}
      </h2>

      <div className="container grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: Plug-and-play */}
        <div className="space-y-6">
          <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] p-5 h-full flex flex-col justify-between shadow-lg h-[581px]">
            <img
              src={getImageUrl(features.plugAndPlay.image)}
              alt={features.plugAndPlay.title}
              className="w-full object-cover rounded-md mb-4"
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.style.display = 'none';
              }}
            />
            <div>
              <h3 className="text-white text-xl font-bold mb-2">
                {features.plugAndPlay.title}
              </h3>
              {features.plugAndPlay.description && (
                <p className="text-white text-sm">
                  {features.plugAndPlay.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Column 2: USB/WiFi + Lightweight */}
        <div className="space-y-6">
          <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] p-5 shadow-lg h-[250px]">
            <img
              src={getImageUrl(features.usbWifi.image)}
              alt={features.usbWifi.title}
              className="w-full h-45 object-cover rounded-md mb-3"
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.style.display = 'none';
              }}
            />
            <div>
              <h3 className="text-white text-lg font-semibold">
                {features.usbWifi.title}
              </h3>
              {features.usbWifi.description && (
                <p className="text-white text-sm">
                  {features.usbWifi.description}
                </p>
              )}
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] p-5 shadow-lg h-[307px]">
            <img
              src={getImageUrl(features.lightweight.image)}
              alt={features.lightweight.title}
              className="w-full object-cover rounded-md mb-3 h-48"
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.style.display = 'none';
              }}
            />
            <div>
              <h3 className="text-white text-lg font-semibold">
                {features.lightweight.title}
              </h3>
              {features.lightweight.description && (
                <p className="text-white text-sm">
                  {features.lightweight.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Column 3: Easy Transport + Slim Profile */}
        <div className="space-y-6">
          <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] p-5 shadow-lg h-[307px]">
            <img
              src={getImageUrl(features.easyTransport.image)}
              alt={features.easyTransport.title}
              className="w-full object-cover rounded-md mb-3 h-55"
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.style.display = 'none';
              }}
            />
            <div>
              <h3 className="text-white text-lg font-semibold">
                {features.easyTransport.title}
              </h3>
              {features.easyTransport.description && (
                <p className="text-white text-sm">
                  {features.easyTransport.description}
                </p>
              )}
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] p-5 shadow-lg h-[250px]">
            <img
              src={getImageUrl(features.slimProfile.image)}
              alt={features.slimProfile.title}
              className="w-full object-cover rounded-md mb-3 h-45"
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.style.display = 'none';
              }}
            />
            <div>
              <h3 className="text-white text-lg font-semibold">
                {features.slimProfile.title}
              </h3>
              {features.slimProfile.description && (
                <p className="text-white text-sm">
                  {features.slimProfile.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


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

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % showcaseItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [showcaseItems.length]);

  return (
    <section className="bg-[#EAF1FF] py-22">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="flex justify-start md:justify-center items-center mb-8 gap-4">
          <h2 className="text-[28px] md:text-[32px] lg:text-[40px] text-left md:text-center font-medium text-gray-900 font-['Poppins',sans-serif]">
            {showcaseData.title || "For Showcase"}
          </h2>
        </div>

        {/* Slider */}
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={showcaseItems[currentIndex]?.image}
            alt={showcaseItems[currentIndex]?.title}
            className="w-full h-[500px] md:h-[550px] object-cover rounded-2xl"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>

          {/* Slide title */}
          <h3 className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-xl md:text-2xl font-semibold drop-shadow-lg z-10">
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
    <section className="bg-white py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-12">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="text-left md:text-center mb-10">
          <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-medium text-black text-left md:text-center font-['Poppins',sans-serif]">
            {pixelPitchData.title}
          </h2>
        </div>

        {/* Scrollable 5-item container */}
        <div
          ref={scrollRef}
          className="overflow-x-hidden relative mx-auto"
          style={{ maxWidth: "1200px" }} // always 5 items wide
        >
          <div className="flex gap-6 md:gap-8 lg:gap-10">
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


const Led_Standee = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);


 const handleCtaClick = () => {
    navigate('/contact');
    sessionStorage.setItem('scrollToContactForm', 'true');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://xigiled.in/api/led-standee-displays');
        
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

  const standeeDisplayData = getSectionData('standee_section1');
  const mountingInstallationData = getSectionData('standee_section2');
  const pixelPitchData = getSectionData('standee_section3');
  const showcaseData = getSectionData('standee_section4');
  const featuresData = getSectionData('standee_section5');
  const faqSection = getSectionData('standee_faq_section');


  return (
    <div className="min-h-screen flex flex-col">
<SEOMetaTags pageType="products" pageName="standee" />
<FAQSchema faqData={faqData.product["standee"].faqs} />      <Header />
 
      {/* Banner Section - Keep as hardcoded */}
      <div className="relative h-[70vh] w-full">
        <img
          src={standee}
          alt="LED Standee Display"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
          <h1 className="text-[28px] md:text-[32px] lg:text-[40px] font-semibold text-white text-center font-['Poppins',sans-serif]">
            LED Standee Display
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
          <span className="text-blue-600 text-decoration-none font-medium">Standee LED Displays  </span>
        </span>
      </div>
{/* Standee Display Section */}
{standeeDisplayData && (
  <section className="pb-30 px-4 md:px-12 lg:px-20 bg-white">
    {standeeDisplayData.images.map((item, index) => (
      <div
        key={index}
        className="container grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 mx-auto items-stretch"
      >
        {/* Text Left, Image Right - for even indexes */}
        {index % 2 === 0 ? (
          <>
            <div className="bg-[#F1F5F9] lg:col-span-5 rounded-xl p-8 flex flex-col justify-center h-auto">
              <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-gray-900 mb-5 md:mb-7 font-['Poppins',sans-serif]">
                {standeeDisplayData.title || "Portable LED Displays"}
              </h2>
              <p className="text-[16px] md:text-[17px] text-black mb-5 md:mb-7 font-['Montserrat',sans-serif] font-medium leading-relaxed">
                {standeeDisplayData.description ||
                  "Compact and portable LED displays perfect for retail environments, trade shows, and events that require flexible positioning."}
              </p>
            </div>
            <div className="lg:col-span-7 h-auto">
              <img
                src={`https://xigiled.in/storage/${item.image}`}
                alt={standeeDisplayData.title || "LED Standee Display"}
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
                alt={standeeDisplayData.title || "LED Standee Display"}
                className="w-full h-full rounded-xl drop-shadow-xl object-cover"
              />
            </div>
            <div className="bg-[#F1F5F9] lg:col-span-5 rounded-xl p-8 flex flex-col justify-center h-auto">
              <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-gray-900 mb-5 md:mb-7 font-['Poppins',sans-serif]">
                {standeeDisplayData.title || "Portable LED Displays"}
              </h2>
              <p className="text-sm md:text-[17px] text-gray-700 mb-5 md:mb-7 font-['Montserrat',sans-serif] font-medium leading-relaxed">
                {standeeDisplayData.description ||
                  "Compact and portable LED displays perfect for retail environments, trade shows, and events that require flexible positioning."}
              </p>
            </div>
          </>
        )}
      </div>
    ))}
  </section>
)}

{/* Mounting Installation Section */}
{mountingInstallationData && (
  <section className="bg-[#EAF1FF] py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27">
    <div className="container mx-auto">
      {/* Section Title + Description */}
      <div className="text-left md:text-center mb-10">
        <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-gray-900 font-['Poppins',sans-serif]">
          {mountingInstallationData.title || "Mounting Installation"}
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

      <StandeeFeaturesSection featuresData={featuresData} />

      {/* FAQ Section */}
{faqSection && faqSection.faq_entries && faqSection.faq_entries.length > 0 && (
  <section className="bg-[#fff] py-10 md:py-27 px-4 lg:px-20 md:px-10">
    <h2 className="md:text-center text-left text-[28px] md:text-[32px] lg:text-[40px] font-medium mb-8 md:mb-10 font-['Poppins',sans-serif]">
      {faqSection.title}
    </h2>
    <div className="max-w-5xl mx-auto md:w-[680px] lg:w-[1000px]">
      {faqSection.faq_entries.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isActive={activeIndex === index}
          onClick={() =>
            setActiveIndex(activeIndex === index ? null : index)
          }
        />
      ))}
    </div>
  </section>
)}

{/* CTA Section - Updated Content Only */}
<section className="w-full py-16 md:py-20 lg:py-24 px-4 md:px-8 lg:px-28">
  <div className="rounded-xl overflow-hidden shadow-lg bg-white flex flex-col md:flex-row h-auto md:h-[450px] lg:h-[480px]">
    
    {/* Left Image */}
    <div className="w-full md:w-5/12 h-64 md:h-auto">
      <img
        src={cta}
        alt="LED Standee Display"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Right Content */}
    <div className="w-full md:w-7/12 bg-[#E8F1FF] flex items-center p-6 md:p-10 lg:p-12">
      <div className="text-left w-full">
        <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-black mb-4 leading-snug font-['Poppins',sans-serif]">
          Ready to Transform Your Retail Experience?
        </h2>
        <p className="text-black mb-6 text-base md:text-[17px] leading-relaxed font-medium font-['Montserrat',sans-serif]">
          With Xigi LED Standees, you're not just getting a display. you're gaining a partner committed to elevating your customer engagement.
        </p>
        <button
          onClick={handleCtaClick}
          className="bg-gradient-to-r from-blue-600 cursor-pointer to-indigo-600 hover:from-indigo-700 hover:to-blue-700 text-white px-7 py-3 rounded-md shadow-md text-[16px] font-medium transition-all duration-300"
        >
          Get Standee Design & Price
        </button>
      </div>
    </div>
  </div>
</section>


      <Footer />
    </div>
  )
}

export default Led_Standee;