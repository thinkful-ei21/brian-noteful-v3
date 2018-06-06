const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { MONGODB_URI } = require('../config');

const {Note} = require('../models/note');

mongoose.connect(MONGODB_URI)
  .then(() => {
    const searchTerm = 'lady gaga';
    let filter = {};

    if (searchTerm) {
      const re = new RegExp(searchTerm, 'i');
      filter.title = { $regex: re };
    }

    return Note.find(filter)
      .sort('created')
      .then(results => {
        console.log(results);
      })
      .catch(console.error);
  })
  .then(() => {
    return mongoose.disconnect()
      .then(() => {
        console.info('Disconnected');
      });
  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });


// //////////findbyId//////
//
// mongoose.connect(MONGODB_URI)
//
// .then(() => {
//   const searchId = "000000000000000000000002";
//   Note.findbyId(searchId);
//
// }
// .then(() => {
//   return mongoose.disconnect()
// })
//
// //////////create new note/////
// mongoose.connect(MONGODB_URI)
//
// .then(
//   newNote = {
//     title: "stuff";
//     content: "more stuff";
//   }
//
//   note.create(newNote);
// )
// .then(() => {
//   return mongoose.disconnect()
// })
//
// ///////update a note/////
//
// note.findbyIdAndUpdate("000000000000000000000002", {title: "morecats",
// content: "lesser cats stuff"
// })
//
// return Note.findByIdAndRemove('000000000000000000000004')
//     //   .then(result => {
//     //     console.log('deleted', result);
//     //   });
})
  .then(() => {
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });
