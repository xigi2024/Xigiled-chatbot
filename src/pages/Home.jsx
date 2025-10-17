import React, { useRef, useEffect, useState } from 'react';
import '../styles/Home.css';
import banner from '../assets/videos/XIGI Led Banner.mp4';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ctaImage from '../assets/cta1.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import SEOMetaTags from '../components/SEOMetaTags';

const IndustrySection = ({ sectionData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  if (!sectionData || !sectionData.images) {
    return <div>Loading...</div>;
  }
  // Filter out images without titles for the features list
  const validImages = sectionData.images.filter(img => img.title);

  // Get the image without title for the right side display
  const rightSideImage = sectionData.images.find(img => !img.title);

  const features = validImages.map(item => ({
    title: item.title,
    desc: item.description || "Enhanced functionality and performance for your business needs.",
    image: item.image
  }));
  return (
    <section className="relative py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27 bg-white text-gray-900">
      <div className="container mx-auto">
        <h2 className="text-[28px] md:text-[32px] lg:text-[40px] md:text-center text-left leading-[40px]  font-medium md:mb-15 mb-8 leading-[1.2] font-['Poppins',sans-serif]">
          {sectionData.title}
        </h2>
        <div className="flex flex-col md:flex-row  gap-10">
          {/* Left: Text Content */}
          <div className="w-full md:w-6/12 order-2 md:order-1">

            <div className="space-y-4">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl transition-all transform duration-300 ease-in-out flex items-start gap-4 ${activeIndex === idx ? "bg-white scale-105" : "scale-95 "
                    }`}
                  onMouseEnter={() => setActiveIndex(idx)}
                >
                  {/* Image Left */}
                  <img
                    src={`https://xigiled.in/storage/${feature.image}`}
                    alt={feature.title}
                    className="w-[60px] h-[60px] bg-[#e8f1ff] p-2.5 rounded-[5px] object-contain"
                  />

                  <div className="flex flex-col">
                    <h3 className="text-[22px] mb-3 font-semibold text-[#0000ff]">
                      {feature.title}</h3>
                    {activeIndex === idx && (
                      <p className="text-black text-[14px] md:text-[17px] lg:text-[17px] font-medium font-['Montserrat',sans-serif] mb-6 leading-relaxed">
                        {feature.desc}
                      </p>
                    )}
                  </div>
                </div>

              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="w-full md:w-6/12 order-1 md:order-2 flex justify-center items-center">
            {rightSideImage ? (
              <img
                src={`https://xigiled.in/storage/${rightSideImage.image}`}
                alt={sectionData.title}
                className="md:w-[90%] h-[400px] w-[100%] object-cover rounded-2xl"
              />
            ) : validImages.length > 0 ? (
              <img
                src={`https://xigiled.in/storage/${validImages[0].image}`}
                alt={sectionData.title}
                className="w-full h-auto object-cover rounded-2xl"
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

const MemberConnect = ({ testimonialsSection }) => {
  const navigate = useNavigate();
  
  // Function to create SEO-friendly slug
  const createClientSlug = (clientName) => {
    if (!clientName) return 'client';
    
    return clientName
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  if (!testimonialsSection?.images) return null;

  // Create client data from existing fields
  const testimonials = testimonialsSection.images.map((testimonial, index) => ({
    id: index + 1,
    name: testimonial.client_name?.trim() || "Client",
    position: testimonial.title || "Project Manager",
    testimonial: testimonial.description || "Great service!",
    image: `https://xigiled.in/storage/${testimonial.image}`,
    company: testimonial.company || `${testimonial.client_name}'s Company`,
    industry: testimonial.industry || "Various Industries",
    location: testimonial.location || "Tamil Nadu",
    slug: createClientSlug(testimonial.client_name || `client-${index + 1}`)
  }));

  // Handle client logo click
  const handleClientClick = (client) => {
    navigate(`/clients/${client.slug}`, { state: { client } });
  };

  // Calculate if we have enough slides for loop mode
  // Swiper requires at least 2 * slidesPerView slides for loop to work properly
  const getSlidesPerView = (breakpoint = 'desktop') => {
    const breakpointConfig = {
      mobile: Math.min(2, testimonials.length),
      tablet: Math.min(3, testimonials.length),
      desktop: Math.min(5, testimonials.length)
    };
    return breakpointConfig[breakpoint] || breakpointConfig.desktop;
  };

  const desktopSlidesPerView = getSlidesPerView('desktop');
  const hasEnoughSlidesForLoop = testimonials.length >= desktopSlidesPerView * 2;

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-bold text-center mb-6">
          {testimonialsSection.title || "Trusted Clients"}
        </h2>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={desktopSlidesPerView}
          centeredSlides={testimonials.length > 2}
          loop={hasEnoughSlidesForLoop}
          autoplay={{ 
            delay: 2000, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            // Disable autoplay if not enough slides for smooth loop
            stopOnLastSlide: !hasEnoughSlidesForLoop
          }}
          breakpoints={{
            // Mobile: show 1-2 slides based on available testimonials
            320: { 
              slidesPerView: getSlidesPerView('mobile'),
              centeredSlides: testimonials.length > 1,
              // Disable loop on mobile if not enough slides
              loop: testimonials.length >= getSlidesPerView('mobile') * 2
            },
            // Tablet: show 2-3 slides based on available testimonials
            640: { 
              slidesPerView: getSlidesPerView('tablet'),
              centeredSlides: testimonials.length > 2,
              // Disable loop on tablet if not enough slides
              loop: testimonials.length >= getSlidesPerView('tablet') * 2
            },
            // Desktop: show 3-5 slides based on available testimonials
            1024: { 
              slidesPerView: desktopSlidesPerView,
              centeredSlides: testimonials.length > 3,
              loop: hasEnoughSlidesForLoop
            },
          }}
          // Add warning suppression for development
          on={{
            init: function (swiper) {
              if (!hasEnoughSlidesForLoop && swiper.params.loop) {
                console.warn('Swiper: Not enough slides for loop mode, disabling loop');
                swiper.params.loop = false;
                swiper.destroyLoop();
                swiper.reinit();
              }
            }
          }}
        >
          {testimonials.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col items-center">
                {/* Clickable Logo in Circle */}
                <div 
                  className="flex justify-center items-center bg-white rounded-full shadow-sm overflow-hidden h-32 w-32 md:h-40 md:w-40 mx-auto mb-3 cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                  onClick={() => handleClientClick(item)}
                  title={`View ${item.name} case study`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover h-full w-full"
                  />
                </div>
                
                {/* Client Info */}
                <div className="text-center mt-2">
                  <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                  <p className="text-gray-600 text-xs mt-1">{item.position}</p>
                  {item.company && (
                    <p className="text-gray-500 text-xs mt-1">{item.company}</p>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Show message if very few testimonials */}
        {testimonials.length <= 2 && (
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              More client testimonials coming soon...
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

const Home = () => {

  const [homeData, setHomeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await fetch('https://xigiled.in/api/home');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setHomeData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const handleCtaClick = () => {
    // Navigate to contact page first
    navigate('/contact');

    // Store the intent to scroll to form in session storage
    sessionStorage.setItem('scrollToContactForm', 'true');
  };


  const handleClick = () => {
    const testimonialsSection = document.getElementById('testimonials-section');
    if (testimonialsSection) {
      testimonialsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to create industry slug
  const createIndustrySlug = (title) => {
    if (!title) return '';

    // Normalize the title (remove special chars and trim extra spaces)
    const normalizedTitle = title.replace(/&/g, 'and').replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, ' ').trim();

    const specialCases = {
      'Hotels and Hospitalities': 'HospitalityHotels',
      'Government and Public Spaces': 'GovernmentCivicSpaces',
      'Manufacturing Factories': 'ManfacturingAndFactories',
      'Transport and Public Venues': 'TransportAndPublicVenues',
      'Events and Exhibitions': 'EventsAndExhibitions',
      'Education': 'EducationAndInstitutions',
      'Retail Environments': 'Retail'
    };

    if (specialCases[normalizedTitle]) {
      return specialCases[normalizedTitle];
    }

    // Default fallback (title-cased and no spaces)
    return normalizedTitle
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  };

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
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }
  // Get sections by their identifiers
  const whyChooseSection = homeData.find(section => section.section === 'home_section1');
  const completeRangeSection = homeData.find(section => section.section === 'home_section2');
  const industrySection = homeData.find(section => section.section === 'home_section3');
  const supportSection = homeData.find(section => section.section === 'home_section4');
  const industryApplicationsSection = homeData.find(section => section.section === 'home_section5');
  const testimonialsSection = homeData.find(section => section.section === 'home_section6');

  return (
    <div className="min-h-screen flex flex-col">
      <SEOMetaTags pageType="home" />

      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-screen w-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          >
            <source src={banner} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-10"></div>

          <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4 bg-transparent">
            <h1 className="text-4xl md:text-6xl font-semibold py-2 from-blue-300 via-white to-blue-300 bg-clip-text text-white font-['Poppins',sans-serif]">
              Brighten Every Space
            </h1>
            <p className="mt-4 max-w-2xl text-[16px] lg:text-[16px] md:text-[16px] font-['Montserrat',sans-serif] font-medium text-white">
              India's leading LED Video Wall & Display Experts. From retail stores to moving trucks, stadiums to auditoriums, events to government.Xigi LED powers your brand, message, and experience everywhere.
            </p>
            <a
              href="https://wa.me/9494220622?text=Hi, I want an instant quote"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 bg-gradient-to-r from-blue-600 to-indigo-600 
             hover:from-indigo-700 hover:to-blue-700 text-white px-6 md:px-7 py-3 
             rounded shadow-md text-sm md:text-[15px] font-medium transition-all duration-300
             text-left md:text-center"
            >
              Get Instant Quote
            </a>

          </div>
        </div>

   {/* Why Choose Section */}
{whyChooseSection && (
  <section className="container py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-28 bg-white">
    <div className='choose-head text-center mb-12'>
      <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium mb-10 text-center text-gray-900 font-['Poppins',sans-serif]">
        {whyChooseSection.title}
      </h2>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-5 lg:gap-7">
      {whyChooseSection.images.map((feature, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-all duration-300"
        >
          <div className="flex rounded-md mb-4">
            <img
              src={`https://xigiled.in/storage/${feature.image}`}
              alt={feature.title}
              className="w-[60px] h-[60px] bg-[#e8f1ff] p-2.5 rounded-[5px] object-contain"
            />
          </div>
          <h3 className="font-semibold text-xl md:text-[22px] text-gray-900 mb-3">
            {feature.title}
          </h3>
          <p className="text-base md:text-[17px] text-black font-['Montserrat',sans-serif] font-medium leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  </section>
)}



        {/* Complete Range Section */}
        {completeRangeSection && (
          <section className="
          py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27 bg-[#f3f7ff]">
            <div className="container mx-auto">
              <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium mb-10 text-center text-gray-900 font-['Poppins',sans-serif]">
                {completeRangeSection.title}
              </h2>

              <div className="grid grid-cols-12 gap-6">
                {/* Left Column - Main Products */}
                <div className="col-span-12 lg:col-span-9">
                  {/* First Row - Indoor, Outdoor, Interactive */}
                  <div className="grid grid-cols-12 gap-6 mb-6">
                    {/* Indoor LED Wall - 6 columns */}
                    {completeRangeSection.images[0] && (
                      <a
                        href="/products/indoor-led-video-walls"
                        className="block col-span-12 md:col-span-6 bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden h-[250px] md:h-[200px] lg:h-[240px]">
                        {/* Content here */}                <img
                          src={`https://xigiled.in/storage/${completeRangeSection.images[0].image}`}
                          alt={completeRangeSection.images[0].title}
                          className="w-full object-cover h-[250px] lg:h-[240px]  md:object-cover  rounded-xl"
                        />
                      </a>
                    )}

                    {/* Outdoor LED - 3 columns */}
                    {completeRangeSection.images[1] && (
                      <a
                        href="/products/outdoor-led-video-walls"
                        className="block col-span-12 md:col-span-3 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden h-[300px] md:h-[200px] lg:h-[240px]"
                      >
                        <img
                          src={`https://xigiled.in/storage/${completeRangeSection.images[1].image}`}
                          className="w-full h-full object-containrounded-xl"
                          alt={completeRangeSection.images[1].title}
                        />
                      </a>
                    )}

                    {/* Interactive Display - 3 columns */}
                    {completeRangeSection.images[2] && (
                      <a
                        href="/products/interactive-display"
                        className="block col-span-12 md:col-span-3 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden h-[300px] md:h-[200px] lg:h-[240px]"
                      >
                        <img
                          src={`https://xigiled.in/storage/${completeRangeSection.images[2].image}`}
                          className="w-full h-full object-containrounded-xl"
                          alt={completeRangeSection.images[2].title}
                        />
                      </a>
                    )}
                  </div>

                  {/* Second Row - Transparent, Truck Mounted */}
                  <div className="grid grid-cols-12 gap-6 mb-6">
                    {/* Transparent LED - 5 cols */}
                    {completeRangeSection.images[4] && (
                      <a
                        href="/products/transparent-led-display"
                        className="block col-span-12 md:col-span-5 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden h-[208px] md:h-[200px] lg:h-[240px]"
                      >
                        <img
                          src={`https://xigiled.in/storage/${completeRangeSection.images[4].image}`}
                          className="w-full h-full object-cover rounded-xl"
                          alt={completeRangeSection.images[4].title}
                        />
                      </a>
                    )}

                    {/* Truck Mounted - 7 cols */}
                    {completeRangeSection.images[7] && (
                      <a
                        href="/products/truck-mounted-led"
                        className="block col-span-12 md:col-span-7 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden h-[180px] md:h-[200px] lg:h-[240px]"
                      >
                        <img
                          src={`https://xigiled.in/storage/${completeRangeSection.images[7].image}`}
                          className="w-full h-full object-cover rounded-xl"
                          alt={completeRangeSection.images[7].title}
                        />
                      </a>
                    )}
                  </div>

                  {/* Third Row - Flexible & Custom LED */}
                  <div className="grid grid-cols-12 gap-6">
                    {/* Flexible & Curved - 7 cols */}
                    {completeRangeSection.images[6] && (
                      <a
                        href="/products/flexible-curved-led-walls"
                        className="block col-span-12 md:col-span-7 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden h-[180px] md:h-[200px] lg:h-[240px]"
                      >
                        <img
                          src={`https://xigiled.in/storage/${completeRangeSection.images[6].image}`}
                          className="w-full h-full object-cover rounded-xl"
                          alt={completeRangeSection.images[6].title}
                        />
                      </a>
                    )}

                    {/* Custom LED - 5 cols */}
                    {completeRangeSection.images[8] && (
                      <a
                        href="/products/custom-led-display"
                        className="block col-span-12 md:col-span-5 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden h-[250px] md:h-[200px] lg:h-[240px]"
                      >
                        <img
                          src={`https://xigiled.in/storage/${completeRangeSection.images[8].image}`}
                          className="w-full h-full object-cover rounded-xl"
                          alt={completeRangeSection.images[8].title}
                        />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column - LED Standee & Rental */}
                <div className="col-span-12 md:col-span-6 lg:col-span-3">
                  {/* Mobile & Desktop: Flex Column */}
                  <div className="flex flex-col md:hidden lg:flex gap-4 md:gap-6">
                    {/* LED Standee */}
                    {completeRangeSection.images[3] && (
                      <a
                        href="/products/led-standee-display"
                        className="block rounded-xl shadow-sm hover:shadow-md transition h-[400px] lg:h-[373px] overflow-hidden bg-white"
                      >
                        <img
                          src={`https://xigiled.in/storage/${completeRangeSection.images[3].image}`}
                          className="w-full h-full object-cover rounded-xl"
                          alt={completeRangeSection.images[3].title}
                        />
                      </a>
                    )}

                    {/* Rental & Event Display */}
                    {completeRangeSection.images[5] && (
                      <a
                        href="/products/rental-event-display"
                        className="block rounded-xl shadow-sm hover:shadow-md transition overflow-hidden h-[350px] lg:h-[373px] bg-white"
                      >
                        <img
                          src={`https://xigiled.in/storage/${completeRangeSection.images[5].image}`}
                          className="w-full h-full object-cover rounded-xl"
                          alt={completeRangeSection.images[5].title}
                        />
                      </a>
                    )}
                  </div>

                  {/* Tablet Only: Flex Row */}
                  <div className="hidden md:flex lg:hidden flex-row gap-4">
                    {/* LED Standee */}
                    {completeRangeSection.images[3] && (
                      <a
                        href="/products/led-standee-display"
                        className="block rounded-xl shadow-sm hover:shadow-md transition h-[200px] overflow-hidden bg-white flex-1"
                      >
                        <img
                          src={`https://xigiled.in/storage/${completeRangeSection.images[3].image}`}
                          className="w-full h-full object-cover rounded-xl"
                          alt={completeRangeSection.images[3].title}
                        />
                      </a>
                    )}

                    {/* Rental & Event Display */}
                    {completeRangeSection.images[5] && (
                      <a
                        href="/products/rental-event-display"
                        className="block rounded-xl shadow-sm hover:shadow-md transition overflow-hidden h-[200px] bg-white flex-1"
                      >
                        <img
                          src={`https://xigiled.in/storage/${completeRangeSection.images[5].image}`}
                          className="w-full h-full object-cover rounded-xl"
                          alt={completeRangeSection.images[5].title}
                        />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Industry Section */}
        {industrySection && (
          <section className="w-full py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27">
            <div className="container mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-12">
              <div className="w-full lg:w-4/12 flex flex-col justify-center">
                <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-gray-900 mb-4 leading-[1.2]] font-['Poppins',sans-serif]">
                  {industrySection.title}
                </h2>
                <p className="md:text-[17px] text-gray-800 font-['Montserrat',sans-serif] leading-relaxed mb-6 font-medium">
                  {industrySection.description}
                </p>
                <button
                  onClick={() => navigate('/industry')}
                  className="w-fit bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-blue-700 text-white text-[15px] px-6 py-3 rounded-md shadow-md text-[16px] font-medium transition-all duration-300"
                >
                  See all Solutions for your Industry
                </button>

              </div>

              <div className="w-full lg:w-8/12">
                <div className="flex justify-center">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-4xl">
                    {industrySection.images.map((product, idx) => (
                      <div
                        key={idx}
                        onClick={() => navigate(`/industry/${createIndustrySlug(product.title)}`)}
                        className="relative bg-[#E8F1FF] rounded-xl shadow flex flex-col items-center justify-center text-center p-5 font-semibold text-black text-[16px] hover:shadow-lg transition-all group overflow-hidden h-50 sm:h-48 md:h-60 cursor-pointer"
                      >
                        {/* Hover Image (Second Image) */}
                        {product.image && product.image[1] && (
                          <img
                            src={`https://xigiled.in/storage/${product.image[0]}`}
                            alt={product.title + ' Hover'}
                            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                          />
                        )}

                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                        {/* Default Image (First Image) */}
                        {product.image && product.image[0] && (
                          <img
                            src={`https://xigiled.in/storage/${product.image[1]}`}
                            alt={product.title}
                            className="lg:w-[50px] h-[50px] mb-3 z-30 transition-opacity duration-500 group-hover:opacity-0 "
                          />
                        )}

                        <span className="relative z-30 px-2 text-center text-[17px] transition-colors duration-300 group-hover:text-white">
                          {product.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Support Section */}
        {supportSection && (
          <section
            className="relative py-20 md:py-16 lg:py-24 px-4 md:px-6 lg:px-10 text-white"
            style={{
              backgroundImage:
                supportSection.images.length > 2 && supportSection.images[2].image
                  ? `url('https://xigiled.in/storage/${supportSection.images[2].image}')`
                  : `url('../src/assets/cta.jpeg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/50 z-0"></div>

            <div className="max-w-7xl mx-auto relative z-10">
              {/* Heading + Button */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <h2 className="text-[24px] md:text-[32px] lg:text-[40px] leading-[1.4] font-medium  font-['Poppins',sans-serif] md:w-[500px] lg:w-[800px]">
                  {supportSection.title}
                </h2>
                <button
                  onClick={handleCtaClick}
                  className="bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-600 
             hover:from-indigo-700 hover:to-blue-700 text-white px-6 md:px-5 py-3 
             rounded shadow-md text-sm md:text-[15px] font-medium transition-all duration-300"
                >
                  Get Product Help
                </button>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {supportSection.images.slice(0, 2).map((support, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-[#113A79]/80 via-[#757575]/40 to-[#889CBC]/80 
                       backdrop-blur-sm rounded-xl p-6 text-white 
                       h-auto md:h-[280px] lg:h-[300px]"
                  >
                    <div className="flex flex-col items-start gap-3">
                      <div className="p-3 rounded-[10px]">
                        <img
                          src={`https://xigiled.in/storage/${support.image}`}
                          alt={support.title}
                          className="w-[55px] h-[55px] md:w-[60px] md:h-[60px] 
                             bg-[#e8f1ff] p-2.5 rounded-[5px] object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-[20px] md:text-[22px] font-medium mb-3 md:mb-4">
                          {support.title}
                        </h3>
                        <p className="text-[15px] md:text-[17px] font-['Montserrat',sans-serif] text-white font-medium leading-relaxed">
                          {support.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}


        {/* Industry Applications Section */}
        {industryApplicationsSection && (
          <IndustrySection sectionData={industryApplicationsSection} />
        )}
{/* 
        {testimonialsSection && (
          <div id="testimonials-section">
            <MemberConnect testimonialsSection={testimonialsSection} />
          </div>
        )} */}

        {/* CTA Section */}
        <div style={{ backgroundColor: "#F3F7FF" }}>
          <section className="container w-full py-16 md:py-20 lg:py-24 px-4 md:px-8 lg:px-28" >
            <div className="rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row h-auto md:h-[450px] lg:h-[480px]">
              <div className="w-full md:w-5/12 h-64 md:h-auto">
                <img src={ctaImage} alt="Digital billboard advertising" className="w-full h-full object-cover" />
              </div>
              <div className="w-full md:w-7/12 bg-[#E8F1FF] flex items-center p-6 md:p-10 lg:p-12">
                <div className="text-left md:text-left w-full">
                  <h2 className="text-[26px] md:text-[32px] lg:text-[40px] font-medium text-black mb-4 leading-snug font-['Poppins',sans-serif]">
                    Ready to Transform Your Advertising?
                  </h2>
                  <p className="text-black mb-6 text-base md:text-[17px] leading-relaxed font-medium font-['Montserrat',sans-serif]">
                    With Xigi DOOH, you're not just getting ad space. you're gaining a partner committed to elevating your brand.
                  </p>
                  <button
                    onClick={handleCtaClick}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-3 rounded-md shadow-md text-sm md:text-base font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
                    aria-label="See solutions for your industry"
                  >
                    See Solutions for Your Industry
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;