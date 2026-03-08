const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  }
});

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;