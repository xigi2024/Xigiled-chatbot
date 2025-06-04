import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import tiger from '../assets/industry/Industry.png'
import IN from '../assets/IN.png'
import installations from '../assets/about/installations.jpg'
import city from '../assets/about/citys.jpg'
import FAQSection from '../components/FAQSection'
import impact from '../assets/icon/impact-icon.png'
import reliability from '../assets/icon/reliability-icon.png'
import roi from '../assets/icon/roi-icon.png'
import perfor from '../assets/icon/performance-icon.png'



const About = () => {
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
      you connect, engage, and grow in today's fast-moving digital world.
    </p>
    <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded transition">
      Experience Seamless
    </button>
  </div>
</div>
</section>

<section class="bg-white py-12 px-4 md:px-34">
  <div class="text-center mb-12">
    <h2 class="text-3xl md:text-4xl font-bold text-gray-900">
      XIGI: Rooted in Values,<br />
      Driven by Purpose
    </h2>
  </div>

  {/* 2 Columns Grid */}
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Left Column */}
    <div class="flex flex-col gap-6">
      {/* Our Mission */}
      <div class="bg-[#E8F1FF] relative bg-cover bg-center rounded-xl text-white p-6 h-64 flex flex-col justify-end">
        <h3 class="text-[25px] text-[#000] font-semibold mb-1">Our Mission</h3>
        <p class="text-[16px] text-[#000]">
          We are dedicated to delivering high-quality, durable displays that drive visibility, enhance communication,
          and create lasting impressions, all while ensuring our clients receive unparalleled support and service at
          every step.
        </p>
      </div>

      {/* Our Vision */}
      <div class="bg-[#E8F1FF] relative bg-cover bg-center rounded-xl text-white p-6 h-64 flex flex-col justify-end">
        <h3 class="text-[25px] text-[#000] font-semibold mb-1">Our Vision</h3>
        <p class="text-[16px] text-[#000]">
          We are dedicated to delivering high-quality, durable displays that drive visibility, enhance communication,
          and create lasting impressions, all while ensuring our clients receive unparalleled support and service at
          every step.
        </p>
      </div>
    </div>

    {/* Right Column */}
    <div>
      {/* Our Value */}
      <div class="Valueimg relative bg-cover bg-center rounded-xl text-white p-6 h-full min-h-[500px] flex flex-col justify-end">
        <h3 class="text-sm mb-1">Our Value</h3>
        <h4 class="text-xl md:text-2xl font-bold leading-snug mb-2">
          Unleash the Power of<br />
          Your Brand with XIGI LED
        </h4>
        <p class="text-sm">
          At XIGI LED, we uphold innovation, reliability, and customer-first excellence to deliver advanced LED Video wall
          solutions.
        </p>
      </div>
    </div>
  </div>
</section>

<section className="relative py-20 px-4 md:px-30 text-white">
          <div className="container mx-auto ">
            <div className="flex flex-col md:flex-row items-center gap-20">
              
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
                </div>
              </div>

              {/* Image Section - Now on the right */}
              <div className="w-full md:w-7/12 order-1 md:order-2 flex justify-end">
                <img 
                  src={IN} 
                  alt="Industry Applications"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

<section class="bg-white py-12 px-4 md:px-30">
  <div class="text-center mb-10">
    <h2 class="text-3xl md:text-4xl font-bold text-gray-900">
      Total Solution, Start to<br class="md:hidden" />
      Finish:
    </h2>
  </div>

  <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
    {/* <!-- Card 1 --> */}
    <div class="bg-white border rounded-xl shadow-sm p-4 flex flex-col items-center text-center">
      <img src="/images/expert-consultation.png" alt="Expert consultation" class="w-full h-32 object-cover rounded-md mb-3" />
      <p class="font-medium text-sm">Expert consultation</p>
    </div>

    {/* <!-- Card 2 --> */}
    <div class="bg-white border rounded-xl shadow-sm p-4 flex flex-col items-center text-center">
      <div class="w-full h-32 bg-gray-200 rounded-md mb-3"></div>
      <p class="font-medium text-sm">lifetime support</p>
    </div>

    {/* <!-- Card 3 --> */}
    <div class="bg-white border rounded-xl shadow-sm p-4 flex flex-col items-center text-center">
      <div class="w-full h-32 bg-gray-200 rounded-md mb-3"></div>
      <p class="font-medium text-sm">free 3D design</p>
    </div>

    {/* <!-- Card 4 --> */}
    <div class="bg-white border rounded-xl shadow-sm p-4 flex flex-col items-center text-center">
      <div class="w-full h-32 bg-gray-200 rounded-md mb-3"></div>
      <p class="font-medium text-sm">fast delivery</p>
    </div>

    {/* <!-- Card 5 --> */}
    <div class="bg-white border rounded-xl shadow-sm p-4 flex flex-col items-center text-center">
      <div class="w-full h-32 bg-gray-200 rounded-md mb-3"></div>
      <p class="font-medium text-sm">AMC</p>
    </div>

    {/* <!-- Card 6 --> */}
    <div class="bg-white border rounded-xl shadow-sm p-4 flex flex-col items-center text-center">
      <div class="w-full h-32 bg-gray-200 rounded-md mb-3"></div>
      <p class="font-medium text-sm">easy finance</p>
    </div>

    {/* <!-- Card 7 --> */}
    <div class="bg-white border rounded-xl shadow-sm p-4 flex flex-col items-center text-center">
      <div class="w-full h-32 bg-gray-200 rounded-md mb-3"></div>
      <p class="font-medium text-sm">24/7 service</p>
    </div>

    {/* <!-- Card 8 --> */}
    <div class="bg-white border rounded-xl shadow-sm p-4 flex flex-col items-center text-center">
      <div class="w-full h-32 bg-gray-200 rounded-md mb-3"></div>
      <p class="font-medium text-sm">professional install</p>
    </div>
  </div>
