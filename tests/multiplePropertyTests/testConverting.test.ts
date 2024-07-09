import { assert } from 'chai';
import { expectedTwoLayerResult, expectedOneLayerResult, expectedThreeLayerResultWithoutKeepingUngroupedElements } from './expectedResults';

import { SparqlResultConverter, MappingDefinition } from "../../src/SparqlResultConverter";

import {oneLayerTestData, threeLayerCapabilityTestData, twoLayerTestData} from './test-data';

const resultConverter = new SparqlResultConverter();


describe('Tests including multiple properties on one layer', () => {
	it('Should group a result on two layers respecting multiple properties on the first layer', () => {
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

		const convertedResult = resultConverter.convertToDefinition(oneLayerTestData.results, oneLayerMappingDefinition).getAll();
		assert.deepEqual(convertedResult, expectedOneLayerResult, 'Testing one layer conversion failed...');
	});



	it('Should group a result on two layers respecting multiple properties on the second layer', () => {

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

		const convertedResult = resultConverter.convertToDefinition(twoLayerTestData.results, twoLayerMappingDefinition).getAll();
		assert.deepEqual(convertedResult, expectedTwoLayerResult, 'Testing one layer conversion failed...');
	});

	it('Should group a result on three layers and not keep the ungrouped elements in the last layer after renaming keys', () => {
		// Object that defines the structure of the result
		const capabilityMapping: MappingDefinition[] = [
			{
				rootName: 'capabilities',
				propertyToGroup: 'capability',
				name: 'iri',
				toCollect: ["skillIri", "capabilityType", "processType"],
				childMappings: [
					{
						rootName: 'inputs',
						propertyToGroup: 'input',
						name: 'iri',
						toCollect: ['inputType as type']
					},
					{
						rootName: 'outputs',
						propertyToGroup: 'output',
						name: 'iri',
						toCollect: ['outputType as type']
					}
				]
			},
		];

		const convertedResult = resultConverter
			.convertToDefinition(threeLayerCapabilityTestData.results, capabilityMapping, false).getAll();
		assert.deepEqual(convertedResult, expectedThreeLayerResultWithoutKeepingUngroupedElements,
			'Testing three layer mapping with renaming and dropping all ungrouped elements failed...');
	});
});
