const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


/* Functions used in Routes */
function findById(id, notesArray) {
  const result = notesArray.filter(note => note.id === id)[0];
  return result;
}


function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(notesArray) // optionally: (notesArray, null, 2) to add whitespace to make json more readable
  );
  return note;
}

function deleteNote(id, notesArray) {
  let message;
  for (var i = 0; i < notesArray.length; i++) {
    if (id === notesArray[i].id) {
      notesArray.splice(i, 1);
      message = "The note was deleted";
      break;
    } else {
      message = "No matching note was found";
    }
  }
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(notesArray)
  );
  return message;
  
}

/* Routes */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

app.get('/api/notes', (req, res) => {
  let results = db; 
  res.json(results);
});

app.get('/api/notes/:id', (req, res) => {
  
});

app.post('/api/notes', (req, res) => {
  req.body.id = uuidv4();
  const note = createNewNote(req.body, db);
  res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
  const deleted = deleteNote(req.params.id, db);
  res.send(deleted);
});


app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
