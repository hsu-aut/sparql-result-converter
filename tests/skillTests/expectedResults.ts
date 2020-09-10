// Expected result for a very simple one layer mapping including non-grouped children elements:
export const skillResult = {
	skills : [
		{
			skillIri: 'https://www.hsu-hh.de/skills#OpcUaSkill',
			stateMachine: 'https://www.hsu-hh.de/skills#OpcUaSkill_StateMachine',
			currentStateTypeIri: 'http://www.hsu-ifa.de/ontologies/ISA-TR88#Idle',
			skillParameters: [
				{
					parameterIri: 'https://www.hsu-hh.de/skills#OpcUaSkill_a',
					parameterName: 'a',
					parameterType: 'Integer',
					parameterRequired: 'true',
					parameterDefault: '0',
					parameterOptionValues: [ { value: '2' }, { value: '3' }, { value: '4' } ]
				},
				{
					parameterIri: 'https://www.hsu-hh.de/skills#OpcUaSkill_b',
					parameterName: 'b',
					parameterType: 'Integer',
					parameterRequired: 'true',
					parameterDefault: '0',
					parameterOptionValues: []
				}
			],
			skillOutputs: [
				{
					outputIri: 'https://www.hsu-hh.de/skills#OpcUaSkill_result',
					outputName: 'result',
					outputType: 'Integer',
					outputRequired: 'false',
					outputOptionValues: []
				}
			]
		}
	]
};
