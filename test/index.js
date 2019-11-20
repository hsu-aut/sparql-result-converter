import {
  assert
} from 'chai';

const Rdf4JResultConverter = require('../lib/rdf4j-result-converter');
const testData = require('./test-data');

const resultConverter = new Rdf4JResultConverter();

// This is the table-structure we might get from a DB


describe('The test', () => {
  it('should test table-to-tree-conversion', () => {
    // Object that describes how the result should be structured
    const resultObject = [
      {
        objectToGroup: 'owner',
        name: 'name',
        childRoot: 'pets'
      }
    ];

    // Expected result:
    const expectedResult = [
      {
        ownerName: 'Peter',
        pets: [
          {
            pet: 'Rex',
            petType: 'Dog'
          }
        ]
      },
      {
        ownerName: 'John',
        pets: [
          {
            pet: 'Lassie',
            petType: 'Dog'
          },
          {
            pet: 'Oliver',
            petType: 'Cat'
          }
        ]
      },
      {
        ownerName: 'Mary',
        pets: [
          {
            pet: 'Huey',
            petType: 'Cat'
          },
          {
            pet: 'Dewey',
            petType: 'Cat'
          },
          {
            pet: 'Louie',
            petType: 'Cat'
          }
        ]
      }
    ];

    const convertedResult = resultConverter.convert(testData.results, resultObject);
    assert.deepEqual(convertedResult, expectedResult, 'Testing table-to-tree-conversion failed...');
  });
});
