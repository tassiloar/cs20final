const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;
app.use(express.static(__dirname));

const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://tassilo:Moser100@products.1mttb.mongodb.net/';
const dbName = 'TuftsBookClub';

let db;

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to MongoDB');
        db = client.db(dbName);
    })
    .catch(err => console.error('Failed to connect to MongoDB', err));


//API ROUTES////////////
app.get('/api/books', async (req, res) => {
    try {
        const collection = db.collection('Books');
        const items = await collection.find().toArray();
        res.json(items);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Error retrieving data');
    }
});


//PUBLIC ROUTES////////////
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'homepage.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'blog.html'));
});

app.get('/bookstore', (req, res) => {
    res.sendFile(path.join(__dirname, 'bookstore.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/donations', (req, res) => {
    res.sendFile(path.join(__dirname, 'donations.html'));
});

app.get('/resources', (req, res) => {
    res.sendFile(path.join(__dirname, 'donations.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});