import React, { useRef, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import cta from '../assets/cta9.jpg';
import transparent from '../assets/transparent.jpg';
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

const TransparentFeaturesSection = ({ featuresData }) => {
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
    const highTransparency = images.find(img => img.title === 'High Transparency') || images[0];
    const energyEfficient = images.find(img => img.title === 'Energy Efficient') || images[1];
    const slimDesign = images.find(img => img.title === 'Slim Design') || images[2];
    const wideViewing = images.find(img => img.title === 'Wide Viewing') || images[3];
    const easyInstallation = images.find(img => img.title === 'Easy Installation') || images[4];

    return {
      highTransparency,
      energyEfficient,
      slimDesign,
      wideViewing,
      easyInstallation
    };
  };

  const features = organizeFeatures(featuresData.images);

  return (
    <section className="py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27 bg-[EAF1FF] flex flex-col items-center">
      <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-left md:text-center mb-10 font-['Poppins',sans-serif]">
        {featuresData.title || "Why Choose Transparent Displays"}
      </h2>

      <div className="container grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: High Transparency */}
        <div className="space-y-6">
          <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] p-5 h-full flex flex-col justify-between shadow-lg h-[581px]">
            <img
              src={getImageUrl(features.highTransparency.image)}
              alt={features.highTransparency.title}
              className="w-full object-cover rounded-md mb-4"
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.style.display = 'none';
              }}
            />
            <div>
              <h3 className="text-white text-xl font-bold mb-2">
                {features.highTransparency.title}
              </h3>
              {features.highTransparency.description && (
                <p className="text-white text-sm">
                  {features.highTransparency.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Column 2: Energy Efficient + Slim Design */}
        <div className="space-y-6">
          <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] p-5 shadow-lg h-[250px]">
            <img
              src={getImageUrl(features.energyEfficient.image)}
              alt={features.energyEfficient.title}
              className="w-full h-45 object-cover rounded-md mb-3"
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.style.display = 'none';
              }}
            />
            <div>
              <h3 className="text-white text-lg font-semibold">
                {features.energyEfficient.title}
              </h3>
              {features.energyEfficient.description && (
                <p className="text-white text-sm">
                  {features.energyEfficient.description}
                </p>
              )}
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] p-5 shadow-lg h-[307px]">
            <img
              src={getImageUrl(features.slimDesign.image)}
              alt={features.slimDesign.title}
              className="w-full object-cover rounded-md mb-3 h-48"
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.style.display = 'none';
              }}
            />
            <div>
              <h3 className="text-white text-lg font-semibold">
                {features.slimDesign.title}
              </h3>
              {features.slimDesign.description && (
                <p className="text-white text-sm">
                  {features.slimDesign.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Column 3: Wide Viewing + Easy Installation */}
        <div className="space-y-6">
          <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] p-5 shadow-lg h-[307px]">
            <img
              src={getImageUrl(features.wideViewing.image)}
              alt={features.wideViewing.title}
              className="w-full object-cover rounded-md mb-3 h-55"
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.style.display = 'none';
              }}
            />
            <div>
              <h3 className="text-white text-lg font-semibold">
                {features.wideViewing.title}
              </h3>
              {features.wideViewing.description && (
                <p className="text-white text-sm">
                  {features.wideViewing.description}
                </p>
              )}
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden bg-[#1E2D3D] p-5 shadow-lg h-[250px]">
            <img
              src={getImageUrl(features.easyInstallation.image)}
              alt={features.easyInstallation.title}
              className="w-full object-cover rounded-md mb-3 h-45"
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.style.display = 'none';
              }}
            />
            <div>
              <h3 className="text-white text-lg font-semibold">
                {features.easyInstallation.title}
              </h3>
              {features.easyInstallation.description && (
                <p className="text-white text-sm">
                  {features.easyInstallation.description}
                </p>
              )}
            </div>
          </div>
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

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="overflow-x-hidden relative mx-auto"
          style={{ maxWidth: "1200px" }}
        >
          <div className="flex gap-6 md:gap-8 lg:gap-10">
            {fullList.map((pitch, index) => (
              <div
                key={index}
                className="flex-shrink-0 text-center 
                           w-[140px] sm:w-[150px] md:w-[160px]"
              >
                <img
                  src={`https://xigiled.in/storage/${pitch.image}`}
                  alt={pitch.title}
                  className="w-full h-[140px] sm:h-[160px] md:h-[180px] 
                             p-4 object-cover rounded-2xl shadow-md"
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


const Transparent_Led = () => {
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
        const response = await fetch('https://xigiled.in/api/transparent-led-displays');
        
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

  const seeThroughBrillianceData = getSectionData('transparent_led_section1');
  const smartDisplayData = getSectionData('transparent_led_section2');
  const pixelPitchData = getSectionData('transparent_led_section3');
  const showcaseData = getSectionData('transparent_led_section4');
  const featuresData = getSectionData('transparent_led_section5');
    const faqSection = getSectionData('transparent_led_faq_section');


  return (
    <div className="min-h-screen flex flex-col">
<SEOMetaTags pageType="products" pageName="transparent" />
<FAQSchema faqData={faqData.product["transparent-led-display"].faqs} />

      <Header />
 
      {/* Banner Section */}
      <div className="relative h-[70vh] w-full">
        <img
          src={transparent}
          alt="Transparent LED Displays"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
          <h1 className="text-[28px] md:text-[32px] lg:text-[40px] font-semibold text-white text-center font-['Poppins',sans-serif]">
            Transparent LED Displays
          </h1>
        </div>
      </div>
      
      <div className="pt-14 container text-sm text-gray-500 mb-10 space-y-5 md:space-y-5 lg:space-y-10">
        <span className="inline-flex items-center gap-2">
          <Link to="/" className="inline-flex items-center gap-1 text-decoration-none text-black hover:underline">
            🏠 Home
          </Link>
          <span>›</span>
          <Link to="/products" className="text-gray-500 text-decoration-none hover:text-blue-600 hover:underline">
            Products
          </Link>
          <span>›</span>
          <span className="text-blue-600 text-decoration-none font-medium">Transparent LED Walls</span>
        </span>
      </div>

      {/* See Through Brilliance Section */}
      {seeThroughBrillianceData && (
        <section className="pb-30 px-4 md:px-12 lg:px-20 bg-white">
          {seeThroughBrillianceData.images.map((item, index) => (
            <div
              key={index}
              className="container grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 mx-auto items-stretch"
            >
              {/* Text Left, Image Right - for even indexes */}
              {index % 2 === 0 ? (
                <>
                  <div className="bg-[#F1F5F9] lg:col-span-5 rounded-xl p-8 flex flex-col justify-center h-auto">
                    <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-gray-900 mb-5 md:mb-7 font-['Poppins',sans-serif]">
                      {seeThroughBrillianceData.title || "See Through Brilliance"}
                    </h2>
                    <p className="text-[16px] md:text-[17px] text-black mb-5 md:mb-7 font-['Montserrat',sans-serif] font-medium leading-relaxed">
                      {seeThroughBrillianceData.description ||
                        "Experience crystal-clear transparency with stunning visual clarity that seamlessly integrates into any environment..."}
                    </p>
                  </div>
                  <div className="lg:col-span-7 h-auto">
                    <img
                      src={`https://xigiled.in/storage/${item.image}`}
                      alt={seeThroughBrillianceData.title || "Transparent LED Display"}
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
                      alt={seeThroughBrillianceData.title || "Transparent LED Display"}
                      className="w-full h-full rounded-xl drop-shadow-xl object-cover"
                    />
                  </div>
                  <div className="bg-[#F1F5F9] lg:col-span-5 rounded-xl p-8 flex flex-col justify-center h-auto">
                    <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-gray-900 mb-5 md:mb-7 font-['Poppins',sans-serif]">
                      {seeThroughBrillianceData.title || "See Through Brilliance"}
                    </h2>
                    <p className="text-[16px] md:text-[17px] text-black mb-5 md:mb-7 font-['Montserrat',sans-serif] font-medium leading-relaxed">
                      {seeThroughBrillianceData.description ||
                        "Experience crystal-clear transparency with stunning visual clarity that seamlessly integrates into any environment..."}
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
          <div className="container mx-auto">
            {/* Section Title + Description */}
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
          </div>
        </section>
      )}

      {/* Pixel Pitch Section */}
      <PixelPitchScroll pixelPitchData={pixelPitchData} />

      {/* Showcase Section */}
      <ShowcaseSlider showcaseData={showcaseData} />

      {/* Features Section */}
      <TransparentFeaturesSection featuresData={featuresData} />

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

      {/* CTA Section */}
      <section className="w-full py-20 md:py-17 container lg:py-27 px-4 md:px-5 lg:px-28">
        <div className="rounded-xl overflow-hidden shadow-lg bg-white flex flex-col md:flex-row h-auto md:h-[450px] lg:h-[480px]">
          
          {/* Left Image */}
          <div className="w-full md:w-5/12">
            <img
              src={cta}
              alt="Transparent LED Display"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="w-full md:w-7/12 bg-[#E8F1FF] flex items-center p-8 md:p-7">
            <div className="text-left md:px-5">
              <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-black mb-5 font-['Poppins',sans-serif] leading-[1.3]">
                Ready to Transform Your Space?
              </h2>
              <p className="text-black mb-6 text-base md:text-[17px] font-['Montserrat',sans-serif] leading-relaxed font-medium">
                With Xigi Transparent Displays, you're not just getting technology. you're gaining a partner committed to elevating your visual experience.
              </p>
              <button
                onClick={handleCtaClick}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 cursor-pointer hover:from-indigo-700 hover:to-blue-700 text-white px-7 py-3 rounded-md shadow-md text-[16px] font-medium transition-all duration-300"
              >
                See Transparent Solutions
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Transparent_Led;