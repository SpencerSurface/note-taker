const {readFile, writeFile} = require("fs/promises");

// Reads and returns content from a file
function readFromFile(path) {
    return readFile(path, "utf-8").then((data, err) => {
        if (err) {
            // If there's an error, throw an error
            console.error(err);
            throw new Error("Error reading notes from file");
        } else {
            // Else, return the parsed data
            return JSON.parse(data);
        }
    });
}

// Writes and returns content to a file
function writeToFile(path, content) {
    return writeFile(path, content).then((err) => {
        if (err) {
            // If there's an error, throw an error
            console.error(err);
            throw new Error("Error writing note to file");
        } else {
            // Else, return the content
            return content;
        }
    });
}

module.exports = {readFromFile, writeToFile};