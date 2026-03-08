require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const articleRoutes = require("./routes/articleRoutes");
const trackingRoutes = require("./routes/trackingRoutes");
const highlightRoutes = require("./routes/highlightRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

connectDB();

const app = express();

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(cors());
app.use(express.json());

// Static files for uploaded images
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/student/highlights", highlightRoutes);
app.use("/api/analytics", analyticsRoutes);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});