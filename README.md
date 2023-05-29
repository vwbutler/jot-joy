# jot-joy
An application called Note Taker that can be used to write and save notes.


The application should have a db.json file on the back end that will be used to store and retrieve notes using the fs module.

The following HTML routes should be created:



GET * should return the index.html file.

The following API routes should be created:

GET /api/notes should read the db.json file and return all saved notes as JSON.

POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id 