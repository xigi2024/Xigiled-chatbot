import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOMetaTags = ({ pageType, pageName }) => {
  // Define all meta data based on your document
  const metaData = {
    home: {
      title: "India's leading LED Display & Video Wall Experts | Xigi LED",
      description: "Custom LED display solutions for retail, events & more. Fast delivery, 24/7 support & certified quality from India's top provider."
    },
    about: {
      title: "About Xigi LED | Leading Experts in LED Display Solutions",
      description: "Discover Xigi LED's journey and commitment to delivering top-quality LED display solutions with nationwide support and custom designs."
    },
    products: {
      title: "Premium LED Displays & Video Walls | Custom Solutions",
      description: "Explore our range of high-quality LED displays. Custom sizes, flexible options, fast delivery & 24/7 support to fit every need."
    },
    industry: {
      title: "LED Display Solutions for Every Industry | Xigi LED",
      description: "Custom LED display solutions for retail, events, corporate & more. Boost engagement with vibrant visuals tailored to your industry needs."
    },
    contact: {
      title: "Contact Xigi LED | India's LED Display Experts",
      description: "Get in touch with Xigi LED for custom LED display solutions. Reliable nationwide service and fast, friendly support."
    },
    // Industry pages
    events: {
      title: "LED Displays for Events and Exhibitions | Xigi LED",
      description: "Explore LED displays for events and exhibitions. Xigi offers vivid, reliable indoor & outdoor screens tailored for every venue."
    },
    manufacturing: {
      title: "LED Displays for Manufacturing & Factories | Xigi LED",
      description: "Explore LED displays for manufacturing and factories. Xigi delivers real-time data, safety alerts, and reliable industrial screens."
    },
    education: {
      title: "LED Displays for Education & Institutions | Xigi LED",
      description: "Explore LED displays for education and institutions. Xigi offers clear, reliable visual tech for classrooms, campuses, and events."
    },
    transport: {
      title: "LED Displays for Transport & Public Venues | Xigi LED",
      description: "Discover LED displays for transport and public venues. Xigi delivers real-time info, durability, and clarity in any environment."
    },
    hospitality: {
      title: "LED Displays for Hospitality & Hotels | Xigi LED Solutions",
      description: "Explore LED displays for hospitality and hotels. Xigi offers high-res visuals for lobbies, events, signage, and guest experiences."
    },
    government: {
      title: "LED Displays for Government & Civic Spaces | Xigi LED",
      description: "Explore LED displays for government and civic spaces. Xigi ensures clear, secure, and reliable messaging for public communication."
    },
    // Product pages
    indoor: {
      title: "Indoor LED Video Walls - Ultra-HD Displays for Every Space",
      description: "Transform your space with indoor LED video walls. Vibrant colours, seamless design, and customizable options for showrooms & offices."
    },
    outdoor: {
      title: "LED Display for Outdoor - Bright, Durable, Weatherproof Screens",
      description: "High-brightness, weather-resistant LED displays for outdoor ads, events, and stadiums. Durable, energy-efficient, and eye-catching visuals."
    },
    interactive: {
      title: "Interactive LED Display - Engage with Touch-Enabled Screens",
      description: "Boost engagement with interactive LED displays. Multi-touch, vibrant visuals ideal for education, meetings, and exhibitions."
    },
    standee: {
      title: "LED Standee Solutions - Portable Displays for Events & Retail",
      description: "Grab attention with portable LED standees. Perfect for events, retail, and promotions with dynamic, easy-to-install digital displays."
    },
    transparent: {
      title: "Transparent LED Screens - Stylish, Clear, Impactful Displays",
      description: "Innovative transparent LED screens for retail, airports, and corporate spaces. Clear visuals without blocking light or view."
    },
    rental: {
      title: "Rental LED Screen Solutions - Vibrant Displays for Events",
      description: "Portable rental LED screens for concerts, weddings, and expos. Easy setup, vibrant visuals, and expert support for unforgettable events."
    },
    flexible: {
      title: "Flexible LED Display & Curved LED Screen Installations",
      description: "Creative flexible LED displays and curved LED screens for unique spaces. Immersive, bendable visuals ideal for events & exhibitions."
    },
    custom: {
      title: "Custom LED Display Solutions - Unique Visual Experiences",
      description: "Bespoke custom LED displays for any shape or space. Perfect for brands seeking innovative, flexible, and impactful visual solutions."
    },
    truck: {
      title: "Truck-Mounted LED Displays | Mobile Outdoor Advertising",
      description: "Boost visibility with Xigi's truck-mounted LED displays. Mobile, bright, weatherproof solutions perfect for events, campaigns & roadshows."
    }
  };

  // Get the meta data for the current page
  const currentMeta = metaData[pageName] || metaData[pageType] || metaData.home;

  return (
    <Helmet>
      <title>{currentMeta.title}</title>
      <meta name="description" content={currentMeta.description} />
      <meta name="keywords" content="LED displays, video walls, digital signage, LED screens, Xigi LED" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
      <meta property="og:title" content={currentMeta.title} />
      <meta property="og:description" content={currentMeta.description} />
      <meta property="og:image" content="https://xigiled.in/images/og-image.jpg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
      <meta property="twitter:title" content={currentMeta.title} />
      <meta property="twitter:description" content={currentMeta.description} />
      <meta property="twitter:image" content="https://xigiled.in/images/twitter-image.jpg" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
    </Helmet>
  );
};

export default SEOMetaTags;