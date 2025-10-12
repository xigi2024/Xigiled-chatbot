import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import clientBanner from "../assets/client.png";

const ClientDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { client } = location.state || {};

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Client not found</div>
        <button 
          onClick={() => navigate('/')}
          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Header />
      
      {/* Banner Section */}
      <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] w-full">
        <img
          src={clientBanner}
          alt="Client Details Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center px-4">
          <h1 className="text-[28px] sm:text-[35px] lg:text-[50px] font-semibold text-white text-center font-['Poppins',sans-serif] max-w-4xl mx-auto">
            Client Details
          </h1>
        </div>
      </div>

      <main className="flex-grow">
        {/* Client Hero Section */}
        <section className=" text-dark py-16" style={{backgroundColor:"rgb(248 248 248)"}}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Client Logo */}
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full p-4 shadow-lg">
                <img
                  src={client.image}
                  alt={client.name}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Client Info */}
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{client.name}</h1>
                <p className="text-xl mb-2 opacity-90">{client.position}</p>
                {client.company && (
                  <p className="text-lg mb-2 opacity-80">{client.company}</p>
                )}
                <div className="flex flex-wrap gap-4 mt-2">
                  {client.industry && (
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                      {client.industry}
                    </span>
                  )}
                  {client.location && (
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                      📍 {client.location}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Client Details Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Client Testimonial</h2>
              
              <div className="bg-gray-50 rounded-lg p-8 mb-8 border-l-4 border-blue-600">
                <blockquote className="text-gray-700 text-lg  leading-relaxed">
                  "{client.testimonial}"
                </blockquote>
                <div className="mt-4 flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">
                      {client.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="text-black text-[14px] md:text-[17px] lg:text-[17px] font-medium font-['Montserrat',sans-serif] mb-6 leading-relaxed">{client.name}</p>
                    <p className="text-black text-[14px] md:text-[17px] lg:text-[17px] font-medium font-['Montserrat',sans-serif] mb-6 leading-relaxed">{client.position}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-600">About This Partnership</h3>
                  <p className="text-black text-[14px] md:text-[17px] lg:text-[17px] font-medium font-['Montserrat',sans-serif] mb-6 leading-relaxed">
                    {client.name} partnered with Xigi LED to implement cutting-edge digital display solutions. 
                    Our team delivered exceptional results through innovative LED technology and professional service.
                  </p>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Achievements:</h4>
                    <ul className="text-gray-700 leading-relaxed list-disc list-inside space-y-2">
                      <li>Enhanced brand visibility and customer engagement</li>
                      <li>Professional installation and ongoing support</li>
                      <li>Customized LED display solutions</li>
                      <li>Reliable performance and maintenance</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-600">Client Details</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-3">
                      {client.company && (
                        <div className="flex justify-between">
                          <span className="font-semibold">Company:</span>
                          <span>{client.company}</span>
                        </div>
                      )}
                      
                      {client.industry && (
                        <div className="flex justify-between">
                          <span className="font-semibold">Industry:</span>
                          <span>{client.industry}</span>
                        </div>
                      )}
                      
                      {client.location && (
                        <div className="flex justify-between">
                          <span className="font-semibold">Location:</span>
                          <span>{client.location}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span className="font-semibold">Partnership:</span>
                        <span>Successful</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join {client.name} and other satisfied clients who have transformed their spaces with our innovative LED solutions.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg shadow-md text-lg font-medium transition-all duration-300"
            >
              Get Free Consultation
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ClientDetail;