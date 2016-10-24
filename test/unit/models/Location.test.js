"use strict";

const assert = require('chai').assert;

const newLocation = {
  name: 'Test location',
  abbreviation: 'TLOC'
};

describe('models:Location', () => {
  it('Should create new location', (done) => {
    Location
    .create(newLocation)
    .then((location) => {

      location.should.have.keys(
        'name',
        'createdAt',
        'updatedAt',
        'id',
        'abbreviation'
      )
      done();
    })
    .catch(done);
  });

  it('Should remove a location', (done) => {
    before((done) => {
      Location
      .create(newLocation)
      .then((location) => {
        newLocation = location
        location.should.have.keys(
          'name',
          'createdAt',
          'updatedAt',
          'id',
          'abbreviation'
        )
        done();
      })
      .catch(done);
    });

    Location
    .destroy(newLocation.id)
    .then((location) => {
      location[0].should.contain.keys(
        'name',
        'createdAt',
        'updatedAt',
        'id',
        'abbreviation'
      )
      done();
    })
    .catch(done);
  });
  it('Should find a list of locations', (done) => {
    Location
      .find()
      .then((location) => {
        console.log(location)
        done();
      })
      .catch(done);
  });
  it('Should find a single location', (done) => {
    Location
      .findOne({ id: fixtures.location[0].id })
      .then((location) => {
        done();
      })
      .catch(done);
  });
});
