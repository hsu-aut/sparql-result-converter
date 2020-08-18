import { assert } from 'chai';
import { expectedOneLayerResult, expectedTwoLayerResult } from './expectedResults';

import { SparqlResultConverter, MappingDefinition } from "../../src/SparqlResultConverter";

import {testData} from './test-data';

const resultConverter = new SparqlResultConverter();


describe('One Layer Test', () => {
	it('Should group a result on one layer', () => {
		// Object that defines the structure of the result
		const oneLayerMappingDefinition: MappingDefinition[] = [
			{
				rootName: 'owners',
				propertyToGroup: 'owner',
				name: 'ownerName',
				childMappings: [{
					rootName: 'pets',
				}]
			}
		];

		const convertedResult = resultConverter.convertToDefinition(testData.results, oneLayerMappingDefinition);
		assert.deepEqual(convertedResult, expectedOneLayerResult, 'Testing one layer conversion failed...');
	});
});

describe('Two Layer Test', () => {
	it('Should group a result on two layers', () => {
		// Object that defines the structure of the result
		const twoLayerMappingDefinition: MappingDefinition[] = [
			{
				rootName: 'owners',
				propertyToGroup: 'owner',
				name: 'ownerName',
				childMappings: [
					{
						rootName: 'petTypes',
						propertyToGroup: 'petType',
						name: 'type',
						childMappings: [{
							rootName: 'pets'
						}]
					}
				]
			},
		];
		const convertedResult = resultConverter.convertToDefinition(testData.results, twoLayerMappingDefinition);

		assert.deepEqual(convertedResult, expectedTwoLayerResult, 'Testing two layer conversion failed...');
	});
});
