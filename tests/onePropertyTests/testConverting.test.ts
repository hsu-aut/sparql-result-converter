import { assert } from 'chai';
import { expectedOneLayerResult, expectedTwoLayerResult,
	expectedOneLayerResultWithCollectedProperty, expectedTwoLayerResultWithCollectedProperty,
	oneLayerResultWithChildren } from './expectedResults';

import { SparqlResultConverter, MappingDefinition } from "../../src/SparqlResultConverter";

import {testData} from './test-data';

const resultConverter = new SparqlResultConverter();

describe('Tests including just one property on each layer', () => {
	describe('One Layer Test', () => {
		it('Should group a result on one layer without anything else, keeping all ungrouped child elements', () => {
		// Object that defines the structure of the result
			const oneLayerMappingDefinition: MappingDefinition[] = [
				{
					rootName: 'owners',
					propertyToGroup: 'owner',
					name: 'ownerName',
				}
			];

			const convertedResult = resultConverter.convertToDefinition(testData.results, oneLayerMappingDefinition).getAll();
			assert.deepEqual(convertedResult, oneLayerResultWithChildren,
				'Testing one layer conversion without property-collection failed...');
		});

		it('Should group a result on one layer without anything else, removing all ungrouped child elements', () => {
		// Object that defines the structure of the result
			const oneLayerMappingDefinition: MappingDefinition[] = [
				{
					rootName: 'owners',
					propertyToGroup: 'owner',
					name: 'ownerName',
				}
			];

			const convertedResult = resultConverter.convertToDefinition(testData.results, oneLayerMappingDefinition).getAll();
			assert.deepEqual(convertedResult, oneLayerResultWithChildren,
				'Testing one layer conversion without property-collection failed...');
		});

		it('Should group a result on one layer with a rootName for the children', () => {
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

			const convertedResult = resultConverter.convertToDefinition(testData.results, oneLayerMappingDefinition).getAll();
			assert.deepEqual(convertedResult, expectedOneLayerResult, 'Testing one layer conversion without property-collection failed...');
		});

		it('Should group a result on one layer and collect a property', () => {
		// Object that defines the structure of the result
			const oneLayerMappingDefinition: MappingDefinition[] = [
				{
					rootName: 'owners',
					propertyToGroup: 'owner',
					name: 'ownerName',
					toCollect: ['ownerAge'],
					childMappings: [{
						rootName: 'pets',
					}]
				}
			];

			const convertedResult = resultConverter.convertToDefinition(testData.results, oneLayerMappingDefinition).getAll();
			assert.deepEqual(convertedResult, expectedOneLayerResultWithCollectedProperty,
				'Testing one layer conversion without property-collection failed...');
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
			const convertedResult = resultConverter.convertToDefinition(testData.results, twoLayerMappingDefinition).getAll();

			assert.deepEqual(convertedResult, expectedTwoLayerResult, 'Testing two layer conversion without property collection failed...');
		});

		it('Should group a result on two layers and collect a property', () => {
		// Object that defines the structure of the result
			const twoLayerMappingDefinition: MappingDefinition[] = [
				{
					rootName: 'owners',
					propertyToGroup: 'owner',
					name: 'ownerName',
					toCollect: ['ownerAge'],
					childMappings: [
						{
							rootName: 'petTypes',
							propertyToGroup: 'petType',
							name: 'type',
							childMappings: [{
								rootName: 'pets',

							}]
						}
					]
				},
			];
			const convertedResult = resultConverter.convertToDefinition(testData.results, twoLayerMappingDefinition).getAll();

			assert.deepEqual(convertedResult, expectedTwoLayerResultWithCollectedProperty,
				'Testing two layer conversion with property collection failed...');
		});
	});
});
