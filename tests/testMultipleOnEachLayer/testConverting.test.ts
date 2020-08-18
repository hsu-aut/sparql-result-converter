import { assert } from 'chai';
import { expectedTwoLayerResult, expectedOneLayerResult } from './expectedResults';

import { SparqlResultConverter, MappingDefinition } from "../../src/SparqlResultConverter";

import {oneLayerTestData, twoLayerTestData} from './test-data';

const resultConverter = new SparqlResultConverter();


describe('One-Layer-Test with multiple properties on this layer', () => {
	it('Should group a result on one layer respecting multiple properties', () => {
		// Object that defines the structure of the result
		const oneLayerMappingDefinition: MappingDefinition[] = [
			{
				rootName: 'men',
				propertyToGroup: 'maleOwner',
				name: 'name',
				childMappings: [{
					rootName: 'pets',
				}],
			},
			{
				rootName: 'women',
				propertyToGroup: 'femaleOwner',
				name: 'name',
				childMappings: [{
					rootName: 'pets',
				}],
			}];

		const convertedResult = resultConverter.convertToDefinition(oneLayerTestData.results, oneLayerMappingDefinition);
		assert.deepEqual(convertedResult, expectedOneLayerResult, 'Testing one layer conversion failed...');
	});
});



describe('Two-Layer-Test with multiple properties on one layer', () => {
	it('Should group a result on two layers respecting multiple properties', () => {
		// Object that defines the structure of the result
		const twoLayerMappingDefinition: MappingDefinition[] = [
			{
				rootName: 'owners',
				propertyToGroup: 'owner',
				name: 'ownerName',
				childMappings: [{
					rootName: 'dogs',
					propertyToGroup: 'dogName',
					name: 'petName',
				},
				{
					rootName: 'cats',
					propertyToGroup: 'catName',
					name: 'petName',
				}
				]
			},
		];

		const convertedResult = resultConverter.convertToDefinition(twoLayerTestData.results, twoLayerMappingDefinition);
		assert.deepEqual(convertedResult, expectedTwoLayerResult, 'Testing one layer conversion failed...');
	});
});
