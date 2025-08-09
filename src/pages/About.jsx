import React, { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import cta from '../assets/cta.png';
import about from '../assets/about.avif';
import { useNavigate } from 'react-router-dom';

const FAQItem = ({ question, answer, isActive = false }) => {
  const [open, setOpen] = useState(isActive);

  return (
    <div
      className="bg-[#EAF1FF] rounded-lg p-4 mb-4 shadow cursor-pointer transition-all"
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center">
        <p className="text-black text-[15px] md:text-[17px] font-['Montserrat',sans-serif] font-medium">{question}</p>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transform transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </div>
      {open && (
        <div className="mt-4 text-gray-600 text-[14px] md:text-[16px] font-['Montserrat',sans-serif] font-medium">
          {answer}
        </div>
      )}
    </div>
  );
};

const About = () => {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('https://xigiled.in/api/about');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setAboutData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching about data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Helper function to get section data by section name
  const getSectionData = (sectionName) => {
    return aboutData.find(item => item.section === sectionName);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
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
            <p className="text-red-600">Error: {error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Get specific sections
  const aboutSection1 = getSectionData('about_section1');
  const aboutSection2 = getSectionData('about_section2');
  const aboutSection3 = getSectionData('about_section3');
  const aboutSection4 = getSectionData('about_section4');
  const aboutSection5 = getSectionData('about_section5');
  const aboutSection6 = getSectionData('about_section6');
  const faqSection = getSectionData('faq_section');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Banner Section - Keep as hardcoded */}
      <div className="relative h-[70vh] w-full">
        <img
          src={about}
          alt="about Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
          <h1 className="text-[30px] md:text-[35px] lg:text-[50px] font-semibold text-white text-center font-['Poppins',sans-serif]">
            From Vision to Reality
          </h1>
        </div>
      </div>

      {/* About Section 1 - Main Content Section */}
      {aboutSection1 && (
        <section className="py-27 py-20 md:py-17 lg:py-28 px-4 md:px-5 lg:px-27 bg-white">
          <div className="container mx-auto grid md:grid-cols-2 gap-20 items-center">
            {/* Left Image */}
            <div className="flex justify-center">
              <img
                src={`https://xigiled.in/storage/${aboutSection1.images[0]?.image}`}
                alt={aboutSection1.title}
                className="w-full h-[500px] rounded-2xl object-cover"
              />
            </div>

            {/* Right Content */}
            <div>
              <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium mb-4 font-['Poppins',sans-serif]">
                {aboutSection1.title}
              </h2>
              <p className="text-gray-900 text-[17px] mb-6 leading-relaxed font-['Montserrat',sans-serif] font-medium">
                {aboutSection1.description}
              </p>
              <button onClick={() => navigate('/contact')}
 className="bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-blue-700 text-white px-7 py-3 rounded-md shadow-md text-[16px] font-medium transition-all duration-300">
                Connect Now
              </button>
            </div>
          </div>
        </section>
      )}

      {/* About Section 2 - Values Section */}
{aboutSection2 && (
  <section className="bg-[#E8F1FF] py-27 md:py-17 lg:py-27 px-4 md:px-5 lg:px-28">
    <div className="text-center mb-10">
      <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-gray-900 font-['Poppins',sans-serif]">
        {aboutSection2.title}
      </h2>
    </div>

    <div className="container grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Left Column - Mission and Vision */}
      <div className="flex flex-col gap-5">
        {aboutSection2.images
          ?.filter(item => ["Our Mission", "Our Vision"].includes(item.title))
          .map((item, index) => (
            <div 
              key={index} 
              className="relative bg-cover bg-center rounded-xl overflow-hidden h-64 flex flex-col justify-end p-6"
              style={{ 
                backgroundImage: `url(https://xigiled.in/storage/${item.image})` 
              }}
            >
              {/* Overlay for better text visibility */}
              <div className="absolute inset-0 bg-black/60 rounded-xl"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-[25px] text-white font-semibold mb-1">
                  {item.title}
                </h3>
                <p className="text-[16px] text-white font-['Montserrat',sans-serif] font-medium">
                  {item.description}
                </p>
              </div>
            </div>
          ))
        }
      </div>
      
      {/* Right Column - Brand Power */}
      {aboutSection2.images?.find(item => item.title === "Unleash the Power of Your Brand with XIGI LED") && (
        <div>
          <div 
            className="relative bg-cover bg-center rounded-xl text-white p-6 h-full min-h-[500px] flex flex-col justify-end overflow-hidden" 
            style={{ 
              backgroundImage: `url(https://xigiled.in/storage/${
                aboutSection2.images.find(img => 
                  img.title === "Unleash the Power of Your Brand with XIGI LED"
                )?.image
              })` 
            }}
          >
            {/* Bottom 80% overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-[80%] bg-gradient-to-t from-black/90 via-black/70 to-transparent rounded-xl"></div>
            
            {/* Content with higher z-index */}
            <div className="relative z-10">
              <h3 className="text-sm mb-1">
                {aboutSection2.images.find(img => 
                  img.title === "Unleash the Power of Your Brand with XIGI LED"
                )?.title}
              </h3>
              <h4 className="text-xl md:text-2xl font-bold leading-snug mb-2">
                Values That Drive Us
              </h4>
              <p className="text-sm font-['Montserrat',sans-serif] font-medium">
                {aboutSection2.images.find(img => 
                  img.title === "Unleash the Power of Your Brand with XIGI LED"
                )?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  </section>
)}

      {/* About Section 3 - Innovation Section */}
      {aboutSection3 && (
        <section className="relative py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27 text-white">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-col lg:flex-row items-center gap-20">
              {/* Left Content Section with innovation features */}
              <div className="w-full lg:w-6/12 order-2 md:order-1">
                <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-gray-900 mb-6 leading-snug font-['Poppins',sans-serif]">
                  {aboutSection3.title}
                </h2>
                <p className="text-gray-900 text-[17px] mb-6 font-['Montserrat',sans-serif] font-medium">
                  {aboutSection3.description}
                </p>

                <div className="space-y-6">
                  {aboutSection3.images?.slice(1, 4).map((feature, index) => (
                    <div key={index} className="flex w-full bg-white rounded-xl justify-center items-center p-4">
                      <img
                        src={`https://xigiled.in/storage/${feature.image}`}
                        alt="Innovation"
                        className="w-20 h-20 object-cover rounded-lg me-4"
                      />
                      <p className="text-gray-900 text-[17px] font-['Montserrat',sans-serif] font-medium">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Image Section - main innovation image */}
              {aboutSection3.images?.[0] && (
                <div className="hidden md:flex w-full md:w-8/12 lg:w-6/12 order-1 justify-end">
                  <img
                    src={`https://xigiled.in/storage/${aboutSection3.images[0].image}`}
                    alt="Innovation"
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* About Section 4 - Services Section */}
      {aboutSection4 && (
        <section className="bg-[#E8F1FF] py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27">
          <div className="text-center mb-10">
            <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-gray-900 leading-snug font-['Poppins',sans-serif]">
              {aboutSection4.title}
            </h2>
          </div>

          <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {aboutSection4.images?.map((service, index) => (
              <div key={index} className="rounded-xl shadow-sm flex flex-col items-center text-center">
                <img 
                  src={`https://xigiled.in/storage/${service.image}`} 
                  alt={service.title} 
                  className="w-full h-48 sm:h-52 md:h-60 object-cover rounded-t-[10px] mb-3" 
                />
                <p className="text-[18px] sm:text-[20px] py-3 font-['Montserrat',sans-serif] font-medium mb-2">
                  {service.title}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* About Section 5 - Statistics Section */}
      {aboutSection5 && (
        <section className="py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-[#E8F1FF] rounded-[20px] p-6 sm:p-10 lg:p-20">
            {/* LEFT TEXT SECTION */}
            <div className='ms-10'>
              <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-[#000] mb-4 leading-tight font-['Poppins',sans-serif]">
                {aboutSection5.title}
              </h2>
              <p className="text-gray-700 text-base md:text-[17px] mb-6 font-['Montserrat',sans-serif] font-medium">
                {aboutSection5.description}
              </p>
              <button onClick={() => navigate('/contact')} className="bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-3 rounded-md shadow-md text-[16px] font-medium transition-all duration-300">
                Contact now
              </button>
            </div>

            {/* RIGHT STAT + IMAGE GRID */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {aboutSection5.images?.map((stat, index) => (
                <div key={index} className={`bg-white rounded-xl p-5 flex flex-col justify-center items-center text-center shadow h-36 sm:h-70 ${index === 1 ? 'sm:mt-12 md:mt-20' : ''}`}>
                  <p className="text-[#1E2EFF] text-[50px] sm:text-[60px] md:text-[70px] mb-1 font-['Montserrat',sans-serif] font-medium">
                    {stat.title}
                  </p>
                  <p className="text-black text-[16px] sm:text-[18px] md:text-[20px] font-['Montserrat',sans-serif] font-semibold">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section 6 - Promise Section */}
      {aboutSection6 && (
        <section className="bg-[#EAF1FF] py-20 md:py-17 lg:py-27 px-4 md:px-5 lg:px-27">
          <h2 className="text-center text-[28px] md:text-[32px] lg:text-[40px] font-medium mb-10 font-['Poppins',sans-serif]">
            {aboutSection6.title}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Left Image Block */}
            {aboutSection6.images?.[0] && (
              <div className="relative bg-cover bg-center rounded-xl overflow-hidden h-[300px] md:h-[350px] lg:h-[400px] shadow">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(https://xigiled.in/storage/${aboutSection6.images[0].image})` }}
                ></div>
                {/* Bottom overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>
                {/* Text content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-[18px] font-['Montserrat',sans-serif] font-medium">
                    {aboutSection6.images[0].title}
                  </p>
                </div>
              </div>
            )}

            {/* Center Icon Grid */}
      {/* Center Icon Grid */}
<div className="grid grid-cols-2 gap-4 justify-center">
  {/* Find and display the specific icons in order */}
  {aboutSection6.images
    ?.filter(icon => 
      ["impact", "reliability", "ROI", "performance"].includes(icon.title)
    )
    .sort((a, b) => {
      // Sort them in the specific order we want
      const order = ["impact", "reliability", "ROI", "performance"];
      return order.indexOf(a.title) - order.indexOf(b.title);
    })
    .map((icon, index) => (
      <div key={index} className="bg-white rounded-xl p-6 md:p-10 flex flex-col items-center justify-center text-center shadow">
        <img 
          src={`https://xigiled.in/storage/${icon.image}`} 
          alt={icon.title} 
          className="w-16 h-16 md:w-20 md:h-20 mb-2" 
        />
        <p className="text-black text-md font-['Montserrat',sans-serif] font-medium">
          {icon.title}
        </p>
      </div>
    ))
  }
</div>

            {/* Right Image Block */}
            {aboutSection6.images?.[5] && (
              <div className="relative bg-cover bg-center rounded-xl overflow-hidden h-[300px] md:h-[350px] lg:h-[400px] shadow">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(https://xigiled.in/storage/${aboutSection6.images[5].image})` }}
                ></div>
                {/* Bottom overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>
                {/* Text content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-[18px] font-['Montserrat',sans-serif] font-medium">
                    {aboutSection6.images[5].title}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* FAQ Section */}
{/* FAQ Section */}
{faqSection && (
  <section className="bg-[#fff] py-10 md:py-27 px-4 md:px-20">
    <h2 className="text-center text-[28px] md:text-[32px] lg:text-[40px] font-medium mb-8 md:mb-10 font-['Poppins',sans-serif]">
      {faqSection.title}
    </h2>
    <div className="max-w-4xl mx-auto">
      {faqSection.faq_entries?.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isActive={index === 0} // This will make only the first item active by default
        />
      ))}
    </div>
  </section>
)}

      {/* CTA Section - Keep as hardcoded */}
      <section className="w-full bg-[#f2f2fd] py-27 px-4 md:px-5 lg:px-29">
        <div className="mx-auto bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row items-center">
          {/* Left Image */}
          <div className="w-full md:w-1/2 h-[300px] md:h-[550px] lg:h-[500px]">
            <img
              src={cta}
              alt="DOOH Display"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="w-full md:w-1/2 p-8 md:p-12 text-center md:text-left">
            <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-black mb-5 font-['Poppins',sans-serif]">
              Ready to Transform Your Advertising?
            </h2>
            <p className="font-['Montserrat',sans-serif] text-gray-700 mb-5 text-base md:text-[17px] w-[90%] font-medium">
              With Xigi DOOH, you're not just getting ad space – you're gaining a partner committed to elevating your brand
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 cursor-pointer hover:to-blue-700 text-white px-7 py-3 rounded-md shadow-md text-[16px] font-medium transition-all duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About;