</section>

<section class=" py-16 px-4 md:px-30 ">
  <div class="grid grid-cols-1 md:grid-cols-2 p-20 gap-10 items-center bg-[#E8F1FF] rounded-[20px]" >
    
    {/* <!-- LEFT TEXT SECTION --> */}
    <div>
      <h2 class="text-3xl md:text-5xl font-bold text-[#000] mb-4 leading-tight">
        25,000+ Trusted<br />
        Partnership built<br />
        on Results
      </h2>
      <p class="text-gray-700 text-base md:text-lg mb-6 max-w-md">
        From retail and education to government and global brands, our work powers every sector and geography.
      </p>
      <button class="bg-[#1E2EFF] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#1b28d1] transition">
        Experience Seamless
      </button>
    </div>

    {/* <!-- RIGHT STAT + IMAGE GRID --> */}
    <div class="grid grid-cols-2 gap-4">
      
      {/* <!-- Box 1 - Stat --> */}
      <div class="bg-white rounded-xl p-6 flex flex-col  justify-center items-center text-center shadow h-70">
        <p class="text-[#1E2EFF] font-extrabold text-[60px] mb-1">3K</p>
        <p class="text-black text-md font-semibold">Installations</p>
      </div>

      {/* <!-- Box 2 - Image --> */}
      <div class="bg-white rounded-xl overflow-hidden mt-20  h-50 flex items-center justify-center shadow">
        <img src={installations} alt="Image 1" class="h-full w-full object-cover" />
      </div>

      {/* <!-- Box 3 - Image --> */}
      <div class="bg-white rounded-xl overflow-hidden h-50 flex items-center justify-center shadow">
        <img src={city} alt="Image 2" class="h-full w-full object-cover" />
      </div>

      {/* <!-- Box 4 - Stat --> */}
      <div class="bg-white rounded-xl p-6 flex flex-col justify-center  items-center text-center shadow h-70">
        <p class="text-[#1E2EFF] font-extrabold text-[50px] mb-1">50+</p>
        <p class="text-black text-md font-semibold">Cities</p>
      </div>

    </div>
  </div>
</section>

<section className="bg-white py-16 px-4 md:px-30">
  {/* Section Heading */}
  <h2 className="text-center text-3xl font-bold mb-12">Our Promise</h2>

  {/* Main Grid Layout */}
  <div className="grid grid-cols-3 gap-6 items-center">
    
  {/* Left Image Block */}
<div className="bg-[#EAF1FF] rounded-xl overflow-hidden h-[400px] shadow flex items-center justify-center">
  <img src={installations} alt="Our Own Project" className="w-full h-full object-cover" />
</div>

    {/* Center Icon Grid */}
    <div className="grid grid-cols-2 gap-4 justify-center ">
      
      {/* Box 1 */}
      <div className="bg-[#EAF1FF] rounded-xl p-10 flex flex-col items-center justify-center text-center shadow">
        <img src= {impact} alt="Impact" className="w-20 h-20 mb-2" />
        <p className="text-black text-md font-semibold">impact</p>
      </div>

      {/* Box 2 */}
      <div className="bg-[#EAF1FF] rounded-xl p-10 flex flex-col items-center justify-center text-center shadow">
        <img src= {reliability}alt="Reliability" className="w-20 h-20 mb-2" />
        <p className="text-black text-md font-semibold">reliability</p>
      </div>

      {/* Box 3 */}
      <div className="bg-[#EAF1FF] rounded-xl p-10 flex flex-col items-center justify-center text-center shadow">
        <img src={roi} alt="ROI" className="w-20 h-20 mb-2" />
        <p className="text-black text-md font-semibold">ROI</p>
      </div>

      {/* Box 4 */}
      <div className="bg-[#EAF1FF] rounded-xl p-10 flex flex-col items-center justify-center text-center shadow">
        <img src= {perfor} alt="Performance" className="w-20 h-20 mb-2" />
        <p className="text-black text-md font-semibold">performance</p>
      </div>
    </div>

   {/* Right Image Block */}
<div className="bg-[#EAF1FF] rounded-xl overflow-hidden h-[400px] shadow flex items-center justify-center">
  <img src={city} alt="Build It" className="w-full h-full object-cover" />
</div>

  </div>
</section>

<FAQSection />

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

export default About