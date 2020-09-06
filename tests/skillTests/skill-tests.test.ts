import { assert } from 'chai';
import { skillResult } from './expectedResults';

import { SparqlResultConverter, MappingDefinition } from "../../src/SparqlResultConverter";

import {testData} from './test-data';

const resultConverter = new SparqlResultConverter();

describe('Tests for complex skills', () => {
	it('Should group a skill according to definition', () => {

		const skillMapping: MappingDefinition[] = [
			{
				rootName: 'skills',
				propertyToGroup: 'skill',
				name: 'skillIri',
				toCollect: ['stateMachine', 'currentStateTypeIri'],
				childMappings: [
					{
						rootName: 'skillParameters',
						propertyToGroup: 'parameterIri',
						name: 'parameterIri',
						toCollect: ['parameterIri', 'parameterName', 'parameterType', 'parameterRequired', 'parameterDefault'],
						childMappings: [
							{
								rootName: 'parameterOptionValues',
								propertyToGroup: 'paramOptionValue',
								name: 'value',
							}
						]
					},
					{
						rootName: 'skillOutputs',
						propertyToGroup: 'outputIri',
						name: 'outputIri',
						toCollect: ['outputIri', 'outputName', 'outputType', 'outputRequired', 'outputDefault'],
						childMappings: [
							{
								rootName: 'outputOptionValues',
								propertyToGroup: 'outputOptionValue',
								name: 'value',
							}
						]
					},
				]
			},
		];
		const convertedResult = resultConverter.convertToDefinition(testData.results.bindings, skillMapping, false).getAll();

		assert.deepEqual(convertedResult, skillResult, 'Testing two layer conversion without property collection failed...');
	});
});
