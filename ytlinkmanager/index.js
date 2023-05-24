const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Link = require('./models/Link');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ytlinkmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.get('/links', (req, res) => {
  Link.find({})
    .then(links => {
      res.json(links);
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ message: 'Failed to fetch links' });
    });
});

app.post('/links', (req, res) => {
  const { title, link } = req.body;

  const newLink = new Link({
    title: title,
    link: link
  });

  newLink.save()
    .then(savedLink => {
      console.log('Link added successfully');
      res.json(savedLink);
    })
    .catch(err => {
      console.error('Error:', err);
      res.status(500).json({ message: 'Failed to add link' });
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

