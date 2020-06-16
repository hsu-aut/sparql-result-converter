import { assert } from 'chai';
import { expectedOneLayerResult, expectedTwoLayerResult } from './expectedResults';

import { SparqlResultConverter } from "../../src/SparqlResultConverter";

import {testData} from './test-data';

const resultConverter = new SparqlResultConverter();


describe('One Layer Test', () => {
    it('Should group a result on one layer', () => {
    // Object that defines the structure of the result
        const oneLayerMappingDefinition = [
            {
                objectToGroup: 'owner',
                name: 'ownerName',
                childRoot: 'pets'
            }
        ];

        const convertedResult = resultConverter.convert(testData.results, oneLayerMappingDefinition);
        assert.deepEqual(convertedResult, expectedOneLayerResult, 'Testing one layer conversion failed...');
    });
});

describe('Two Layer Test', () => {
    it('Should group a result on two layers', () => {
    // Object that defines the structure of the result
        const twoLayerMappingDefinition = [
            {
                objectToGroup: 'owner',
                name: 'ownerName',
                childRoot: 'petTypes'
            },
            {
                objectToGroup: 'petType',
                name: 'animal',
                childRoot: 'pets'
            }
        ];
        const convertedResult = resultConverter.convert(testData.results, twoLayerMappingDefinition);

        assert.deepEqual(convertedResult, expectedTwoLayerResult, 'Testing two layer conversion failed...');
    });
});
