const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');

const app = express();
onst PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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
  //
});

app.post('/api/notes', (req, res) => {
    //
});

app.delete('/api/notes', (req, res) => {
   // 
});


app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
