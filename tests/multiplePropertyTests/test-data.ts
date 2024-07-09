/**
 * Mock-up of a piece of data that could be returned from a DB-Query
 */
export const twoLayerTestData = {
	head: ['owner', 'dogName', 'catName'],
	results: [
		{
			"owner": {
				"type": "uri",
				"value": "Peter"
			},
			"dogName": {
				"type": "uri",
				"value": "Rex"
			}
		},
		{
			"owner": {
				"type": "uri",
				"value": "John"
			},
			"catName": {
				"type": "uri",
				"value": "Jimmy"
			},
			"dogName": {
				"type": "uri",
				"value": "Lassie"
			}
		},
		{
			"owner": {
				"type": "uri",
				"value": "John"
			},
			"catName": {
				"type": "uri",
				"value": "Jimmy"
			},
			"dogName": {
				"type": "uri",
				"value": "Oliver"
			}
		},
		{
			"owner": {
				"type": "uri",
				"value": "Mary"
			},
			"catName": {
				"type": "uri",
				"value": "Huey"
			},
			"dogName": {
				"type": "uri",
				"value": "Louie"
			}
		},
		{
			"owner": {
				"type": "uri",
				"value": "Mary"
			},
			"catName": {
				"type": "uri",
				"value": "Dewey"
			},
			"dogName": {
				"type": "uri",
				"value": "Louie"
			}
		}
	]
};


export const oneLayerTestData = {
	head: ['maleOwner', 'femaleOwner', 'dogName', 'catName'],
	results: [
		{
			"maleOwner": {
				"type": "uri",
				"value": "Peter"
			},
			"dogName": {
				"type": "uri",
				"value": "Rex"
			}
		},
		{
			"maleOwner": {
				"type": "uri",
				"value": "John"
			},
			"catName": {
				"type": "uri",
				"value": "Jimmy"
			},
			"dogName": {
				"type": "uri",
				"value": "Lassie"
			}
		},
		{
			"maleOwner": {
				"type": "uri",
				"value": "John"
			},
			"catName": {
				"type": "uri",
				"value": "Jimmy"
			},
			"dogName": {
				"type": "uri",
				"value": "Oliver"
			}
		},
		{
			"femaleOwner": {
				"type": "uri",
				"value": "Mary"
			},
			"catName": {
				"type": "uri",
				"value": "Huey"
			},
			"dogName": {
				"type": "uri",
				"value": "Louie"
			}
		},
		{
			"femaleOwner": {
				"type": "uri",
				"value": "Mary"
			},
			"catName": {
				"type": "uri",
				"value": "Dewey"
			},
			"dogName": {
				"type": "uri",
				"value": "Louie"
			}
		}
	]
};


export const threeLayerCapabilityTestData =
{
	"head": [
		"capability",
		"input",
		"type",
		"output",
		"capabilityType",
		"processType"
	],
	"results": [
		{
			"output": {
				"type": "uri",
				"value": "http://www.w3id.org/hsu-aut/addition#OutputSum"
			},
			"input": {
				"type": "uri",
				"value": "http://www.w3id.org/hsu-aut/addition#InputA"
			},
			"capability": {
				"type": "uri",
				"value": "http://www.w3id.org/hsu-aut/addition#AdditionCapability"
			},
			"outputType": {
				"type": "uri",
				"value": "http://www.w3id.org/hsu-aut/VDI3682#Product"
			},
			"inputType": {
				"type": "uri",
				"value": "http://www.w3id.org/hsu-aut/VDI3682#Information"
			}
		},
		{
			"output": {
				"type": "uri",
				"value": "http://www.w3id.org/hsu-aut/addition#OutputSum"
			},
			"input": {
				"type": "uri",
				"value": "http://www.w3id.org/hsu-aut/addition#InputB"
			},
			"capability": {
				"type": "uri",
				"value": "http://www.w3id.org/hsu-aut/addition#AdditionCapability"
			},
			"outputType": {
				"type": "uri",
				"value": "http://www.w3id.org/hsu-aut/VDI3682#Product"
			},
			"inputType": {
				"type": "uri",
				"value": "http://www.w3id.org/hsu-aut/VDI3682#Information"
			}
		}
	]
};
