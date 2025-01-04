import React, { useEffect, useState } from "react";
import axios from "axios";
import MarkdownIt from "markdown-it";
import { Helmet } from 'react-helmet';


const API_URL = process.env.REACT_APP_API_URL

function WorldArticles() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlogId, setSelectedBlogId] = useState(null); // Track the selected blog ID
  const mdParser = new MarkdownIt();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/blogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleBlogClick = (blogId) => {
    // Toggle between selected and none
    setSelectedBlogId(selectedBlogId === blogId ? null : blogId);
  };

  return (
    <div>
      <Helmet>
        <title>Flag Quiz - Knowledge Base!</title>
        <meta name="description" content="Welcome to the Flag Quiz! Challenge yourself to identify flags from around the world." />
        <meta property="og:title" content="Flag Quiz - Knowledge Base!" />
        <meta property="og:description" content="Can you name all the flags? Start the quiz now and find out!" />
      </Helmet>
      <h4>World Articles</h4>
      {blogs.map((blog) => (
        <div key={blog._id} style={{ marginBottom: "20px" }}>
          {/* Clickable title */}
          <h3 onClick={() => handleBlogClick(blog._id)} style={{ cursor: "pointer" }}>
            {blog.title}
          </h3>
          {/* Show full content if this blog is selected */}
          {selectedBlogId === blog._id && (
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html: mdParser.render(blog.content),
                }}
              ></div>
              {blog.image && (
                <img
                  src={`${API_URL}${blog.image}`}
                  alt={blog.title}
                  style={{ maxWidth: "100%" }}
                />
              )}
              <p>
                <small>{new Date(blog.date).toLocaleString()}</small>
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default WorldArticles;
