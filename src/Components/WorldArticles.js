import React, { useEffect, useState } from "react";
import axios from "axios";
import MarkdownIt from "markdown-it";

function WorldArticles() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlogId, setSelectedBlogId] = useState(null); // Track the selected blog ID
  const mdParser = new MarkdownIt();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
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
                  src={`http://localhost:5000${blog.image}`}
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
