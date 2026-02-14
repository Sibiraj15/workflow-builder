
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/workflow", require("./routes/workflowRoutes"));
app.use("/api/status", require("./routes/statusRoutes"));

// Serve React frontend
const frontendBuildPath = path.join(__dirname, "../workflow-frontend/client");
app.use(express.static(frontendBuildPath));

// Catch-all for React (Express 5 compatible)
app.get(/^\/.*$/, (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
