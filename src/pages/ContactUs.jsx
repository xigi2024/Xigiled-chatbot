import React, { useRef, useState, useEffect } from 'react';
import Header from '../components/Header';
import backgroundImage from "../assets/backgroundcon.png";
import { Mail, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import theniImg from "../assets/theniImg.jpeg";
import chennaiImg from "../assets/chennaiImg.jpeg";
import bangaloreImg from "../assets/bangaloreImg.jpeg";
import bgImage from '../assets/heroimg.png';
import contact from '../assets/contact.jpg';
import Footer from '../components/Footer';
import emailjs from '@emailjs/browser';

// ContactSection component now accepts contactFormRef as a prop
const ContactSection = ({ contactFormRef }) => {
    const form = useRef();
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        phone: '',
        email: '',
        option: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            'service_t7eqw1h',
            'template_ldbi4e8',
            form.current,
            'UoyMKta3ZuKjqGlsV'
        ).then(
            (result) => {
                alert('✅ Message sent successfully!');
                setFormData({
                    name: '',
                    company: '',
                    phone: '',
                    email: '',
                    option: '',
                    message: '',
                });
            },
            (error) => {
                alert('❌ Failed to send message. Try again.');
                console.error(error.text);
            }
        );
    };

    const locations = [
        { name: "Theni", img: theniImg },
        { name: "Chennai", img: chennaiImg },
        { name: "Bangalore", img: bangaloreImg },
    ];

    return (
        <section className='bg-[#F6F6F6] w-full'>
            <div 
                className="mx-auto w-full bg-cover bg-gray-200 bg-center object-top min-h-[200px] md:min-h-[250px] flex items-center justify-center py-10 px-4"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <h1 className="text-center text-[24px] md:text-[32px] lg:text-[40px] font-semibold leading-relaxed text-gray-800 font-['Poppins',sans-serif] max-w-4xl mx-auto">
                    Let's Build Your Vision Together
                </h1>
            </div>

            <div className="container max-w-7xl mx-auto px-4 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                    
                    {/* LEFT BOX */}
                    <div className="lg:col-span-5 bg-white/80 p-6 space-y-6 lg:space-y-10 rounded-xl shadow-lg backdrop-blur-sm">
                        <div>
                            <h4 className="font-semibold text-sm text-gray-500">Get in Touch</h4>
                            <h2 className="text-[20px] md:text-[25px] font-medium text-gray-800 font-['Poppins',sans-serif] mt-3 leading-snug">
                                Let's Connect and Illuminate the Future Together
                            </h2>
                        </div>

                        {/* Contact Info */}
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-md bg-blue-100 flex-shrink-0">
                                <Mail className="text-blue-600" size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-['Montserrat',sans-serif] font-medium">EMAIL SUPPORT</p>
                                <p className="text-sm font-['Montserrat',sans-serif] font-medium break-all">info@xigiled.com</p>
                            </div>
                        </div>

                        {/* LOCATIONS */}
                        <div>
                            <h4 className="font-bold text-sm text-gray-600 mb-3">LOCATION</h4>
                            <div className="flex flex-wrap gap-3 lg:gap-5 justify-start">
                                {locations.map((loc, idx) => (
                                    <div
                                        key={idx}
                                        className="group relative rounded-lg overflow-hidden w-20 h-24 lg:w-24 lg:h-28 shadow-md flex-shrink-0"
                                    >
                                        <img
                                            src={loc.img}
                                            alt={loc.name}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-0 w-full text-center text-white text-xs font-semibold bg-black bg-opacity-50 py-1">
                                            {loc.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SOCIAL ICONS */}
                        <div>
                            <h4 className="font-bold text-sm text-gray-600 mb-3">SOCIAL NETWORK</h4>
                            <div className="flex gap-3 flex-wrap">
                                <a href="https://www.facebook.com/people/Xigi-LED/61567250657888/"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="cursor-pointer p-2 rounded-md bg-white hover:bg-blue-600 hover:text-white text-blue-600 border transition-colors shadow flex-shrink-0">
                                    <Facebook size={20} />
                                </a>
                                <a href="https://www.youtube.com/@Xigitech"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="cursor-pointer p-2 rounded-md bg-white hover:bg-blue-600 hover:text-white text-blue-600 border transition-colors shadow flex-shrink-0">
                                    <Youtube size={20} />
                                </a>
                                <a href="https://www.instagram.com/xigiled/"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="cursor-pointer p-2 rounded-md bg-white hover:bg-blue-600 hover:text-white text-blue-600 border transition-colors shadow flex-shrink-0">
                                    <Instagram size={20} />
                                </a>
                                <a href="https://www.linkedin.com/company/xigi/"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="cursor-pointer p-2 rounded-md bg-white hover:bg-blue-600 hover:text-white text-blue-600 border transition-colors shadow flex-shrink-0">
                                    <Linkedin size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT BOX - FORM */}
                    <div className="lg:col-span-7 w-full">
                        <form 
                            ref={contactFormRef}
                            onSubmit={sendEmail}
                            className="bg-white/80 p-6 md:p-8 space-y-4 md:space-y-5 backdrop-blur-sm rounded-xl shadow-lg w-full"
                        >
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                                required
                                className="w-full p-3 border rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                                style={{borderColor:"#ddd"}}
                            />
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Company Name"
                                className="w-full p-3 border rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                                style={{borderColor:"#ddd"}}
                            />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="w-full p-3 border rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                                style={{borderColor:"#ddd"}}
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Id"
                                required
                                className="w-full p-3 border rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                                style={{borderColor:"#ddd"}}
                            />
                            <select
                                name="option"
                                value={formData.option}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white"
                                style={{borderColor:"#ddd"}}
                            >
                                <option value="" disabled>How are you looking to work with us</option>
                                <option value="Partnership">Partnership</option>
                                <option value="Distributor">Distributor</option>
                                <option value="Customer">Customer</option>
                            </select>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Message"
                                rows={4}
                                required
                                className="w-full p-3 border rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 resize-vertical min-h-[100px]"
                                style={{borderColor:"#ddd"}}
                            />
                            <button
                                type="submit"
                                className="w-full sm:w-auto bg-blue-700 cursor-pointer text-white py-3 px-8 rounded-md hover:bg-blue-800 transition-colors font-medium"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ContactUs = () => {
    const contactFormRef = useRef(null);

    useEffect(() => {
        // Check if we need to scroll to the form
        const shouldScroll = sessionStorage.getItem('scrollToContactForm');
        
        if (shouldScroll === 'true' && contactFormRef.current) {
            setTimeout(() => {
                contactFormRef.current.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 300);
            
            // Remove the flag
            sessionStorage.removeItem('scrollToContactForm');
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
            <Header />
            
            {/* Banner Section */}
            <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] w-full">
                <img
                    src={contact}
                    alt="contact Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center px-4">
                    <h1 className="text-[28px] sm:text-[35px] lg:text-[50px] font-semibold text-white text-center font-['Poppins',sans-serif] max-w-4xl mx-auto">
                        Contact Us
                    </h1>
                </div>
            </div>

            {/* Pass the ref to ContactSection */}
            <ContactSection contactFormRef={contactFormRef} />

            <section
                className="relative h-[300px] sm:h-[400px] w-full flex items-center justify-center px-4"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60" />

                {/* Content */}
                <div className="relative z-10 text-center text-white space-y-3 lg:space-y-5 max-w-4xl mx-auto">
                    <p className="text-sm text-blue-400 font-['Montserrat',sans-serif] font-medium">Contact us</p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold break-all sm:break-normal">+91 9494220622</h1>
                    <h2 className="text-lg sm:text-xl font-semibold">Smart LED Solutions</h2>
                </div>
            </section>

            <section className="relative h-[400px] sm:h-[500px] w-full">
                {/* Google Map Embed */}
                <iframe
                    title="Our Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.438777950685!2d77.48925157503092!3d9.980566690123833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d3b668ef83050a9%3A0x5cbd565a248a84d7!2sXigi%20Tech!5e0!3m2!1sen!2sin!4v1754655032238!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 w-full h-full border-0"
                ></iframe>
            </section>
            
            <Footer />
        </div>
    );
};

export default ContactUs;