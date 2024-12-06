// const express = require("express");
// const mongoose = require('mongoose');

// const app = express();

// // Middleware to parse JSON data
// app.use(express.json());

// // MongoDB connection
// const connectToDB = async () => {
//   try {
//     await mongoose.connect('mongodb+srv://skyrrah999:zvsFOzq7GernQk9E@cluster0.uthoz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log("MongoDB connected");
//   } catch (error) {
//     console.error("Could not connect to MongoDB:", error);
//   }
// };

// connectToDB();





// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const multer = require("multer");
// const path = require("path");

// const app = express();
// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// // Middleware
// app.use(cors({ origin: "http://localhost:3000" }));

// // Set up multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Set the directory for saving images
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Use a unique name for each file
//   }
// });

// const upload = multer({ storage: storage });

// // MongoDB connection
// const connectToDB = async () => {
//   try {
//     await mongoose.connect('mongodb+srv://skyrrah999:zvsFOzq7GernQk9E@cluster0.uthoz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log("MongoDB connected");
//   } catch (error) {
//     console.error("Could not connect to MongoDB:", error);
//   }
// };

// connectToDB();

// // Define a User model
// const User = mongoose.model('User', {
//   name: String,
//   age: Number,
//   email: String,
//   phone: String,
//   image: String, // Store the image path in the database
// });

// // Create - Add a new user with an image
// app.post("/users", upload.single("image"), async (req, res) => {
//   try {
//     const { name, age, email, phone } = req.body;
//     const imagePath = req.file ? req.file.path : "m"; // Store image path if uploaded

    
//     const newUser = new User({ name, age, email, phone, image: imagePath });
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (err) {
//     res.status(500).send("Error adding user");
//   }
// });

// // Read - Get all users
// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).send("Error fetching users");
//   }
// });

// // Update - Update a user's details, including image
// app.put("/users/:id", upload.single("image"), async (req, res) => {
//   try {
//     const { name, age, email, phone } = req.body;
//     const imagePath = req.file ? req.file.path : "none"; // Store image path if uploaded

//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       { name, age, email, phone, image: imagePath },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).send("User not found");
//     }
//     res.json(updatedUser);
//   } catch (err) {
//     res.status(500).send("Error updating user");
//   }
// });

// // Delete - Remove a user by ID
// app.delete("/users/:id", async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);
//     if (!deletedUser) {
//       return res.status(404).send("User not found");
//     }
//     res.json({ message: "User deleted successfully", deletedUser });
//   } catch (err) {
//     res.status(500).send("Error deleting user");
//   }
// });

// // Serve images from the uploads folder
// app.use("/uploads", express.static("uploads"));

// // Server setup
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


// import express from "express";
// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import cors from "cors";
// import multer from "multer";
// import path from "path";



// /**
//  * Import the Express module.
//  * @module express
//  */
// const app = express();

// // Middleware to parse incoming JSON requests
// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// // Enable Cross-Origin Resource Sharing (CORS)
// app.use(cors({ origin: "https://frontend-crud-xd40kpls6-kehan321s-projects.vercel.app" }));

// // Ensure the 'uploads' directory exists, create it if it doesn't

// // if (!fs.existsSync(uploadDir)) {
// //   fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
// // }

// // Set up multer storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Directory where files will be uploaded
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename based on current time
//   }
// });

// const upload = multer({ storage: storage });

// // MongoDB connection setup
// const connectToDB = async () => {
//   try {
//     await mongoose.connect('mongodb+srv://skyrrah999:zvsFOzq7GernQk9E@cluster0.uthoz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log("MongoDB connected");
//   } catch (error) {
//     console.error("Could not connect to MongoDB:", error);
//   }
// };

// connectToDB();

// // Define a User model for MongoDB
// const User = mongoose.model('User', {
//   name: String,
//   age: Number,
//   email: String,
//   phone: String,
//   image: String, // Store image path in the database
// });

// // Create - Add a new user with an image
// app.post("/users", upload.single("image"), async (req, res) => {
//   try {
//     const { name, age, email, phone } = req.body;
//     // Normalize the file path (replace backslashes with forward slashes)
//     const imagePath = req.file ? req.file.path.replace("\\", "/") : "none"; // Replace backslashes with forward slashes

//     // Create and save the new user to the database
//     const newUser = new User({ name, age, email, phone, image: imagePath });
//     await newUser.save();
//     res.status(201).json(newUser); // Respond with the newly created user
//   } catch (err) {
//     console.error("Error adding user:", err);
//     res.status(500).send("Error adding user");
//   }
// });

// // Read - Get all users
// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.find(); // Fetch all users from the database
//     res.json(users);
//   } catch (err) {
//     console.error("Error fetching users:", err);
//     res.status(500).send("Error fetching users");
//   }
// });

// // Update - Update a user's details, including image
// app.put("/users/:id", upload.single("image"), async (req, res) => {
//   try {
//     const { name, age, email, phone } = req.body;
//     const imagePath = req.file ? req.file.path : "none"; // If image is uploaded, update the image path

//     // Update user details
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       { name, age, email, phone, image: imagePath },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).send("User not found");
//     }
//     res.json(updatedUser); // Respond with updated user
//   } catch (err) {
//     console.error("Error updating user:", err);
//     res.status(500).send("Error updating user");
//   }
// });

// // Delete - Remove a user by ID
// app.delete("/users/:id", async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);
//     if (!deletedUser) {
//       return res.status(404).send("User not found");
//     }
//     res.json({ message: "User deleted successfully", deletedUser });
//   } catch (err) {
//     console.error("Error deleting user:", err);
//     res.status(500).send("Error deleting user");
//   }
// });

// // Serve images from the 'uploads' folder
// app.use("/uploads", express.static("uploads")); // Static path to access images via http://localhost:5000/uploads/

// // Server setup
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });





