import React, { useRef, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from "lucide-react";
import cta from '../assets/cta.png';
import event from '../assets/events.webp';

const EventsExhibitions = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFaqs, setOpenFaqs] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://xigiled.in/api/event-exhibitions');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setApiData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleFaq = (imageIndex, faqIndex) => {
    const key = `${imageIndex}-${faqIndex}`;
    const isOpen = openFaqs === key;
    setOpenFaqs(prev => (prev === key ? null : key));
  };

  const getSectionData = (sectionName) => {
    return apiData.find(item => item.section === sectionName);
  };

  useEffect(() => {
    const featuresSection = getSectionData('event_section4');
    if (featuresSection?.images?.length > 0 && featuresSection.images[0]?.faqs?.length > 0) {
      setOpenFaqs('0-0');
    }
  }, [apiData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Updated section names to match EducationInstitutions pattern
  const heroSection = getSectionData('event_section1');
  const excellenceSection = getSectionData('event_section2');
  const smartDisplaysSection = getSectionData('event_section3');
  const smartFeaturesSection = getSectionData('event_section4');
  const flexibleDisplaySection = getSectionData('event_section6');
  const chooseXigiSection = getSectionData('event_section7');
  const transformSection = getSectionData('event_section8');

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faff]">
      <Header />

      {/* Hero Banner Section */}
      <div className="relative h-[70vh] w-full">
        <img
          src={event}
          alt="Events banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
          <h1 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-white text-center font-['Poppins',sans-serif]">
            Events & Exhibitions
          </h1>
        </div>
      </div>

      {/* Hero Section */}
      {heroSection && (
        <section className="bg-white rounded-t-[2.5rem] md:rounded-t-[3rem] -mt-10 z-20 relative py-16 md:py-24">
          <div className="container text-sm text-gray-500 mb-10">
            <span className="inline-flex items-center gap-2">
              <Link to="/" className="inline-flex items-center gap-1 text-decoration-none text-black hover:underline">
                🏠 Home
              </Link>
              <span>›</span>
              <Link to="/industry" className="text-gray-500 text-decoration-none hover:text-blue-600 hover:underline">
                Industry
              </Link>
              <span>›</span>
              <span className="text-blue-600 text-decoration-none font-medium">Events & Exhibitions</span>
            </span>
          </div>

          <div className="container mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-10 items-center">
            {/* Left Image */}
            <div className="flex justify-center w-full">
              <img
                src={`https://xigiled.in/storage/${heroSection.images[0].image}`}
                alt="LED Display for Events"
                className="w-full max-w-[800px] h-80 md:h-100 lg:h-120 rounded-2xl shadow-lg object-cover"
              />
            </div>

            {/* Right Content */}
            <div className="w-full">
              <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium mb-4 text-gray-900 leading-tight font-['Poppins',sans-serif]">
                {heroSection.title || "Transform Your Events with LED Displays"}
              </h2>
              <p className="text-gray-700 text-base md:text-lg mb-6 leading-relaxed">
                {heroSection.description || "Our LED displays create immersive experiences for any event or exhibition."}
              </p>

              <div className="space-y-6">
                {heroSection.description?.split('\n\n')
                  .filter(item => item.trim())
                  .map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="py-1 px-2 rounded-md bg-blue-100 text-blue-700">
                        ✓
                      </div>
                      <p className="text-gray-900 text-base leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Excellence Section */}
      {excellenceSection && (
        <section className="bg-[#EAF1FF] py-20 md:py-17 lg:py-24">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium mb-3 font-['Poppins',sans-serif]">
                {excellenceSection.title || "Designed for Event Excellence"}
              </h2>
              <p className="text-gray-900 text-[17px] mx-auto font-['Montserrat',sans-serif] font-medium">
                {excellenceSection.description || "Our LED displays are built to perform in demanding event settings"}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {excellenceSection.images?.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                  <div className="h-48 mb-4 overflow-hidden rounded-lg">
                    <img
                      src={`https://xigiled.in/storage/${item.image}`}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Smart Displays Section */}
      {smartDisplaysSection && (
        <section className="bg-white py-20">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium mb-3 font-['Poppins',sans-serif]">
                {smartDisplaysSection.title || "Smart Displays for Events"}
              </h2>
              <p className="text-gray-900 text-[17px] mx-auto font-['Montserrat',sans-serif] font-medium max-w-2xl">
                {smartDisplaysSection.description || "Enhancing event experiences with cutting-edge LED technology"}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {smartDisplaysSection.images?.map((item, index) => (
                <div key={index} className="relative rounded-xl overflow-hidden h-64">
                  <img
                    src={`https://xigiled.in/storage/${item.image}`}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <p className="text-white font-medium">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Smart Features Section */}
      {smartFeaturesSection && (
        <section className="bg-[#f8faff] py-20">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-gray-900 mb-3 font-['Poppins',sans-serif]">
                {smartFeaturesSection.title || "Event Display Features"}
              </h2>
              {smartFeaturesSection.description && (
                <p className="text-gray-700 text-base md:text-lg mb-6 leading-relaxed">
                  {smartFeaturesSection.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {smartFeaturesSection.images?.map((imageItem, imageIndex) => (
                <div key={imageIndex} className="bg-[#F4F6FA] rounded-xl shadow-md overflow-hidden">
                  {imageItem.image && (
                    <img
                      src={`https://xigiled.in/storage/${imageItem.image}`}
                      alt={imageItem.title || "LED Display"}
                      className="w-full object-cover h-[400px] mb-4 rounded-t-xl"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-[20px] font-semibold text-center mb-4 font-['Poppins',sans-serif]">
                      {imageItem.title}
                    </h3>
                    <div className="space-y-3">
                      {imageItem.faqs?.map((faq, faqIndex) => {
                        const key = `${imageIndex}-${faqIndex}`;
                        const isOpen = openFaqs === key;
                        return (
                          <div
                            key={faqIndex}
                            className="bg-white rounded-md border-[3px] border-[#E8F1FF] overflow-hidden transition-all duration-200 hover:shadow-md"
                          >
                            <div 
                              className="font-semibold flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                              onClick={() => toggleFaq(imageIndex, faqIndex)}
                            >
                              <span className="text-blue-700">{faq.question}</span>
                              <ChevronRight 
                                className={`w-5 h-5 text-blue-700 transition-transform duration-200 ${
                                  isOpen ? 'rotate-90' : ''
                                }`}
                              />
                            </div>
                            <div className={`overflow-hidden transition-all duration-300 ${
                              isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                              <div className="px-4 pb-4 text-sm text-gray-700 leading-relaxed border-t border-gray-100">
                                <div className="pt-3">
                                  {faq.answer}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Flexible Display Section */}
      {flexibleDisplaySection && (
        <section className="bg-white py-20 px-4 md:px-10 lg:px-28">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Text + Cards */}
            <div>
              <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-gray-900 leading-tight mb-4 font-['Poppins',sans-serif]">
                {flexibleDisplaySection.title || "Flexible Display Solutions"}
              </h2>
              <p className="text-gray-700 text-base md:text-lg mb-8 max-w-xl">
                {flexibleDisplaySection.description || "Customizable solutions for all types of events:"}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-md">
                {flexibleDisplaySection.images?.filter(img => img.description).map((item, index) => (
                  <div key={index} className="bg-[#EAF1FF] hover:bg-[#dce8ff] transition rounded-xl p-5 shadow-md">
                    <h2 className='text-blue-700 text-[19px] mb-4'>{item.title}</h2>
                    <p className="text-gray-800 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div>
              {flexibleDisplaySection.images?.find(img => img.image) && (
                <img
                  src={`https://xigiled.in/storage/${flexibleDisplaySection.images.find(img => img.image).image}`}
                  alt="Flexible Display"
                  className="rounded-xl w-full h-[400px] object-cover"
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Xigi Section */}
      {chooseXigiSection && (
        <section className="bg-[#EAF1FF] py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium mb-3 font-['Poppins',sans-serif]">
                {chooseXigiSection.title || "Why Choose Xigi LED?"}
              </h2>
              <p className="text-gray-900 text-[17px] mx-auto font-['Montserrat',sans-serif] font-medium max-w-2xl">
                {chooseXigiSection.description || "Trusted solutions for events and exhibitions"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {chooseXigiSection.images?.map((item, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={`https://xigiled.in/storage/${item.image}`}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-semibold mb-3 group-hover:text-blue-700 transition-colors duration-300">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Transform Section */}
      {transformSection && (
        <section className="bg-[#f2f2fd] py-20">
          <div className="container mx-auto">
            <div 
              className="h-[500px] relative rounded-3xl overflow-hidden"
              style={{
                backgroundImage: transformSection.images?.[0]?.image 
                  ? `url(https://xigiled.in/storage/${transformSection.images[0].image})`
                  : 'linear-gradient(to bottom right, #000000, #010150, #000000)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black/55 z-0"></div>
              <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 max-w-xl">
                <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-white mb-4 leading-tight font-['Poppins',sans-serif]">
                  {transformSection.title || "Ready to Transform Your Events?"}
                </h2>
                <p className="mb-6 text-[17px] md:text-[17px] font-medium text-white">
                  {transformSection.description || "With Xigi LED, create unforgettable experiences that captivate your audience."}
                </p>
                <button 
                  onClick={() => navigate('/contact')} 
                  className="bg-white cursor-pointer text-[#1e2d3d] hover:bg-[#e6e6ff] px-6 py-3 rounded-md shadow-md text-[16px] font-semibold transition-all duration-300 w-fit"
                >
                  Get Your Custom Quote
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default EventsExhibitions;