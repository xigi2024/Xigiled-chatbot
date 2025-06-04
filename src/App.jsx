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





function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/industry" element={<Industry />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/industry/Government" element={<Government/>} /> 
    <Route path='/contact' element={<ContactUs/>} />
    <Route path='/products/indoor-led' element={<Indoor_Led/>} />
      </Routes>
    </Router>
  )
}

export default App;
