import React from 'react'
import Header from '../components/Header'
import tiger from '../assets/industry/Industry.png'
import LEDProductsSection from '../components/LEDProductsSection'
import IN from '../assets/IN.png'
import Footer from '../components/Footer'

const Products = () => {    
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
          PRODUCTS & SOLUTIONS
          </h1>
        </div>
      </div>
      <section className="py-16 px-4 md:px-20 bg-white">
<div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
  {/* Left Image */}
  <div className="flex justify-center">
    <img
      src={tiger} // Change to your actual image path
      alt="Tiger Display"
      className="w-[700px] h-[450px] max-w-md"
    />
  </div>

  {/* Right Content */}
  <div>
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      Digital Impact{" "}
      <span className="bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
      By Industry
      </span>
    </h2>
    <p className="text-gray-700 mb-6 leading-relaxed">
      At XIGI Tech, we deliver tailored digital solutions across a wide
      range of industries — from retail and real estate to education and
      entertainment. Our technology adapts to your unique needs, helping
      you connect, engage, and grow in today’s fast-moving digital world.
    </p>
    <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded transition">
      Experience Seamless
    </button>
  </div>
</div>
</section>

<LEDProductsSection />  

 {/* Industry Applications Section */}
 <section className="relative py-20 px-4 md:px-30  text-white">
          <div className="container mx-auto ">
            <div className="flex flex-col md:flex-row items-center gap-10">
              
              {/* Content Section - Now on the left */}
              <div className="w-full md:w-7/12 order-2 md:order-1">
                <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-snug">
                  One Solution. <br /> Endless Industry Applications.
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">
                      Enhanced Communication
                    </h3>
                    <p className="text-gray-700">
                      Deliver powerful messages with high-impact visuals that grab attention and improve audience engagement.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">
                      Versatility Across Industries
                    </h3>
                    <p className="text-gray-700">
                      Our solutions cater to multiple industries like retail, education, healthcare, and more with ease and flexibility.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">
                      Unmatched Visual Impact
                    </h3>
                    <p className="text-gray-700">
                      Stunning visuals that captivate attention and elevate your brand presence in any space.
                    </p>
                  </div>

                  {/* Highlight Text */}
                  <div className="pt-4">
                    <span className="text-2xl font-bold text-blue-900">Powerful. Scalable. Beautiful.</span>
                  </div>
                </div>
              </div>

              {/* Image Section - Now on the right */}
              <div className="w-full md:w-5/12 order-1 md:order-2 flex justify-end">
                <img 
                  src={IN} 
                  alt="Industry Applications"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
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

export default Products