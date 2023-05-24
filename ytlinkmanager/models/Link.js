const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  title: String,
  url: String,
});

module.exports = mongoose.model('Link', linkSchema);

