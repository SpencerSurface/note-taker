// Import statements
const express = require("express");
const path = require("path");
const api = require("./routes/index");

// Define port number
const PORT = process.env.PORT || 3001;

// Initialize Express app
const app = express();

// Use middleware to parse JSON
app.use(express.json());

// Use /public to serve static files
app.use(express.static("public"));

// Add API routes
app.use("/api", api);

// Add GET route for notes page
app.get("/notes", (req, res) => 
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// Add GET route for homepage
app.get("*", (req, res) => 
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

// Bind app to port and start listening
app.listen(PORT, () => 
    console.log(`App listening on port http://localhost:${PORT}`)
);
