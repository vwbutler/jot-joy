const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const uniqid = require("uniqid");

app.use(express.json());

app.use(express.static("public"));

// Routes needed

//GET /notes should return the notes.html file.

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//GET /api/notes should read the db.json file and return all saved notes as JSON.

app.get("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", "utf8", function (err, data) {
    res.send(data);
  });
});

//POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id

app.post("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", "utf8", function (err, data) {
    const notes = JSON.parse(data);
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uniqid(),
    };
    notes.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(notes), function (err) {
      if (err) console.log(err);
      res.json(newNote);
    });
  });
});

//deleting the note
app.delete("/api/notes/:id", function (req, res) {
  fs.readFile("./db/db.json", "utf8", function (err, data) {
    const notes = JSON.parse(data);
    //filter -- creates array from an array and filters out what you want -- built in
    const filteredNotes = notes.filter((note) => note.id !== req.params.id);
    fs.writeFile("./db/db.json", JSON.stringify(filteredNotes), function (err) {
      if (err) console.log(err);
      res.send(200);
    });
  });
});

//GET * should return the index.html file.
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
