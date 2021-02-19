const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { notes } = require('./db/db.json')

const app = express();
const PORT = 3001;

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
   res.json(notes);
});

pp.get('/api/notes/:note', (req, res) => {
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

/*
Currently an array of objects use ES5 constructors?
Store notes as class instances??



*/