const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: String
})

noteSchema.set('timestamps', true);

const Note = mongoose.model('Note', noteSchema, 'notes')

module.exports = {Note};
