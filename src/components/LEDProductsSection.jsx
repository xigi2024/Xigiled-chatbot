import React from "react";
import { Link } from "react-router-dom";

    // Import your images here
import img1 from "../assets/products/img1.jpg";
import Indoor_Led from "../pages/Indoor_Led";


// Array of items with title, link, and image
const items = [
  { title: "Indoor LED Video Walls", link: "/products/indoor-led", image: img1 },
  { title: "Outdoor LED Video Walls", link: "/outdoor-led", image: img1 },
  { title: "Truck-Mounted LED", link: "/truck-led", image: img1 },
  { title: "LED Standee Displays", link: "/standee-led", image: img1 },
  { title: "Interactive LED Displays", link: "/interactive-led", image: img1 },
  { title: "Transparent LED Displays", link: "/transparent-led", image: img1 },
  { title: "Flexible & Curved LED Walls", link: "/flexible-led", image: img1 },
  { title: "Rental & Event Series", link: "/rental-led", image: img1 },
  { title: "Custom LED Solutions", link: "/custom-led", image: img1 },
];

const LEDProductsSection = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          LED Display Solutions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 r">
          {items.map((item, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden shadow-md group h-110 "
            >
              {/* Background Image with Hover Zoom */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 scale-100 group-hover:scale-105 group-hover:brightness-110"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-opacity-40 group-hover:bg-opacity-50 transition duration-300"></div>

              {/* Title */}
              <div className="absolute top-4 left-4 z-10">
                <h3 className="text-white text-2xl  font-semibold leading-tight">
                  {item.title}
                </h3>
              </div>

              {/* View Detail Button */}
              <div className="absolute bottom-4 left-4 z-10">
                <Link
                  to={item.link}
                  className="bg-white text-black text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-gray-200 transition"
                >
                  View Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LEDProductsSection;
