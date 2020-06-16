import { assert } from 'chai';
import { ArrayUtil, SparqlResultLine } from '../../src/ArrayUtil';


describe('ArrayUtil Test', () => {
    it('Should extract value property of each entry', () => {
    // Object that defines the structure of the result
        const input : SparqlResultLine[] =
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
});
