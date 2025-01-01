const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const multer = require('multer');
const session = require('express-session');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require("path");
const cookieParser = require('cookie-parser');

const app = express();

// Middleware setup
app.use(cors({ origin: 'https://funwithworldflags.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(bodyParser.json()); // For parsing application/json
app.use(cookieParser());


// Session Setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 3600000 // 1 hour
  }, 
}));

const adminUsername = process.env.REACT_APP_USERNAME;
const adminHashedPassword = process.env.REACT_APP_PASSWORD; 

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Blog Schema and Model
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  date: { type: Date, default: Date.now }
});

const Blog = mongoose.model("Blog", blogSchema);

// Middleware to check for session authentication
const authenticateSession = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).send('Unauthorized');
  }
  next();
};

// POST Route for login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (username === adminUsername) {
    const isMatch = await bcrypt.compare(password, adminHashedPassword);
    if (isMatch) {
      // Set user session
      req.session.user = { username }; // Save session data
      return res.status(200).json({ message: "Logged in successfully" });
    }
  }
  return res.status(401).json({ error: "Invalid username or password" });
});

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// POST Route for Creating a Blog
app.post("/api/blogs", authenticateSession, upload.single("image"), async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const blog = new Blog({ title, content, image });
    await blog.save();
    res.status(201).json({ message: "Blog created successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog" });
  }
});

// GET Route for Fetching All Blogs
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// GET Route for Fetching a Single Blog by ID
app.get("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

// PUT Route for Updating a Blog by ID
app.put("/api/blogs/:id", authenticateSession, upload.single("image"), async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.image = image || blog.image;

    await blog.save();
    res.json({ message: "Blog updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update blog" });
  }
});

// DELETE Route for Deleting a Blog by ID
app.delete("/api/blogs/:id", authenticateSession, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json({ message: "Blog deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

// Seed Blogs for Testing
const seedBlogs = async () => {
  const existingBlogs = await Blog.find();
  if (existingBlogs.length === 0) {
    await Blog.create({
      title: "Sample Blog",
      content: "This is a sample blog content.",
      image: null,
    });
  }
};

seedBlogs();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
