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

// Add POST route for requesting to add a new note
notes.post("/", (req, res) => {
    // Read the notes from the file
    readFile("./db/db.json", "utf-8").then((data, err) => {
        if (err) {
            // If there's an error, throw an error
            throw new Error("Error reading notes from file");
        } else {
            // Else, return the parsed notes
            return JSON.parse(data);
        }
    })
    .then((notes) => {
        const {title, text} = req.body;
        if (title && text) {
            // If the body is valid, add it to the existing notes and return
            const newNote = {title, text};
            notes.push(newNote);
            return notes;
        } else {
            // Else throw an error
            throw new Error("Notes must have a title and a body");
        }
    })
    .then((notes) => {
        // Write the updated notes to the file
        writeFile("./db/db.json", JSON.stringify(notes, null, 4)).then((err) => {
            if (err) {
                throw new Error("Error writing note to file");
            } else {
                return notes;
            }
        })
    })
    .then((notes) => res.json(notes))       // Respond with the updated notes
    .catch((err) => console.error(err));    // If there's an error, console log it
});

module.exports = notes;