import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Indoor from '../assets/goverment.jpg';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import blog from '../assets/blog.jpg';
import Footer from '../components/Footer';

const blogsPerPage = 3;

const BlogCards = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('https://xigiled.in/api/blog');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const indexOfLast = currentPage * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirst, indexOfLast);

  const handleClick = (id) => {
    navigate(`/blog/${id}`);
  };

  const onPageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="w-full px-6 py-20 bg-white flex justify-center items-center">
        <p>Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-6 py-20 bg-white flex justify-center items-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-20 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-medium text-gray-900 font-['Poppins',sans-serif]">Latest News</h2>
        <p className="mt-2 text-gray-700 text-[18px] max-w-xl mx-auto">
          Stay updated with the latest trends, tips, and insights in web design through our informative and inspiring blog articles.
        </p>
      </div>

      {currentBlogs.length > 0 ? (
        <>
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {currentBlogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => handleClick(blog.id)}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={`http://127.0.0.1:8000/storage/${blog.image}`} // Updated path
                    alt={blog.title}
                    className="h-52 w-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  />

                  <span className="absolute top-3 left-3 bg-blue-700 text-white text-[10px] px-3 py-1 rounded-full font-medium">
                    Update
                  </span>
                </div>
                <div className="p-5 flex flex-col gap-2">
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span className="bg-gray-100 px-3 py-1 rounded-full">
                      {new Date(blog.created_at || blog.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">{blog.readTime || '5 min read'}</span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 leading-snug">{blog.title}</h3>
                  <p className="text-sm text-gray-600">{blog.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination - only show if there are blogs */}
          {blogs.length > blogsPerPage && (
            <nav className="flex justify-center items-center space-x-3 mt-12" aria-label="Pagination">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center justify-center w-10 h-10 rounded-full shadow-md transition
                  ${currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white'
                  }`}
                aria-label="Previous Page"
              >
                <ChevronLeft size={20} />
              </button>

              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-10 h-10 rounded-full shadow-md font-semibold transition
                      ${currentPage === page
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white'
                      }`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center w-10 h-10 rounded-full shadow-md transition
                  ${currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white'
                  }`}
                aria-label="Next Page"
              >
                <ChevronRight size={20} />
              </button>
            </nav>
          )}
        </>
      ) : (
        <div className="text-center py-10">
          <p>No blogs found.</p>
        </div>
      )}
    </div>
  );
};

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Banner Section */}
      <div className="relative h-[70vh] w-full">
        <img
          src={blog}
          alt="blog Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
          <h1 className="text-[30px] md:text-[35px] lg:text-[50px] font-semibold text-white text-center font-['Poppins',sans-serif]">Blogs</h1>
        </div>
      </div>

      <BlogCards />
      <Footer />
    </div>
  );
};

export default Blog;