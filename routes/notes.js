// Import statements
const notes = require("express").Router();
const {readFile} = require("fs");

// Add GET route for sending all the notes
notes.get("/", (req, res) => {
    // Read the notes from the file
    readFile("../db/db.json", (err, data) => {
        if (err) {
            // If there's an error, log an error message
            console.error("Error reading notes from file");
        } else {
            // Else, respond to the request with the notes
            res.json(JSON.parse(data));
        }
    })
});