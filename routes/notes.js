// Import statements
const notes = require("express").Router();
const {readFile, writeFile} = require("fs/promises");

// Add GET route for requesting to view all the notes
notes.get("/", (req, res) => {
    // Read the notes from the file
    readFile("./db/db.json", "utf-8").then((data, err) => {
        if (err) {
            // If there's an error, log an error message
            console.error(err);
            console.error("Error reading notes from file");
        } else {
            // Else, respond to the request with the notes
            res.json(JSON.parse(data));
        }
    });
});

module.exports = notes;