import React, { useRef, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import cta from '../assets/cta.png';
import interactive from '../assets/interactive.webp';
import { Link,useNavigate } from 'react-router-dom';

const Interactive_display = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://xigiled.in/api/interactive-led-displays');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setApiData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to get section data by section name
  const getSectionData = (sectionName) => {
    return apiData.find(item => item.section === sectionName);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600">Error: {error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const section1 = getSectionData('interactive_led_section1');
  const section2 = getSectionData('interactive_led_section2');
  const section3 = getSectionData('interactive_led_section3');
  const section4 = getSectionData('interactive_led_section4');
  const section5 = getSectionData('interactive_led_section5');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Banner Section */}
      <div className="relative h-[70vh] w-full">
        <img
          src={interactive}
          alt="Interactive Led Display"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-semibold text-white text-center">
            Interactive LED display
          </h1>
        </div>
      </div>

      {/* Section 1 - Touch the Future */}
      {section1 && (
        <section className="py-27 px-4 md:px-12 lg:px-20 bg-white space-y-5 md:space-y-5 lg:space-y-10">
          <div className="container mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-[45px] font-semibold text-gray-900 mb-5">
              {section1.title}
            </h2>
            <p className="text-sm md:text-[17px] text-gray-700 font-['Montserrat',sans-serif] font-medium max-w-4xl mx-auto">
              {section1.description}
            </p>
          </div>

          {section1.images && section1.images.map((imageData, index) => (
            <div key={index} className={`container grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-5 lg:gap-10 mx-auto ${index % 2 === 0 ? '' : 'md:grid-flow-col-dense'}`}>
              <div className={`bg-[#F1F5F9] md:col-span-5 h-[400px] rounded-xl p-8 flex flex-col justify-center ${index % 2 === 0 ? '' : 'md:col-start-8'}`}>
                <h3 className="text-3xl md:text-[40px] font-semibold text-gray-900 mb-5 md:mb-7">
                  {imageData.title}
                </h3>
                {imageData.description && (
                  <p className="text-sm md:text-[17px] text-gray-700 mb-5 md:mb-7 font-['Montserrat',sans-serif] font-medium">
                    {imageData.description}
                  </p>
                )}

              </div>
              <div className={` md:col-span-7  ${index % 2 === 0 ? '' : 'md:col-start-1'}`}>
                <img
                  src={`https://xigiled.in/storage/${imageData.image}`}
                  alt={imageData.title}
                  className="w-full h-[400px] drop-shadow-xl rounded-lg"
                />
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Section 2 - Smart Display Types */}
      {section2 && (
        <section className="bg-[#EAF1FF] py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-[45px] font-semibold text-gray-900">
              {section2.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {section2.images && section2.images.map((imageData, index) => (
              <div key={index} className="bg-[#fff] rounded-xl overflow-hidden shadow-md">
                <img
                  src={`https://xigiled.in/storage/${imageData.image}`}
                  alt={imageData.title}
                  className="w-full h-64 md:h-70 lg:h-100 object-cover"
                />
                <div className="text-center p-4">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                    {imageData.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 3 - Screen Sizes */}
      {section3 && (
        <PixelPitchScroll data={section3} />
      )}

      {/* Section 4 - Showcase */}
      {section4 && (
        <ShowcaseSlider data={section4} />
      )}

      {section5 && (
        <section className="py-16 bg-white px-4 flex flex-col items-center">
          <h2 className="text-[45px] font-semibold text-center mb-5">{section5.title}</h2>

          <div className="container grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Column 1 - Single tall item (600px) */}
            {section5.images[0] && (
              <div className="relative h-[600px] rounded-xl overflow-hidden">
                <img
                  src={`https://xigiled.in/storage/${section5.images[0].image}`}
                  alt={section5.images[0].title}
                  className="w-full h-full object-cover rounded-xl"
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                  {section5.images[0].title}
                </div>
              </div>
            )}

            {/* Column 2 - Stacked items (250px + 330px) */}
            <div className="space-y-5">
              {section5.images[1] && (
                <div className="relative h-[250px] rounded-xl overflow-hidden">
                  <img
                    src={`https://xigiled.in/storage/${section5.images[1].image}`}
                    alt={section5.images[1].title}
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                    {section5.images[1].title}
                  </div>
                </div>
              )}
              {section5.images[2] && (
                <div className="relative h-[330px] rounded-xl overflow-hidden">
                  <img
                    src={`https://xigiled.in/storage/${section5.images[2].image}`}
                    alt={section5.images[2].title}
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                    {section5.images[2].title}
                  </div>
                </div>
              )}
            </div>

            {/* Column 3 - Stacked items (330px + 250px) */}
            <div className="space-y-5">
              {section5.images[3] && (
                <div className="relative h-[330px] rounded-xl overflow-hidden">
                  <img
                    src={`https://xigiled.in/storage/${section5.images[3].image}`}
                    alt={section5.images[3].title}
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                    {section5.images[3].title}
                  </div>
                </div>
              )}
              {section5.images[4] && (
                <div className="relative h-[250px] rounded-xl overflow-hidden">
                  <img
                    src={`https://xigiled.in/storage/${section5.images[4].image}`}
                    alt={section5.images[4].title}
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                    {section5.images[4].title}
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
  )
}

// Modified PixelPitchScroll component to use API data
const PixelPitchScroll = ({ data }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    let scrollInterval;

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        if (container) {
          container.scrollLeft += 1;
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

  if (!data || !data.images) return null;

  // Duplicate content for infinite scroll
  const fullList = [...data.images, ...data.images];

  return (
    <section className="bg-white py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[45px] font-semibold text-black">{data.title}</h2>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-2"
          style={{ scrollbarWidth: 'none' }}
        >
          {fullList.map((item, index) => (
            <div key={index} className="flex-shrink-0 text-center w-[140px] md:w-[160px]">
              <img
                src={`https://xigiled.in/storage/${item.image}`}
                alt={item.title}
                className="w-full h-[120px] md:h-[130px] object-cover rounded-2xl shadow-md"
              />
              <p className="mt-3 text-[15px] md:text-lg text-black font-['Montserrat',sans-serif] font-medium">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Modified ShowcaseSlider component to use API data
const ShowcaseSlider = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (data && data.images) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [data]);

  if (!data || !data.images) return null;

  return (
    <section className="bg-blue-100 py-27">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-[45px] font-semibold text-black">For {data.title}</h2>
          <Link
            to="/gallery"
            className="inline-block bg-blue-900 text-white px-4 py-2 w-[30%] md:w-[15%] lg:w-[10%] rounded-lg font-medium text-sm text-center"
          >
            View All
          </Link>
        </div>

        <div className="flex flex-col md:flex-row bg-blue-200 rounded-xl overflow-hidden">
          <div className="w-full md:w-1/3 p-10 space-y-4">
            {data.images.map((item, index) => (
              <div
                key={index}
                className={`text-[20px] font-medium cursor-pointer transition-colors duration-300 ${index === currentIndex ? 'text-blue-700' : 'text-black'
                  }`}
                onClick={() => setCurrentIndex(index)}
              >
                {item.title}
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="w-[8px] h-125 rounded-2xl bg-blue-400"></div>
          </div>

          <div className="relative w-full md:w-2/3 p-10">
            <img
              src={`https://xigiled.in/storage/${data.images[currentIndex].image}`}
              alt={data.images[currentIndex].title}
              className="w-full h-[400px] object-cover rounded-xl"
            />
            <div className="mt-4">
              <h3 className="text-[22px] font-semibold text-black">
                {data.images[currentIndex].title}
              </h3>
              {data.images[currentIndex].description && (
                <p className="text-[17px] text-gray-900 mb-3 font-['Montserrat',sans-serif] font-medium">
                  {data.images[currentIndex].description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Interactive_display;