import React, { useState } from "react";
import axios from "axios";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from 'react-markdown';  // To render markdown content

function AdminPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");  // Content for Markdown
  const [message, setMessage] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [image, setImage] = useState(null); // To handle image upload

  const mdParser = new MarkdownIt(); // Markdown parser

  const API_URL = process.env.REACT_APP_API_URL

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/blogs`, {
        headers: { "Content-Type": "application/json" }
      });
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);  // Passing Markdown content
    if (image) formData.append("image", image); // Handle image if uploaded

    try {
      if (editingBlog) {
        // Update blog
        const response = await axios.put(
          `${API_URL}/api/blogs/${editingBlog._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        setMessage(response.data.message);
      } else {
        // Create new blog
        const response = await axios.post(`${API_URL}/api/blogs`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        setMessage(response.data.message);
      }

      // Clear state after submission
      setTitle("");
      setContent("");
      setImage(null); // Reset image input
      setEditingBlog(null); // Reset editing state
      fetchBlogs(); // Refresh blog list
    } catch (error) {
      setMessage("Error: Unable to submit blog.");
    }
  };

  const handleEditorChange = ({ html, text }) => {
    setContent(text); // Update content when editor changes
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setContent(blog.content);  // Set the content to Markdown for editing
    setImage(null);  // Reset image input since file input can't be pre-filled
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/api/blogs/${id}`,
        {withCredentials: true});
      setMessage(response.data.message);
      fetchBlogs(); // Refresh the list of blogs
    } catch (error) {
      setMessage("Error: Unable to delete blog.");
    }
  };

  return (
    <div className="mb-3">
      <form onSubmit={handleSubmit}>
        <h3>{editingBlog ? "Edit Blog" : "Create Blog"}</h3>
        <input
          type="text"
          value={title}
          className="form-control"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        
        {/* Markdown Editor */}
        <MdEditor
          value={content}
          onChange={handleEditorChange}
          renderHTML={(text) => mdParser.render(text)}
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="form-control"
        />

        <button className="btn btn-success" type="submit">
          {editingBlog ? "Update Blog" : "Create Blog"}
        </button>
      </form>

      <p>{message}</p>

      <div>
        {blogs.map((blog) => (
          <div key={blog._id}>
            <h2>{blog.title}</h2>
            <div>
              {/* Display the content as rendered Markdown */}
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>
            {blog.image && <img src={blog.image} alt={blog.title} />}
            <button className="btn btn-success" onClick={() => handleEdit(blog)}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={() => handleDelete(blog._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPostForm;
