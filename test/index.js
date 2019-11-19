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
        object: 'personName',
        name: 'name',
        childRoot: 'pets'
      }
    ];

    // Expected result:
    const expectedResult = [
      {
        name: 'Alex',
        pets: [
          {
            petName: 'Rex',
            petType: 'Dog'
          }
        ]
      },
      {
        name: 'John',
        pets: [
          {
            petName: 'Lassie',
            petType: 'Dog'
          },
          {
            petName: 'Oliver',
            petType: 'Cat'
          }
        ]
      },
      {
        name: 'Mary',
        pets: [
          {
            petName: 'Huey',
            petType: 'Cat'
          },
          {
            petName: 'Dewey',
            petType: 'Cat'
          },
          {
            petName: 'Louie',
            petType: 'Cat'
          }
        ]
      }
    ];

    const convertedResult = resultConverter.convertTableToTree(testData.results, resultObject);
    assert.deepEqual(convertedResult, expectedResult, 'Testing table-to-tree-conversion failed...');
  });
});
