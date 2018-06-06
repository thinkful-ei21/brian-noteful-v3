'use strict';

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const {Note} = require('../models/note');

/* ========== GET/READ ALL ITEM ========== */
router.get('/', (req, res, next) => {

  const { searchTerm } = req.query;

    let filter = {};

    if (searchTerm) {
      filter.title = { $regex: searchTerm, $options: 'i'};

      // Mini-Challenge: Search both `title` and `content`
      // const re = new RegExp(searchTerm, 'i');
      // filter.$or = [{ 'title': re }, { 'content': re }];
    }

    Note.find(filter)
      .sort({ updatedAt: 'desc' })
      .then(results => {
        res.json(results);
      })



});

/* ========== GET/READ A SINGLE ITEM ========== */
router.get('/:id', (req, res, next) => {
  note.findOne()
  .then(note => res.json({
    title: note.title,
    content: note.content
  }))
  console.log('Get a Note');
  res.json({ id: 1, title: 'Temp 1' });

});

/* ========== POST/CREATE AN ITEM ========== */
router.post('/', (req, res, next) => {
let newNote = {title: req.body.title,
               content: req.body.content};
  note.create({newNote})
  console.log('Create a Note');
  res.location('path/to/new/document').status(201).json({ id: 2, title: 'Temp 2' });

});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/:id', (req, res, next) => {
  const { id } = req.params.id;
   const { title, content } = req.body;

Note.findByIdAndUpdate(id, updateNote, { new: true })
  console.log('Update a Note');
  res.json({ id: 1, title: 'Updated Temp 1' });

});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/:id', (req, res, next) => {
const { id } = req.params.id;
   Note.findByIdAndRemove(id)

  console.log('Delete a Note');
  res.status(204).end();
});

module.exports = router;
