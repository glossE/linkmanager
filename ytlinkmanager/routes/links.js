const express = require('express');
const router = express.Router();
const Link = require('../models/Link');

// Get all links
router.get('/', async (req, res) => {
  try {
    const links = await Link.find();
    res.json(links);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a link
router.post('/', async (req, res) => {
  try {
    const { title, url } = req.body;
    const link = new Link({ title, url });
    await link.save();
    res.status(201).json(link);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a link
router.put('/:id', async (req, res) => {
  try {
    const { title, url } = req.body;
    const link = await Link.findByIdAndUpdate(req.params.id, { title, url }, { new: true });
    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }
    res.json(link);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a link
router.delete('/:id', async (req, res) => {
  try {
    const link = await Link.findByIdAndRemove(req.params.id);
    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }
    res.json({ message: 'Link deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

