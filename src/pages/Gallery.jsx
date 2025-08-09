import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import gallery from '../assets/gallery.avif';


const ITEMS_PER_PAGE = 6; // 2 rows × 3 columns = 6 images per page

const GalleryFilter = () => {
  const [images, setImages] = useState([]);
  const [filters, setFilters] = useState(["All"]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch from API
  useEffect(() => {
    axios.get("https://xigiled.in/api/gallery")
      .then(res => {
        const data = res.data.data;
        setImages(data);

        // extract unique titles
        const uniqueTitles = Array.from(new Set(data.map(item => item.title)));
        setFilters(["All", ...uniqueTitles]);
      })
      .catch(err => {
        console.error("Failed to load gallery:", err);
      });
  }, []);

  // Flatten images array to handle multiple images per item
  const flattenedImages = images.flatMap(item =>
    item.image.map(imgPath => ({
      src: `https://xigiled.in/storage/${imgPath}`,
      title: item.title,
      imgPath: imgPath
    }))
  );

  // Filter based on title
  const filteredImages = activeFilter === "All"
    ? flattenedImages
    : flattenedImages.filter(item => item.title === activeFilter);

  const totalPages = Math.ceil(filteredImages.length / ITEMS_PER_PAGE);

  // Get exactly 6 images for current page (2 rows × 3 columns)
  const paginatedImages = filteredImages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="bg-[#eaf1ff] py-20 text-center relative">
      <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium mb-10 leading-[1.2] font-['Poppins',sans-serif]">
        A Curated Visual Journey of  Your Next Luxury Escape
      </h2>

      {/* Filter Buttons */}
      <div className="container flex flex-wrap justify-center gap-4 mb-12">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => {
              setActiveFilter(item);
              setCurrentPage(1);
            }}
            className={`px-5 py-2 cursor-pointer rounded-md text-sm font-medium transition-all duration-300 ${activeFilter === item
                ? "bg-blue-700 text-white"
                : "bg-white text-black shadow"
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Image Grid - Fixed 2x3 layout (2 rows, 3 columns) */}
      <div className="container px-4 mb-10">
        <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
          {paginatedImages.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer bg-white aspect-[4/3]"
              onClick={() =>
                setSelectedImage({
                  src: item.src,
                  description: item.title,
                })
              }
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Fill empty slots if less than 6 images on current page */}
          {Array.from({ length: ITEMS_PER_PAGE - paginatedImages.length }, (_, i) => (
            <div
              key={`empty-${i}`}
              className="invisible aspect-[4/3]"
            />
          ))}
        </div>

        {/* Display current page info */}
        <div className="mt-6 text-sm text-gray-600">
          Showing {Math.min(paginatedImages.length, ITEMS_PER_PAGE)} of {filteredImages.length} images
        </div>
      </div>

      {/* Modern Pagination with Progress Bar */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-6">
          {/* Progress Bar */}
          <div className="w-full max-w-md bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${(currentPage / totalPages) * 100}%`,
                backgroundColor: "oklch(48.8% 0.243 264.376)"
              }}
            />
          </div>

          {/* Page Info */}
          <div className="text-center">
            <span className="text-lg font-semibold text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <div className="text-sm text-gray-500 mt-1">
              {filteredImages.length} total images
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`group cursor-pointer relative overflow-hidden px-6 py-3 rounded-full font-medium transition-all duration-300 ${currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-blue-600 hover:text-white hover:shadow-lg transform hover:-translate-y-1 border border-blue-600'
                }`}
            >
              <span className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 transform transition-transform duration-300 ${currentPage === 1 ? '' : 'translate-x-[-100%] group-hover:translate-x-0'
                }`} />
              <span className="relative flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </span>
            </button>

            {/* Dots Navigation */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`transition-all cursor-pointer duration-300 rounded-full ${currentPage === i + 1
                      ? "w-8 h-3"
                      : "w-3 h-3 bg-gray-300 hover:bg-gray-400 hover:scale-125"
                    }`}
                  style={{
                    backgroundColor: currentPage === i + 1 ? "oklch(48.8% 0.243 264.376)" : undefined
                  }}
                  title={`Go to page ${i + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`group cursor-pointer relative overflow-hidden px-6 py-3 rounded-full font-medium transition-all duration-300 ${currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-blue-600 hover:text-white hover:shadow-lg transform hover:-translate-y-1 border border-blue-600'
                }`}
            >
              <span className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 transform transition-transform duration-300 ${currentPage === totalPages ? '' : 'translate-x-[100%] group-hover:translate-x-0'
                }`} />
              <span className="relative flex items-center gap-2">
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>

          {/* Quick Jump */}
          {totalPages > 5 && (
            <div className="flex items-center gap-3 mt-2">
              <span className="text-sm text-gray-500">Quick jump:</span>
              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Array.from({ length: totalPages }, (_, i) => (
                  <option key={i} value={i + 1}>
                    Page {i + 1}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full relative shadow-xl mx-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-black bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-300 text-xl font-bold"
            >
              ✕
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.description}
              className="w-full h-[500px] object-cover rounded-lg mb-4"
            />
            <p className="text-xl font-semibold text-center text-gray-800">
              {selectedImage.description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

const Gallery = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative h-[70vh] w-full">
        <img
          src={gallery}
          alt="gallery Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
          <h1 className="text-[30px] md:text-[35px] lg:text-[50px] font-semibold text-white text-center font-['Poppins',sans-serif]">
            Gallery
          </h1>
        </div>
      </div>
      <GalleryFilter />
      <Footer />
    </div>
  );
};

export default Gallery;