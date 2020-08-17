import { assert } from 'chai';
import { expectedResult as expectedResult } from './expectedResults';

import { SparqlResultConverter } from "../../src/SparqlResultConverter";

import {testData} from './test-data';

const resultConverter = new SparqlResultConverter();


describe('One Layer Test with multiple properties on one layer', () => {
	it('Should group a result on one layer respecting multiple properties', () => {
		// Object that defines the structure of the result
		const oneLayerMappingDefinition = [[
			{
				objectToGroup: 'owner',
				name: 'ownerName',
				childRoot: 'dogs'
			},
			{
				objectToGroup: 'dogName',
				name: 'petName',
				childRoot: 'cats'
			},
			{
				objectToGroup: 'catName',
				name: 'petName',
				childRoot: 'dogs'
			}
		]];

		const convertedResult = resultConverter.convert(testData.results, oneLayerMappingDefinition);
		assert.deepEqual(convertedResult, expectedResult, 'Testing one layer conversion failed...');
	});
});
