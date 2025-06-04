import React, { useRef, useEffect,useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import image1 from "../assets/products/img1.jpg";
import image2 from "../assets/products/img1.jpg";
import image3 from '../assets/products/img1.jpg';
import featureImage from '../assets/Products/img1.jpg'
import feature from '../assets/goverment.jpg'
import featura from '../assets/heroimg.png'


const showcaseItems = [
  {
    title: 'Shop inside displays',
    description:
      'Welcome to XIGI, where we make advertising bold and effective. Experience the future of promotion and bring your business to the next level.',
    image: feature,
  },
  {
    title: 'Digital sign boards',
    description:
      'Engage your audience with eye-catching digital sign boards tailored for your brand. Bright, bold, and highly visible.',
    image: featura,
  },
  {
    title: 'Mall directory',
    description:
      'Interactive mall directories that guide visitors and enhance shopping experiences. Clear, responsive, and smart.',
    image: feature,
  },
  {
    title: 'Product screens',
    description:
      'Highlight your products with high-resolution display screens. Perfect for retail and product launches.',
    image: featura,
  },
  {
    title: 'Lobby welcome screens',
    description:
      'Create a welcoming atmosphere with beautifully designed lobby screens. Set the tone for your space.',
    image: feature,
  },
  {
    title: 'Shop inside displays',
    description:
      'Welcome to XIGI, where we make advertising bold and effective. Experience the future of promotion and bring your business to the next level.',
    image: featura,
  },
  {
    title: 'Mall directory',
    description:
      'Interactive mall directories that guide visitors and enhance shopping experiences. Clear, responsive, and smart.',
    image: feature,
  },
  {
    title: 'Product screens',
    description:
      'Highlight your products with high-resolution display screens. Perfect for retail and product launches.',
    image: featura,
  },
  {
    title: 'Lobby welcome screens',
    description:
      'Create a welcoming atmosphere with beautifully designed lobby screens. Set the tone for your space.',
    image: feature,
  },
  {
    title: 'Shop inside displays',
    description:
      'Welcome to XIGI, where we make advertising bold and effective. Experience the future of promotion and bring your business to the next level.',
    image: featura,
  },


  // Add 5 more if needed
];

const ShowcaseSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % showcaseItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
<section className="bg-blue-100 py-12">
  <div className="container mx-auto px-4">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-bold text-black">For Showcase</h2>
      <button className="bg-blue-900 text-white px-4 py-2 rounded-lg font-medium text-sm">
        View All
      </button>
    </div>

    <div className="flex flex-col md:flex-row bg-blue-200 rounded-xl overflow-hidden">
      <div className="w-full md:w-1/3 p-15 space-y-4">
        {showcaseItems.map((item, index) => (
          <div
            key={index}
            className={`text-2xl font-medium cursor-pointer transition-colors duration-300 ${
              index === currentIndex ? 'text-blue-700' : 'text-black'
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            {item.title}
          </div>
        ))}
      </div>

      <div className="relative w-full md:w-2/3 p-6">
        <img
          src={showcaseItems[currentIndex].image}
          alt={showcaseItems[currentIndex].title}
          className="w-full h-[500px] object-cover rounded-xl"
        />
        <div className="mt-4">
          <h3 className="text-xl font-bold text-black">
            {showcaseItems[currentIndex].title}
          </h3>
          <p className="text-sm text-gray-700">
            {showcaseItems[currentIndex].description}
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

  );
}

const pixelPitches = ['P1.2', 'P1.5', 'P2', 'P2.5', 'P3', 'P4', 'P5', 'P6', 'P8', 'P10'];

const PixelPitchScroll = () => {
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
      }, 20); // adjust speed here
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

  // Duplicate content to simulate infinite scroll
  const fullList = [...pixelPitches, ...pixelPitches];

  return (
    <section className="bg-white py-30">
    <div className="container mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-black">Pixel Pitch</h2>
      </div>
  
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth px-4 md:px-16 no-scrollbar"
        style={{ scrollbarWidth: 'none' }}
      >
        {fullList.map((pitch, index) => (
          <div key={index} className="flex-shrink-0 text-center w-[160px]">
            <img
              src="/images/pixel.png"
              alt={pitch}
              className="w-full h-[130px] object-cover rounded-2xl shadow-lg"
            />
            <p className="mt-3 text-lg font-semibold text-black">{pitch}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
  
  );
};

const Indoor_Led = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
 
      {/* Banner Section */}

      <div className="relative h-[60vh] w-full">
        <img
          src="/images/industry-banner.jpg"
          alt="Industry Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
            Contact Us
          </h1>
        </div>
      </div>

      <section className="py-16 px-4 md:px-12 lg:px-20 bg-white space-y-10">

        {/* Row 1 - Text Left, Image Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 max-w-7xl mx-auto">
          <div className="bg-[#F1F5F9] md:col-span-5 rounded-xl p-8 flex flex-col justify-center h-auto md:h-[500px]">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5 md:mb-7">Ultra-HD Visuals</h2>
            <p className="text-sm md:text-md text-gray-700 mb-5 md:mb-7">
              Immerse your audience with stunning Ultra-HD visuals that deliver exceptional clarity and detail.
            </p>
            <button className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium px-5 py-2 rounded-md w-fit">
              Experience Clarity
            </button>
          </div>
          <div className="bg-[#1D4ED8] md:col-span-7 rounded-xl flex items-center justify-center p-6 md:p-8 h-auto md:h-[500px]">
            <img src={image1} alt="Ultra HD Screen" className="w-full max-w-[300px] md:max-w-xs drop-shadow-xl" />
          </div>
        </div>

        {/* Row 2 - Image Left, Text Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 max-w-7xl mx-auto">
          <div className="bg-[#1D4ED8] md:col-span-7 rounded-xl flex items-center justify-center p-6 md:p-8 h-auto md:h-[500px]">
            <img src={image2} alt="Seamless Screen" className="w-full max-w-[300px] md:max-w-xs drop-shadow-xl" />
          </div>
          <div className="bg-[#F1F5F9] md:col-span-5 rounded-xl p-8 flex flex-col justify-center h-auto md:h-[500px]">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5 md:mb-7">Seamless Design</h2>
            <p className="text-sm md:text-md text-gray-700 mb-5 md:mb-7">
              Enjoy a sleek, edge-to-edge display that blends perfectly into any environment.
            </p>
            <button className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium px-5 py-2 rounded-md w-fit">
              Experience Seamless
            </button>
          </div>
        </div>

      </section>

      <section className="bg-[#E6F0FA] py-16 px-4 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Hanging and Stacking Installation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <img
              src={image1} // Replace with your actual import
              alt="Hanging Installation"
              className="w-full h-auto object-cover"
            />
            <div className="text-center p-4">
              <h3 className="text-md md:text-lg font-semibold text-gray-900">
                Hanging Installation
              </h3>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <img
              src={image2} // Replace with your actual import
              alt="Stacking Installation"
              className="w-full h-auto object-cover"
            />
            <div className="text-center p-4">
              <h3 className="text-md md:text-lg font-semibold text-gray-900">
                Stacking Installation
              </h3>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <img
              src={image3} // Replace with your actual import
              alt="Stacking Installation Vertical"
              className="w-full h-auto object-cover"
            />
            <div className="text-center p-4">
              <h3 className="text-md md:text-lg font-semibold text-gray-900">
                Stacking Installation <br className="md:hidden" />
                (Vertical)
              </h3>
            </div>
          </div>
        </div>
      </section>

    <PixelPitchScroll />
    <ShowcaseSlider />


    <section className="py-16 bg-white px-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center mb-10">Features</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl w-full">
        {/* Big Left Card */}
        <div className="md:row-span-2">
          <div className="relative h-full  rounded-xl overflow-hidden">
            <img
              src={featureImage}
              alt="High-definition"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
              High-definition
            </div>
          </div>
        </div>

        {/* Top Right - Small Cards */}
        <div className="grid grid-cols-2 gap-4 md:col-span-2">
          {["seamless", "wide angle", "vibrant color", "ultra-thin"].map((label, index) => (
            <div
              key={index}
              className="relative h-70 rounded-xl overflow-hidden"
            >
              <img
                src={featureImage}
                alt={label}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute bottom-4 left-3 text-white text-sm font-semibold">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

  {/* Content Section */}
  <section className="w-full bg-[#f2f2fd] py-16 px-4">
          <div className="max-w-7xl mx-auto bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row items-center">
            
            {/* Left Image */}
            <div className="w-full md:w-1/2 h-[300px] md:h-[400px]">
              <img
                src="/your-image-path.png" // replace with actual image path
                alt="DOOH Display"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Content */}
            <div className="w-full md:w-1/2 p-8 md:p-12 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Ready to Transform Your <br className="hidden md:block" /> Advertising?
              </h2>
              <p className="text-gray-700 mb-6 text-base md:text-lg">
                With Xigi DOOH, you're not just getting ad space – you're gaining a partner committed to elevating your brand
              </p>
              <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl text-base md:text-lg font-semibold transition">
                See Solutions for Your Industry
              </button>
            </div>
            
          </div>
        </section>

      <Footer />
    </div>
  )
}

export default Indoor_Led