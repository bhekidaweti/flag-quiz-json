const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const multer = require('multer');
require('dotenv').config();
const path = require("path");

const app = express();
// Serve static files from the React app
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors({ origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
 }));
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

const adminUsername = process.env.REACT_APP_USERNAME;
const adminHashedPassword = process.env.REACT_APP_PASSWORD; // This should be the hashed password stored in the .env file

// Middleware for token authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://mongo-user:yFGtNVBNwqB7Y9AA@fun.0yi5x.mongodb.net/?retryWrites=true&w=majority&appName=Fun';
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

// POST Route for login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  // Check if the username matches the stored one
  if (username === adminUsername) {
    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(password, adminHashedPassword);

    if (isMatch) {
      // Password matches, create a JWT token
      const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
      return res.status(200).json({ token });
    }
  }

  // If username doesn't match or password is incorrect
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
app.post("/api/blogs", authenticateToken, upload.single("image"), async (req, res) => {
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
app.put("/api/blogs/:id", authenticateToken, upload.single("image"), async (req, res) => {
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
app.delete("/api/blogs/:id", authenticateToken, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id); // Use findByIdAndDelete
    if (!blog) {
      console.error("Blog not found:", req.params.id);
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json({ message: "Blog deleted successfully!" });
  } catch (error) {
    console.error("Error deleting blog:", error);
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
  console.log(`Server running on http://localhost:${PORT}`);
});