import React, { useRef, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import cta from '../assets/cta.png';
import rental from '../assets/rental.jpg';
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
    return <div>Loading showcase...</div>;
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
          <div className="hidden md:flex items-center justify-center ">
            <div className="w-[8px] h-125 rounded-2xl bg-blue-400"></div>
          </div>

          {/* Right Content */}
          <div className="relative w-full md:w-2/3 p-10">
            <img
              src={`https://xigiled.in/storage/${showcaseData[currentIndex].image}`}
              alt={showcaseData[currentIndex].title}
              className="w-full h-[400px] object-cover rounded-xl"
            />
            <div className="mt-4">
              <h3 className="text-[22px] font-semibold text-black">
                {showcaseData[currentIndex].title}
              </h3>
              <p className="text-[17px] text-gray-900 mb-3 font-['Montserrat',sans-serif] font-medium">
                {showcaseData[currentIndex].description || 'Description not available'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PixelPitchScroll = ({ panelsData }) => {
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

  if (!panelsData || panelsData.length === 0) {
    return <div>Loading panels...</div>;
  }

  // Duplicate content to simulate infinite scroll
  const fullList = [...panelsData, ...panelsData];

  return (
    <section className="bg-white py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[45px] font-semibold text-black">Panels</h2>
        </div>

        {/* Scrollable List */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-2"
          style={{ scrollbarWidth: 'none' }}
        >
          {fullList.map((panel, index) => (
            <div key={index} className="flex-shrink-0 text-center w-[140px] md:w-[160px]">
              <img
                src={`https://xigiled.in/storage/${panel.image}`}
                alt={panel.title}
                className="w-full h-[120px] md:h-[130px] object-cover rounded-2xl shadow-md"
              />
              <p className="mt-3 text-[15px] md:text-lg text-black font-['Montserrat',sans-serif] font-medium">
                {panel.title}
              </p>
            </div>
          ))}
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


  useEffect(() => {
    const fetchData = async () => {
      try {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Organize data by sections
  const sectionData = apiData.reduce((acc, item) => {
    acc[item.section] = item;
    return acc;
  }, {});

  const rentalEventSection = sectionData['rental_event_series_section1'];
  const mountingSection = sectionData['rental_event_series_section2'];
  const panelsSection = sectionData['rental_event_series_section3'];
  const showcaseSection = sectionData['rental_event_series_section4'];
  const featuresSection = sectionData['rental_event_series_section5'];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Banner Section */}
      <div className="relative h-[70vh] w-full">
        <img
          src={rental}
          alt="Rental and Event Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-semibold text-white text-center">
            Rental & Event Series
          </h1>
        </div>
      </div>

      {/* Main Content Section */}
      {rentalEventSection && (
        <section className="py-27 px-4 md:px-12 lg:px-20 bg-white space-y-5 md:space-y-5 lg:space-y-10">
          <div className="container grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-5 lg:gap-10 mx-auto">
            <div className="bg-[#F1F5F9] md:col-span-5 rounded-xl p-8 flex flex-col justify-center h-auto md:h-[500px]">
              <h2 className="text-3xl md:text-[45px] font-semibold text-gray-900 mb-5 md:mb-7">
                {rentalEventSection.images[0]?.title || rentalEventSection.title}
              </h2>
              <p className="text-sm md:text-[17px] text-gray-700 mb-5 md:mb-7 font-['Montserrat',sans-serif] font-medium">
                {rentalEventSection.images[0]?.description || rentalEventSection.description}
              </p>
              
            </div>
            <div className="bg-[#1D4ED8] md:col-span-7 rounded-xl flex items-center justify-center p-6 md:p-8 h-auto md:h-[500px]">
              <img 
                src={`https://xigiled.in/storage/${rentalEventSection.images[0]?.image}`} 
                alt={rentalEventSection.images[0]?.title} 
                className="w-full max-w-[300px] md:max-w-xs drop-shadow-xl rounded-lg" 
              />
            </div>
          </div>
        </section>
      )}

      {/* Mounting Section */}
      {mountingSection && (
        <section className="bg-[#EAF1FF] py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-[45px] font-semibold text-gray-900">
              {mountingSection.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {mountingSection.images.map((item, index) => (
              <div key={index} className="bg-[#fff] rounded-xl overflow-hidden shadow-md">
                <img
                  src={`https://xigiled.in/storage/${item.image}`}
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

      {/* Panels Section */}
      {panelsSection && (
        <PixelPitchScroll panelsData={panelsSection.images} />
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
            {/* Column 1: First feature (tall) */}
            <div className="space-y-5">
              {featuresSection.images[0] && (
                <div className="relative h-[600px] rounded-xl overflow-hidden">
                  <img
                    src={`https://xigiled.in/storage/${featuresSection.images[0].image}`}
                    alt={featuresSection.images[0].title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                    {featuresSection.images[0].title}
                  </div>
                </div>
              )}
            </div>

            {/* Column 2: Second and third features */}
            <div className="space-y-5">
              {featuresSection.images[1] && (
                <div className="relative h-[250px] rounded-xl overflow-hidden">
                  <img
                    src={`https://xigiled.in/storage/${featuresSection.images[1].image}`}
                    alt={featuresSection.images[1].title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                    {featuresSection.images[1].title}
                  </div>
                </div>
              )}
              {featuresSection.images[2] && (
                <div className="relative h-[330px] rounded-xl overflow-hidden">
                  <img
                    src={`https://xigiled.in/storage/${featuresSection.images[2].image}`}
                    alt={featuresSection.images[2].title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                    {featuresSection.images[2].title}
                  </div>
                </div>
              )}
            </div>

            {/* Column 3: Fourth and fifth features */}
            <div className="space-y-5">
              {featuresSection.images[3] && (
                <div className="relative h-[330px] rounded-xl overflow-hidden">
                  <img
                    src={`https://xigiled.in/storage/${featuresSection.images[3].image}`}
                    alt={featuresSection.images[3].title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                    {featuresSection.images[3].title}
                  </div>
                </div>
              )}
              {featuresSection.images[4] && (
                <div className="relative h-[250px] rounded-xl overflow-hidden">
                  <img
                    src={`https://xigiled.in/storage/${featuresSection.images[4].image}`}
                    alt={featuresSection.images[4].title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                    {featuresSection.images[4].title}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="w-full bg-[#f2f2fd] py-27 px-4">
        <div className="container mx-auto bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 h-[300px] md:h-[500px]">
            <img
              src={cta}
              alt="CTA Display"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-12 text-center md:text-left">
            <h2 className="text-3xl md:text-[45px] font-semibold text-black mb-2">
              Ready to Transform Your Event?
            </h2>
            <p className="text-gray-700 mb-6 text-base md:text-[17px] font-['Montserrat',sans-serif] font-medium">
              With our Rental & Event Series, you're not just getting displays – you're gaining a partner committed to making your event unforgettable.
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

export default Rental_Event_display;