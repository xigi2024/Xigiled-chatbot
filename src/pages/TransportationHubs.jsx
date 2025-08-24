import React, { useRef, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from "lucide-react";

const TransportationHubs = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaqs, setOpenFaqs] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://xigiled.in/api/transport-public-venues');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setApiData(data.data);
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

  // Get section data by section name
  const getSectionData = (sectionName) => {
    return apiData.find(item => item.section === sectionName);
  };

  // Initialize first FAQ as open when apiData is loaded
  useEffect(() => {
    const smartFeaturesSection = getSectionData('transport_public_venue_section4');
    if (smartFeaturesSection?.images?.length > 0 && smartFeaturesSection.images[0]?.faqs?.length > 0) {
      setOpenFaqs('0-0'); // Open the first FAQ
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

  // Get data for different sections
  const heroSection = getSectionData('transport_public_venue_section1');
  const excellenceSection = getSectionData('transport_public_venue_section2');
  const smartDisplaysSection = getSectionData('transport_public_venue_section3');
  const smartFeaturesSection = getSectionData('transport_public_venue_section4');
  const flexibleDisplaySection = getSectionData('transport_public_venue_section6');
  const chooseXigiSection = getSectionData('transport_public_venue_section7');
  const transformSection = getSectionData('transport_public_venue_section8');

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faff]">
      <Header />

      {/* Hero Section */}
      {heroSection && (
        <section className="relative min-h-[40vh] md:min-h-[60vh] lg:min-h-[80vh] bg-gradient-to-br from-[#000000] via-[#010150] to-[#000000] py-30 px-[10px] md:px-[40px] lg:px-[40px]">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Text Column */}
            <div className="flex-1 text-left">
              <h1 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-white mb-2 font-['Poppins',sans-serif]">
                {heroSection.title || "LED Displays for Transportation Hubs"}
              </h1>

              <p className="text-[24px] md:text-[24px] lg:text-[18px] text-white mb-6 leading-relaxed">
                {heroSection.description || "At transportation hubs, delivering clear and timely information is critical for passenger experience and operational efficiency."}
              </p>
            </div>

            {/* Right Image Column */}
            <div className="flex-1 flex justify-center">
              {heroSection.images?.[0]?.image && (
                <img
                  src={`https://xigiled.in/storage/${heroSection.images[0].image}`}
                  alt="LED Display"
                  className="w-full max-w-[600px] h-[400px] object-cover drop-shadow-2xl rounded-lg"
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* Excellence Section */}
      <section className="bg-white rounded-t-[2.5rem] md:rounded-t-[3rem] -mt-10 z-20 relative py-16 md:py-20 lg:py-24">
        {/* Breadcrumb */}
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
            <span className="text-blue-600 text-decoration-none font-medium">Transportation Hubs</span>
          </span>
        </div>

        <div className="container mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-10 ">
          {/* Left Image */}
          <div className="flex justify-center w-full">
            {excellenceSection?.images?.[0]?.image && (
              <img
                src={`https://xigiled.in/storage/${excellenceSection.images[0].image}`}
                alt="LED Display for Transportation"
                className="w-full max-w-[800px] h-80 md:h-100 lg:h-120 rounded-2xl shadow-lg object-cover"
              />
            )}
          </div>

          {/* Right Content */}
          <div className="w-full  flex flex-col justify-center">
            <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium mb-4 text-gray-900 leading-tight font-['Poppins',sans-serif]">
              {excellenceSection?.title || "LED Displays for Transportation Hubs"}
            </h2>
            <p className="text-gray-700 text-base md:text-lg mb-6 leading-relaxed max-w-3xl">
              {excellenceSection?.description || 
                "At transportation hubs, delivering clear and timely information is critical. Your passengers demand reliable guidance, real-time updates, and seamless navigation through complex transit environments."}
            </p>
          </div>
        </div>
      </section>

      {/* Smart Displays Section */}
      {smartDisplaysSection && (
        <section className="bg-white py-15">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium mb-3 font-['Poppins',sans-serif]">
                {smartDisplaysSection.title || "Smart Features. Smooth Operation."}
              </h2>
              <p className="text-gray-900 text-[17px] mx-auto font-['Montserrat',sans-serif] font-medium max-w-2xl">
                {smartDisplaysSection.description || "Deliver more than information — deliver exceptional passenger experiences"}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {smartDisplaysSection.images?.map((item, index) => (
                <div key={index} className="relative rounded-xl overflow-hidden h-70">
                  <img
                    src={`https://xigiled.in/storage/${item.image}`}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/100 to-transparent flex items-end p-4">
                    <p className="text-white text-[17px] font-medium">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Smart Features Section with FAQs */}
      {smartFeaturesSection && (
        <section className="bg-[#f8faff] py-20">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-gray-900 mb-3 font-['Poppins',sans-serif]">
                {smartFeaturesSection.title || "LED Display Options"}
              </h2>
              {smartFeaturesSection.description && (
                <p className="text-gray-700 text-base md:text-lg mb-6 leading-relaxed max-w-3xl mx-auto">
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
                  <div className="space-y-3 p-3">
                    {imageItem.faqs?.map((faq, faqIndex) => {
                      const key = `${imageIndex}-${faqIndex}`;
                      const isOpen = openFaqs === key;
                      return (
                        <div
                          key={faqIndex}
                          className="rounded-md overflow-hidden transition-all duration-200 hover:shadow-md"
                        >
                          <div
                            className="font-semibold flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                            onClick={() => toggleFaq(imageIndex, faqIndex)}
                          >
                            <span className="text-blue-700">{faq.question}</span>
                            <ChevronRight
                              className={`w-5 h-5 text-blue-700 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''
                                }`}
                            />
                          </div>
                          <hr className=" border-gray-300" />
                          <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
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
              ))}
            </div>

            {/* Suggestion Note - Moved inside container */}
            <div className="bg-[#EDF3FF] text-sm md:text-base text-gray-800 px-6 py-4 rounded-md flex items-center gap-3 mt-10 max-w-3xl mx-auto">
              <span className="text-yellow-500 text-xl">💡</span>
              <p>Suggestion: P5 to P10 is a suitable choice for transportation applications above 50 feet.</p>
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
                {flexibleDisplaySection.description || "Choose from a range of ready-to-deploy formats or build a custom setup to suit your transportation hub and passenger flow"}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-md">
                {flexibleDisplaySection.images?.filter(img => img.description).map((item, index) => (
                  <div key={index} className="bg-[#EAF1FF] hover:bg-[#dce8ff] transition rounded-xl p-5 shadow-md">
                    <h2 className='text-blue-700 text-[22px] mb-4 '>{item.title}</h2>
                    <p className="text-gray-800 text-sm ">{item.description}</p>
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
                {chooseXigiSection.title || "Why Transit Operators Choose Xigi LED"}
              </h2>
              <p className="text-gray-900 text-[17px] mx-auto font-['Montserrat',sans-serif] font-medium max-w-2xl">
                {chooseXigiSection.description || "Trusted solutions for transportation hubs and public transit"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {chooseXigiSection.images?.map((item, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
                >
                  <div className="h-60 overflow-hidden relative">
                    <img
                      src={`https://xigiled.in/storage/${item.image}`}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-3">
                    <h3 className=" mt-6 mb-3 group-hover:text-blue-700 text-[22px] font-medium  transition-colors duration-300 text-center font-['Montserrat',sans-serif]     ">
                      {item.title}
                    </h3>
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
                  {transformSection.title || "Transform Your Transportation Hub with Xigi LED"}
                </h2>
                <p className="mb-6 text-[17px] md:text-[17px] font-medium text-white">
                  {transformSection.description || "Ready to enhance passenger experience with cutting-edge LED displays? Contact us for a custom transportation solution."}
                </p>
                <button
                  onClick={() => navigate('/contact')}
                  className=" bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-600 
    hover:from-indigo-700 hover:to-blue-700 text-white px-5 w-[300px] text-[17px]  py-3 rounded-[5px] text-sm font-medium transition-all duration-300"
                >
                 See Transport Solutions
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

export default TransportationHubs;