import React, { useRef, useEffect, useState } from 'react';
import '../styles/Home.css';
import banner from '../assets/videos/XIGI Led Banner.mp4';
import Header from '../components/Header';
import Footer from '../components/Footer';
import cta from '../assets/cta1.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


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
        <h2 className="text-[28px] md:text-[32px] lg:text-[40px] text-center mx-auto  font-medium mb-15 leading-[1.2] font-['Poppins',sans-serif]">
          {sectionData.title}
        </h2>
        <div className="flex flex-col md:flex-row  gap-10">
          {/* Left: Text Content */}
          <div className="w-full md:w-6/12 order-2 md:order-1">

            <div className="space-y-4">
              {features.map((feature, idx) => (
                <div
                  key={idx}
             className={`p-3 rounded-xl transition-all transform duration-300 ease-in-out flex items-start gap-4 ${
  activeIndex === idx ? "bg-white scale-105" : "scale-95 "
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
<h3 className="text-[22px] font-semibold text-[#0000ff]">
                      {feature.title}</h3>
                    {activeIndex === idx && (
                      <p className="text-[17px] text-gray-600 mt-2 font-[Montserrat] font-medium">
                        {feature.desc}
                      </p>
                    )}
                  </div>
                </div>

              ))}
            </div>


          </div>

          {/* Right: Image */}
          <div className="w-full md:w-6/12 order-1 md:order-2 flex justify-center">
            {rightSideImage ? (
              <img
                src={`https://xigiled.in/storage/${rightSideImage.image}`}
                alt={sectionData.title}
                className="w-[90%] h-[400px] object-cover rounded-2xl"
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
  if (!testimonialsSection?.images) return null;

  // Client details + image mapping
  const testimonials = testimonialsSection.images.map((testimonial) => ({
    name: testimonial.client_name?.trim() || "Client",
    title: testimonial.title || "Client",
    feedback: testimonial.description || "Great service!",
    image: `https://xigiled.in/storage/${testimonial.image}`,
  }));

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-bold text-center mb-6">Trusted Clients</h2>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={4}
          centeredSlides={true} // ✅ Slides center la varum
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 2, centeredSlides: true },
            640: { slidesPerView: 3, centeredSlides: true },
            1024: { slidesPerView: 5, centeredSlides: true },
          }}
        >
          {testimonials.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col items-center">
                {/* Logo in Circle */}
                <div className="flex justify-center items-center bg-white rounded-full shadow-sm overflow-hidden h-40 w-40 mx-auto mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover h-full w-full"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
            <h1 className="text-5xl md:text-6xl font-semibold py-2 from-blue-300 via-white to-blue-300 bg-clip-text text-white font-['Poppins',sans-serif]">
              Brighten Every Space
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-[16px] font-['Montserrat',sans-serif] font-medium text-white">
              India's No.1 LED Video Wall & Display Experts. From retail stores to moving trucks, stadiums to auditoriums, events to government.Xigi LED powers your brand, message, and experience everywhere.
            </p>
          <a
  href="https://wa.me/9494220622?text=Hi, I want an instant quote"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-5 bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-600 
             hover:from-indigo-700 hover:to-blue-700 text-white px-6 md:px-7 py-3 
             rounded shadow-md text-sm md:text-[15px] font-medium transition-all duration-300"
>
  Get Instant Quote
</a>

          </div>
        </div>

        {/* Why Choose Section */}
        {whyChooseSection && (
          <section className="py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-28 md:px-8 bg-gradient-to-r from-white via-white to-[#f8f9fc]">
            <div className="container mx-auto text-center">
              <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium mb-10 text-gray-900 leading-tight font-['Poppins',sans-serif]">
                {whyChooseSection.title}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-5 lg:gap-7">
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
                    <p className="text-base md:text-[17px] text-gray-800 font-['Montserrat',sans-serif] font-medium leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                {/* <button
                  className="bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 md:px-7 py-3 rounded-md shadow-md text-sm md:text-[15px] font-medium transition-all duration-300"
                  onClick={handleClick}>
                  See Our Client Stories
                </button> */}
              </div>
            </div>
          </section>
        )}

        {/* Complete Range Section */}
{completeRangeSection && (
  <section className="py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27 bg-[#f3f7ff]">
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
                className="block col-span-12 md:col-span-6 bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden h-60"
              >
                <img
                  src={`https://xigiled.in/storage/${completeRangeSection.images[0].image}`}
                  alt={completeRangeSection.images[0].title}
                  className="w-full  object-cover rounded-xl h-[350px]"
                />
              </a>
            )}

            {/* Outdoor LED - 3 columns */}
            {completeRangeSection.images[1] && (
              <a 
                href="/products/outdoor-led-video-walls" 
                className="block col-span-12 md:col-span-3 bg-gray-900 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden h-60"
              >
                <img
                  src={`https://xigiled.in/storage/${completeRangeSection.images[1].image}`}
                  className="w-full h-full object-cover rounded-xl"
                  alt={completeRangeSection.images[1].title}
                />
              </a>
            )}

            {/* Interactive Display - 3 columns */}
            {completeRangeSection.images[2] && (
              <a 
                href="/products/interactive-display" 
                className="block col-span-12 md:col-span-3 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden h-60"
              >
                <img
                  src={`https://xigiled.in/storage/${completeRangeSection.images[2].image}`}
                  className="w-full h-full object-cover rounded-xl"
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
                className="block col-span-12 md:col-span-5 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden h-60"
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
                className="block col-span-12 md:col-span-7 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden h-60"
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
                href="/products/flexible-led-display" 
                className="block col-span-12 md:col-span-7 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden h-60"
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
                className="block col-span-12 md:col-span-5 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden h-60"
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
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          {/* LED Standee */}
          {completeRangeSection.images[3] && (
            <a 
              href="/products/led-standee-display" 
              className=" rounded-xl shadow-sm hover:shadow-md transition  h-[373px] overflow-hidden  bg-white"
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
              className="rounded-xl shadow-sm hover:shadow-md transition overflow-hidden h-[373px] bg-white"
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
  </section>
)}

        {/* Stats Section
        <section className="w-full py-20 px-4 bg-gradient-to-b from-white to-[#eaf1ff]">
          <div className="max-w-[1440px] mx-auto w-full">
            <div className="hidden md:flex w-full items-center justify-between text-left mb-12 px-20">
              <div className="flex flex-col items-start min-w-[120px] pl-[100px]">
                <p className="text-[36px] font-bold text-black">3000+</p>
                <p className="text-[16px] font-semibold text-black">Installations</p>
              </div>

              <div className="flex-1 text-center px-6 ">
                <h2 className="text-[28px] md:text-[30px] lg:text-[40px] font-medium mb-3 leading-[1.2] max-w-xl mx-auto font-['Poppins',sans-serif]">
                  3,000+ Trusted Partnership built on Results
                </h2>
                <p className="text-black text-[10px] md:text-[17px] lg:text-[16px] font-medium font-['Montserrat',sans-serif] leading-relaxed max-w-lg mx-auto">
                  From retail and education to government and global brands, our work powers every sector and geography.
                </p>
              </div>

              <div className="flex flex-col items-end min-w-[100px] pr-[100px]">
                <p className="text-[36px] font-bold text-black">50+</p>
                <p className="text-[16px] font-semibold text-black">Cities</p>
              </div>
            </div>

            <div className="md:hidden text-center mb-5 ">
              <h2 className="text-2xl font-semibold mb-3 leading-[1.2]">
                25,000+ Trusted Partnership built <br /> on Results
              </h2>
              <p className="text-black text-[15px] font-medium font-['Montserrat',sans-serif] leading-relaxed max-w-3xl mx-auto mb-4">
                From retail and education to government and global brands, our work powers every sector and geography.
              </p>

              <div className="flex items-center justify-center gap-4">
                <div className="px-4 py-4 text-center pr-20">
                  <p className="text-[24px] font-extrabold text-black">50+</p>
                  <p className="text-[14px] font-semibold text-black">Cities</p>
                </div>
                <div className="px-6 py-4 text-center">
                  <p className="text-[24px] font-extrabold text-black">3000+</p>
                  <p className="text-[14px] font-semibold text-black">Installations</p>
                </div>
              </div>
            </div>

            <div className="w-full px-20 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="hidden md:flex w-full md:w-auto justify-center">
                <img src={leftImage} alt="Left Panel" className="w-[300px] h-auto" />
              </div>

              <div className="w-full md:w-auto flex justify-center px-6 md:px-12">
                <img src={centerImage} alt="Center LED" className="w-[360px] md:w-[500px] h-auto" />
              </div>

              <div className="hidden md:flex w-full md:w-auto justify-center">
                <img src={rightImage} alt="Right Panel" className="w-[340px] h-auto" />
              </div>
            </div>
          </div>
        </section> */}

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
              className="w-90 h-90 sm:w-14 sm:h-14 mb-3 z-30 transition-opacity duration-500 group-hover:opacity-0 "
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
          <section className="relative py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27 text-white"
            style={{
              backgroundImage: supportSection.images.length > 2 && supportSection.images[2].image
                ? `url('https://xigiled.in/storage/${supportSection.images[2].image}')`
                : `url('../src/assets/cta.jpeg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>
            <div className="absolute inset-0 bg-black/50 z-0"></div>

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="flex justify-between items-start mb-15 flex-wrap gap-4">
                <h2 className="text-[28px] md:text-[32px] leading-[1.4] lg:text-[40px] font-medium max-w-2xl font-['Poppins',sans-serif]">
                  {supportSection.title}
                </h2>
                <button
                  onClick={() => navigate('/contact')}
                  className="bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-600 
             hover:from-indigo-700 hover:to-blue-700 text-white px-6 md:px-5 py-3 
             rounded shadow-md text-sm md:text-[15px] font-medium transition-all duration-300"
                >
                  Get Product Help
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {supportSection.images.slice(0, 2).map((support, index) => (
                  <div key={index} className="bg-gradient-to-br from-[#113A79]/80 h-[300px] via-[#757575]/40 to-[#889CBC]/80 backdrop-blur-sm rounded-xl p-6 text-white">
                    <div className="flex flex-col items-start gap-3">
                      <div className="p-3 rounded-[10px]">
                        <img
                          src={`https://xigiled.in/storage/${support.image}`}
                          alt={support.title}
                             className="w-[60px] h-[60px] bg-[#e8f1ff] p-2.5 rounded-[5px] object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-[22px] font-medium mb-4">{support.title}</h3>
                        <p className="text-[17px] font-['Montserrat',sans-serif] text-white/100 font-medium leading-relaxed">
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

        {/* {testimonialsSection && (
          <div id="testimonials-section">
            <MemberConnect testimonialsSection={testimonialsSection} />
          </div>
        )} */}

        {/* CTA Section */}
<section className="w-full py-20 md:py-17 container lg:py-27 px-4 md:px-5 lg:px-28">
  <div className="rounded-xl overflow-hidden  h-[450px] shadow-lg bg-white flex flex-col md:flex-row items-stretch">
    <div className="w-full md:w-5/12">
      <img
        src={cta}
        alt="DOOH Display"
        className="w-full h-full object-cover"
      />
    </div>

    <div className="w-full md:w-7/12 bg-[#E8F1FF] flex items-center p-8 md:p-12">
      <div className="text-center md:text-left px-10">
        <h2 className="text-[28px] md:text-[32px] lg:text-[40px]  font-medium text-black mb-5 font-['Poppins',sans-serif] leading-[1.3]">
          Ready to Transform Your Advertising?
        </h2>
        <p className="text-gray-700 mb-6 text-base md:text-[17px] font-['Montserrat',sans-serif] leading-relaxed font-medium">
          With Xigi DOOH, you're not just getting ad space. you're gaining a partner committed to elevating your brand
        </p>
        <button
onClick={handleCtaClick}          
          className="bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-blue-700 text-white px-7 py-3 rounded-md shadow-md text-[16px] font-medium transition-all duration-300"
        >
          See Solutions for Your Industry
        </button>
      </div>
    </div>
  </div>
</section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;