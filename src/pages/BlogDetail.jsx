import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Indoor from '../assets/goverment.jpg';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/blog/${id}`);
        if (!response.ok) {
          throw new Error('Blog not found');
        }
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div className="container mx-auto p-10 text-center">Loading...</div>;
  if (error || !blog) return <div className="container mx-auto p-10 text-center text-red-500">{error || 'Blog not found'}</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Banner */}
      <div className="relative h-[400px] w-full bg-black flex items-center justify-center">
        <h1 className="text-3xl font-bold text-white">Blog Detail</h1>
      </div>

      <div className="container mx-auto px-5 py-16 font-serif text-gray-800">
        <div className=" mx-auto">
          {/* Title */}
          <h1 className="text-4xl text-center mb-15 font-semibold leading-tight mb-6">{blog.title}</h1>

          {/* Main Image */}
          <img
            src={blog.image ? `http://127.0.0.1:8000/storage/${blog.image}` : Indoor}
            alt={blog.title}
            className="rounded-xl mb-10 w-full h-[400px] object-cover shadow-md"
          />

          {/* Content */}
          <div className="space-y-6 text-lg leading-8 text-gray-700">
            {blog.content.split('\n').map((para, index) => (
              para.trim() && <p key={index}>{para.trim()}</p>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetail;