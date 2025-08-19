import React from 'react'
import './App.css'
import Home from './pages/Home'
import Industry from './pages/Industry'
import Products from './pages/Products'
import About from './pages/About'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Government from './pages/Government'
import ContactUs from './pages/ContactUs'
import Indoor_Led from './pages/Indoor_Led'
import EventsExhibitions from './pages/EventsExhibitions'
import RetailEnvironments from './pages/RetailEnvironments'
import CorporateOffices from './pages/CorporateOffices'
import EducationInstitutions from './pages/EducationInstitutions'
import HealthcareFacilities from './pages/HealthcareFacilities'
import TransportationHubs from './pages/TransportationHubs'
import ManufacturingFactories from './pages/ManufacturingFactories'
import Outdoor_Led from './pages/Outdoor_Led'
import TruckMounted_Led from './pages/TruckMounted_Led'
import Led_Standee from './pages/Led_Standee'
import Interactive_display from './pages/Interactive_display'
import Transparent_Led from './pages/Transparent_Led'
import FlexibleLed from './pages/Flexible_Led'
import Rental_Event_display from './pages/Rental_Event_display'
import Custom_Led from './pages/Custom_Led'
import Gallery from './pages/Gallery'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopButton from './components/ScrollToTopButton'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import WhatsAppFloating from './components/WhatsAppFloating'
function App() {
  return (

    <Router>
      <WhatsAppFloating />
      <ScrollToTopButton />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/industry" element={<Industry />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path='/contact' element={<ContactUs />} />

/* industry routes/*
<Route path="/industry/:slug" element={<Industry />} />
<Route path="/industry/GovernmentPublicSpaces" element={<Government />} />
<Route path="/industry/EventsAndExhibitions" element={<EventsExhibitions />} />
<Route path="/industry/Retail" element={<RetailEnvironments />} />
<Route path="/industry/CorporateOffice" element={<CorporateOffices />} />
<Route path="/industry/EducationAndInstitutions" element={<EducationInstitutions />} />
<Route path="/industry/HospitalityAndHotels" element={<HealthcareFacilities />} />
<Route path="/industry/TransportPublicVenues" element={<TransportationHubs />} />
<Route path="/industry/ManufacturingAndFactories" element={<ManufacturingFactories />} />

  /* products routes/*
<Route path='/products/indoor-led-video-walls' element={<Indoor_Led />} />
<Route path='/products/outdoor-led-video-walls' element={<Outdoor_Led />} />
<Route path='/products/truck-mounted-displays' element={<TruckMounted_Led />} />
<Route path='/products/led-standee-display' element={<Led_Standee />} />
<Route path='/products/interactive-displays' element={<Interactive_display />} />
<Route path='/products/transparent-led-display' element={<Transparent_Led />} />
<Route path='/products/flexibile-curved-led-walls' element={<FlexibleLed />} />
<Route path='/products/rental-event-display' element={<Rental_Event_display />} />
<Route path='/products/custom-led-display' element={<Custom_Led />} />

</Routes>
</Router>
)
}

export default App;
