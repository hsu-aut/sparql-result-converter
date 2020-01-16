import { assert } from 'chai';

const SparqlResultConverter = require('../lib/sparql-result-converter');
const testData = require('./test-data');

const resultConverter = new SparqlResultConverter();


describe('The test', () => {
  it('should test table-to-tree-conversion', () => {
    // Object that defines the structure of the result
    const resultObject = [
      {
        objectToGroup: 'owner',
        name: 'ownerName',
        childRoot: 'pets'
      }
    ];

    // Expected result:
    const expectedResult = [
      {
        ownerName: 'Peter',
        pets: [
          {
            petName: 'Rex',
            petType: 'Dog'
          }
        ]
      },
      {
        ownerName: 'John',
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
        ownerName: 'Mary',
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

    const convertedResult = resultConverter.convert(testData.results, resultObject);
    assert.deepEqual(convertedResult, expectedResult, 'Testing table-to-tree-conversion failed...');
  });
});
