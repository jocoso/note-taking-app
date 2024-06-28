// Importing Express.js...
const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join('public')));

// GET Route for homepage
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    const db = require('./db/db.json');
    res.status(200).json(db);
});

app.listen(PORT, () => console.log(`App listening on ${PORT}`));
