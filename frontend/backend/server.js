const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: "*" })); // Allow all origins for testing (restrict in production)
app.use(express.json()); // Parse JSON request bodies

// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Sample project data
const projects = [
  {
    "id": 1,
    "title": "Volcano Eruption Simulation",
    "description": "Create a realistic volcanic eruption using baking soda and vinegar to understand chemical reactions.",
    "type": "Chemistry",
    "link": "https://scienceproject.com/volcano"
  },
  {
    "id": 2,
    "title": "Solar-Powered Water Purifier",
    "description": "Build a small-scale solar-powered water purifier that removes impurities using evaporation and condensation.",
    "type": "Environmental Science",
    "link": "https://scienceproject.com/solar-water"
  },
  {
    "id": 3,
    "title": "Electric Circuit Basics",
    "description": "Learn about electricity by designing simple circuits with batteries, LEDs, and resistors.",
    "type": "Physics",
    "link": "https://scienceproject.com/circuits"
  },
  {
    "id": 4,
    "title": "Plant Growth & Light Experiment",
    "description": "Test how different colors of light affect plant growth using LED lights and seedlings.",
    "type": "Biology",
    "link": "https://scienceproject.com/plant-growth"
  }
]


// Dummy user database (Replace with actual database in production)
const users = [
  { userid: "guy", password: "123" },
  { userid: "user1", password: "securepass" },
];

// API Route to fetch projects
app.get("/api/projects", (req, res) => {
  res.json(projects);
});

// User validation route
app.post("/validate", (req, res) => {
  const { userid, password } = req.body;

  // Check if the provided credentials exist
  const user = users.find(u => u.userid === userid && u.password === password);

  if (user) {
    res.json({ message: "Login successful", success: true });
  } else {
    res.status(401).json({ message: "Invalid credentials", success: false });
  }
});

// Image upload and processing
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  console.log("Received image data");

  // Dummy processing function (Replace with actual OCR)
  const extractTextFromImage = (imageBuffer) => {
    console.log("Processing image...");
    return "Sample extracted text from image.";
  };

  const extractedText = extractTextFromImage(req.file.buffer);
  res.json({ text: extractedText });
});

// Root Route
app.get("/", (req, res) => {
  res.send("Backend is running on Wi-Fi!");
});

// Start server on 0.0.0.0 to allow access from any network device
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
  console.log(`Access from another device via http://<YOUR_LOCAL_IP>:${PORT}/`);
});
