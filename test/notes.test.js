const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const mocha = require('mocha');
const app = require('../server');
const { TEST_MONGODB_URI } = require('../config');

const {Note} = require('../models/note');

const seedNotes = require('../db/seed/notes');
const faker = require('faker');

const expect = chai.expect;
chai.use(chaiHttp);

function generateNote(){
  return{
    title: faker.name.title(),
    content: faker.lorem.sentence()
  };
}


describe('notes api', function(){

  before(function(){
    return mongoose.connect(TEST_MONGODB_URI)
      .then(() => mongoose.connection.db.dropDatabase());
  })
  beforeEach(function () {
      return Note.insertMany(seedNotes);
    });

    afterEach(function () {
      return mongoose.connection.db.dropDatabase();
    });

    after(function () {
      return mongoose.disconnect();
    });


describe('GET api/notes', function(){

  it('should return all the notes in the database', function(){
    let res;
     return chai.request(app)
      .get('/api/notes ')
      .then(function(_res){
        res = _res;
        expect(_res).to.have.status(200);

        expect(_res.body).to.be.a('array');
        //expect(_res.body).to.have.length(Note.length);
      //return Note.count();
    })
    // .then(
    //   count => { console.log(count);}
  //  );
  });

});
});
//////post////
// describe('POST /api/notes', function () {
//     it('should create and return a new item when provided valid data', function () {
//       const newItem = {
//         'title': 'The best article about cats ever!',
//         'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...'
//       };
//
//       let res;
//       // 1) First, call the API
//       return chai.request(app)
//         .post('/api/notes')
//         .send(newItem)
//         .then(function (_res) {
//           res = _res;
//           expect(res).to.have.status(201);
//           expect(res).to.have.header('location');
//           expect(res).to.be.json;
//           expect(res.body).to.be.a('object');
//           expect(res.body).to.have.keys('id', 'title', 'content', 'createdAt', 'updatedAt');
//           // 2) then call the database
//           return Note.findById(res.body.id);
//         })
//         // 3) then compare the API response to the database results
//         .then(data => {
//           expect(res.body.id).to.equal(data.id);
//           expect(res.body.title).to.equal(data.title);
//           expect(res.body.content).to.equal(data.content);
//           expect(new Date(res.body.createdAt)).to.eql(data.createdAt);
//           expect(new Date(res.body.updatedAt)).to.eql(data.updatedAt);
//         });
//     });
//   });

////////get by id/// supposed to be 200
// describe('GET /api/notes/:id', function () {
//     it('should return correct note', function () {
//       let data;
//       // 1) First, call the database
//       return Note.findOne()
//         .then(_data => {
//           data = _data;
//           // 2) then call the API with the ID
//           return chai.request(app).get(`/api/notes/${data.id}`);
//         })
//         .then((res) => {
//           expect(res).to.have.status(500);
//           expect(res).to.be.json;
//
//           expect(res.body).to.be.an('object');
//           expect(res.body).to.have.keys('id', 'title', 'content', 'createdAt', 'updatedAt');
//
//           // 3) then compare database results to API response
//           expect(res.body.id).to.equal(data.id);
//           expect(res.body.title).to.equal(data.title);
//           expect(res.body.content).to.equal(data.content);
//           expect(new Date(res.body.createdAt)).to.eql(data.createdAt);
//           expect(new Date(res.body.updatedAt)).to.eql(data.updatedAt);
//         });
//     });
//   })
