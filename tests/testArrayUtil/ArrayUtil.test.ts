import { assert } from 'chai';
import { ArrayUtil, SparqlResultLine } from '../../src/ArrayUtil';


describe('ArrayUtil Test', () => {
	it('Should extract value property of each entry', () => {
		// Object that defines the structure of the result
		const input: SparqlResultLine[] =
		[
			{
				"capability": {
					"type": "uri",
					"value": "http://www.hsu-ifa.de/ontologies/capability-example#FraesenCapability"
				},
				"skill": {
					"type": "uri",
					"value": "http://www.hsu-ifa.de/ontologies/capability-example#FraesenSkill"
				}
			},
			{
				"capability": {
					"type": "uri",
					"value": "http://www.hsu-ifa.de/ontologies/capability-example#FraesenCapability"
				},
				"skill": {
					"type": "uri",
					"value": "http://www.hsu-ifa.de/ontologies/capability-example#FraesenSkill_REST"
				}
			}
		];

		const expectedResult = [
			{
				capability: "http://www.hsu-ifa.de/ontologies/capability-example#FraesenCapability",
				skill: "http://www.hsu-ifa.de/ontologies/capability-example#FraesenSkill"
			},
			{
				capability: "http://www.hsu-ifa.de/ontologies/capability-example#FraesenCapability",
				skill: "http://www.hsu-ifa.de/ontologies/capability-example#FraesenSkill_REST"
			}
		];


		const transformedArray = ArrayUtil.extractValues(input);
		assert.deepEqual(transformedArray, expectedResult, 'Expected result should have all values extracted...');
	});


	it('Should confirm that all array entries contain grouping property', () => {
		// Just some random array
		const input =
		[
			{
				name: "Peter",
				age: 55
			},
			{
				name: "John",
				age: 43
			},
			{
				name: "Mary",
				age: 29
			}
		];

		const result = ArrayUtil.allEntriesContainGroupingProperty(input, "name");
		assert.isTrue(result, 'Should return true because all array entries contain grouping property...');
	});


	it('Should confirm that not all array entries contain grouping property', () => {
		// Just some random array
		const input =
		[
			{
				name: "Peter",
				age: 55,
				city: "Boston"
			},
			{
				name: "John",
				age: 43,
				city: "New York City"
			},
			{
				name: "Mary",
				age: 29
			}
		];
		const result = ArrayUtil.allEntriesContainGroupingProperty(input, "city");
		assert.isFalse(result, 'Should return false because not all array entries contain grouping property...');
	});
});
