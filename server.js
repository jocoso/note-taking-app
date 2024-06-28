// Importing Express.js...
const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;



app.use(express.static(path.join('public')));
app.use(express.json());


// GET Route for homepage
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf-8', (err, data) => {
        if(err) throw new Error(err);
        res.json(JSON.parse(data));
    })
});

app.post('/api/notes', (req, res) => {
    const note = req.body;
    note.id = uuidv4();

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err) throw new Error(err);

        const notes = JSON.parse(data);
        notes.push(note);

        fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
            if (err) throw new Error(err);
            res.json(note);
        });
    });
});

app.listen(PORT, () => console.log(`App listening on ${PORT}`));
