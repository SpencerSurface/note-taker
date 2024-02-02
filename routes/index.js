// Import statements
const express = require("express");
const notesRouter = require("./notes");

// Initialize Express app
const app = express();

// Use the modular router
app.use("/notes", notesRouter);

// Export the app
module.exports = app;
