// Import statements
const notes = require("express").Router();
const {readFromFile, writeToFile} = require("../helpers/fsHelpers");

// Add GET route for requesting to view all the notes
notes.get("/", (req, res) => {
    // Read the notes from the file, respond with the notes, catch errors
    readFromFile("./db/db.json")
    .then((notes) => res.json(notes))
    .catch((err) => console.error(err));
});

// Add POST route for requesting to add a new note
notes.post("/", (req, res) => {
    // Read the notes from the file
    readFromFile("./db/db.json")
    .then((notes) => {
        const {title, text} = req.body;
        if (title && text) {
            // If the body is valid, create a new note
            // crypto.randomUUID() guarantees a unique id
            const newNote = {title, text, id: crypto.randomUUID()};
            // Add it to the existing notes
            notes.push(newNote);
            // Return the updated notes
            return notes;
        } else {
            // Else throw an error
            throw new Error("Notes must have a title and a body");
        }
    })
    .then((notes) => {
        // Write the updated notes to the file
        writeToFile("./db/db.json", JSON.stringify(notes, null, 4))
    })
    .then((notes) => res.json(notes))       // Respond with the updated notes
    .catch((err) => console.error(err));    // If there's an error, console log it
});

// Add DELETE route for requesting to add a new note
notes.delete("/:id", (req, res) => {
    // Read the notes from the file
    readFromFile("./db/db.json")
    .then((notes) => {
        const id = req.params.id;
        // Remove the note corresponding to the given id from the existing notes, if it present
        notes = notes.filter((note) => note.id != id);
        // Return the updated notes
        return notes;
    })
    .then((notes) => {
        // Write the updated notes to the file
        writeToFile("./db/db.json", JSON.stringify(notes, null, 4));
    })
    .then((notes) => res.json(notes))       // Respond with the updated notes
    .catch((err) => console.error(err));    // If there's an error, console log it
});

module.exports = notes;