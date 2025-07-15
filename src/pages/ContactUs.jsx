import React from 'react'
import Header from '../components/Header'
import backgroundImage from "../assets/backgroundcon.png";
import {
    Mail,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
} from "lucide-react";
import theniImg from "../assets/goverment.jpg";
import theniHover from "../assets/IN.png";
import chennaiImg from "../assets/goverment.jpg";
import chennaiHover from "../assets/IN.png";
import bangaloreImg from "../assets/goverment.jpg";
import bangaloreHover from "../assets/IN.png";
import bgImage from '../assets/heroimg.png'
import contact from '../assets/contact.jpg'
import Footer from '../components/Footer';

const ContactSection = () => {
    const locations = [
        { name: "Theni", img: theniImg, hoverImg: theniHover },
        { name: "Chennai", img: chennaiImg, hoverImg: chennaiHover },
        { name: "Bangalore", img: bangaloreImg, hoverImg: bangaloreHover },
    ];

    return (
        <section className='bg-[#F6F6F6]'>
            <div
                className=" mx-auto w-full  bg-cover bg-gray-200 bg-center py-15 px-4 md:px-20 object-top"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <h1 className="text-center text-[28px] md:text-[32px] lg:text-[40px] font-semibold mb-12 leading-relaxed text-gray-800 font-['Poppins',sans-serif]">
                    Xigi LED—Your Vision, Engineered <br /> to Shine
                </h1>
            </div>

            <div className="container grid md:grid-cols-12 gap-10 py-27 mx-auto bg-cover ">


                {/* LEFT BOX */}
                <div className="bg-white/30 col-span-5  p-6 max-w-130 space-y-10 backdrop-blur-md rounded-xl">
                    <div>
                        <h4 className="font-semibold text-sm text-gray-500">Get in Touch</h4>
                        <h2 className="text-[25px] font-medium text-gray-800 font-['Poppins',sans-serif] mt-3">
                            Let's Connect and Illuminate the Future Together
                        </h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-blue-100">
                            <Mail className="text-blue-600" size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-['Montserrat',sans-serif] font-medium">EMAIL SUPPORT</p>
                            <p className="text-sm  font-['Montserrat',sans-serif] font-medium">led@xigi.in</p>
                        </div>
                    </div>

                    {/* LOCATIONS */}
                    <div className=''>
                        <h4 className="font-bold text-sm text-gray-600 mb-3">LOCATION</h4>
                        <div className="flex gap-5">
                            {locations.map((loc, idx) => (
                                <div
                                    key={idx}
                                    className="group relative rounded-lg overflow-hidden w-24 h-28 shadow-md"
                                >
                                    <img
                                        src={loc.img}
                                        alt={loc.name}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:hidden"
                                    />
                                    <img
                                        src={loc.hoverImg}
                                        alt={`${loc.name} hover`}
                                        className="absolute inset-0 w-full h-full object-cover hidden group-hover:block"
                                    />
                                    <div className="absolute bottom-1 w-full text-center text-white text-xs font-semibold bg-black bg-opacity-50">
                                        {loc.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SOCIAL ICONS */}
                    <div>
                        <h4 className="font-bold text-sm text-gray-600 mb-3">SOCIAL NETWORK</h4>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                                <div
                                    key={idx}
                                    className="p-2 rounded-md bg-white hover:bg-blue-600 hover:text-white text-blue-600 border transition-colors shadow"
                                >
                                    <Icon size={20} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT BOX */}
                <div className="bg-white/30 col-span-7 p-10 space-y-5 backdrop-blur-md rounded-xl">
                    {["Name", "Company Name", "Phone Number", "Email Id"].map((placeholder, idx) => (
                        <input
                            key={idx}
                            type="text"
                            placeholder={placeholder}
                            className="w-full p-3 border rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))}
                    <select className="w-full p-3 border rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-500 text-gray-700">
                        <option>How are you looking to work with us</option>
                        <option>Partnership</option>
                        <option>Distributor</option>
                        <option>Customer</option>
                    </select>
                    <textarea
                        placeholder="Message"
                        rows={4}
                        className="w-full p-3 border rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-blue-700 text-white py-2 px-6 rounded-md hover:bg-blue-800 transition">
                        Send Message
                    </button>
                </div>
            </div>
        </section>
    );
};


const ContactUs = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            {/* Banner Section */}

            <div className="relative h-[70vh] w-full">
                <img
                    src={contact}
                    alt="contact Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center">
                    <h1 className="text-[30px] md:text-[35px] lg:text-[50px] font-semibold text-white text-center font-['Poppins',sans-serif]">
                        Contact Us
                    </h1>
                </div>
            </div>

                                                                                                                                                                                                                                                                                                        

            <ContactSection />

            <section
                className="relative h-[400px] w-full flex items-center justify-center"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60" />

                {/* Content */}
                <div className="relative z-10 text-center text-white space-y-5">
                    <p className="text-sm text-blue-400 font-['Montserrat',sans-serif] font-medium">Contact us</p>
                    <h1 className="text-4xl md:text-6xl font-semibold">+91 9494220622</h1>
                    <h2 className="text-xl font-semibold">Smart LED Solutions</h2>

                </div>
            </section>

            <section className="relative h-[500px] w-full">
                {/* Google Map Embed */}
                <iframe
                    title="Our Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.506007087825!2d76.940078!3d10.991570!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8571a313a0c89%3A0x9e1b7bbad3c87e95!2sXigi%20LED!5e0!3m2!1sen!2sin!4v1682398123456"
                    width="100%"
                    height="100%"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 w-full h-full border-0"
                ></iframe>

                {/* Overlay for dark effect */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* Centered content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center space-y-2">
                    <p className="text-sm text-blue-400 font-['Montserrat',sans-serif] font-medium">Locate us</p>
                    <h2 className="text-2xl font-semibold">Visit Our Office</h2>
                    <p className="text-lg font-['Montserrat',sans-serif] font-medium">Xigi LED, Tamil Nadu, India</p>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default ContactUs