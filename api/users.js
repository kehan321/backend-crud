// api/users.js
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import path from "path";

const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors({ origin: "https://frontend-crud-xd40kpls6-kehan321s-projects.vercel.app" }));

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/tmp/uploads/"); // Temporary directory for Vercel functions
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename
  }
});

const upload = multer({ storage: storage });

// MongoDB connection setup
const connectToDB = async () => {
  try {
    await mongoose.connect('your-mongo-db-url', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Could not connect to MongoDB:", error);
  }
};

connectToDB();

// Define a User model for MongoDB
const User = mongoose.model('User', {
  name: String,
  age: Number,
  email: String,
  phone: String,
  image: String,
});

// Define Express routes for CRUD operations
app.post("/users", upload.single("image"), async (req, res) => {
  try {
    const { name, age, email, phone } = req.body;
    const imagePath = req.file ? req.file.path.replace("\\", "/") : "none"; 

    const newUser = new User({ name, age, email, phone, image: imagePath });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).send("Error adding user");
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Error fetching users");
  }
});

app.put("/users/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, age, email, phone } = req.body;
    const imagePath = req.file ? req.file.path : "none";

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, age, email, phone, image: imagePath },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).send("Error updating user");
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).send("User not found");
    }
    res.json({ message: "User deleted successfully", deletedUser });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).send("Error deleting user");
  }
});

app.use("/uploads", express.static("/tmp/uploads/")); // Serve images from the temporary directory

// Export Express handler for Vercel
export default app;
