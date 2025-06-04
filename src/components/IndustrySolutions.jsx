import React from "react";
import { Link } from "react-router-dom";
import { Link as LinkIcon } from "lucide-react";
import gov from "../assets/industry/gov.png"; // update path as needed

const IndustrySolutions = () => {
  const cards = [
    {
      title: "Government & Public Spaces",
      desc: "Empowering public spaces with smart, engaging communication solutions.",
      img: gov,
      link: "/industry/Government",
    },
    {
      title: "Events & Exhibitions",
      desc: "Empowering public spaces with smart, engaging communication solutions.",
      img: gov,
      link: "/events",
    },
    {
      title: "Retail Environments",
      desc: "Captivating customers with dynamic, high-resolution display systems.",
      img: gov,
      link: "/retail",
    },
    {
      title: "Corporate Offices",
      desc: "Enhancing business communication with impactful visual storytelling.",
      img: gov,
      link: "/corporate",
    },
    {
      title: "Education Institutions",
      desc: "Transforming classrooms into smart, interactive learning spaces.",
      img: "/industry-image.png",
      link: "/education",
    },
    {
      title: "Transparent LED Displays",
      desc: "Delivering clear, real-time updates in high-traffic medical environments.",
      img: "/industry-image.png",
      link: "/healthcare",
    },
    {
      title: "Interactive LED Displays",
      desc: "Improving traveler experience with informative and vibrant displays.",
      img: gov,
      link: "/transportation",
    },
    {
      title: "Flexible & Curved LED Walls",
      desc: "Creating immersive audience experiences through cutting-edge visuals.",
      img: "/industry-image.png",
      link: "/entertainment",
    },
    {
      title: "Smart Cities",
      desc: "Supporting urban innovation with seamless digital display networks.",
      img: "/industry-image.png",
      link: "/smartcities",
    },
  ];

  return (
    <section className="bg-white py-16 px-4 md:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          INDUSTRY SOLUTIONS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-[#f4f8ff] rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{card.desc}</p>
              <div className="relative group">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full rounded-lg"
                />
                <Link
                  to={card.link}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-lg"
                >
                  <div className="bg-white p-3 rounded-full shadow-md">
                    <LinkIcon className="text-black w-5 h-5" />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustrySolutions;
