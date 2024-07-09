// Expected result for one layer mapping:
export const expectedTwoLayerResult = {
	owners: [{
		ownerName: 'Peter',
		dogs: [
			{
				petName: 'Rex',
			}
		],
		cats: []
	},
	{
		ownerName: 'John',
		dogs: [
			{
				petName: 'Lassie',
			},
			{
				petName: 'Oliver',
			}
		],
		cats: [
			{
				petName: 'Jimmy'
			}
		]
	},
	{
		ownerName: 'Mary',
		cats: [
			{
				petName: 'Huey',
			},
			{
				petName: 'Dewey',
			},
		],
		dogs: [
			{
				petName: 'Louie',
			}
		]
	}
	]};

export const expectedOneLayerResult = {
	men: [
		{
			name: 'Peter',
			pets: [{
				"dogName": "Rex"
			}]
		},
		{
			name: 'John',
			pets: [{
				"catName": "Jimmy",
				"dogName": "Lassie"
			},
			{
				"catName": "Jimmy",
				"dogName": "Oliver"
			}]
		}
	],
	women: [
		{
			name: 'Mary',
			pets: [
				{
					"catName": "Huey",
					"dogName": "Louie"
				},
				{
					"catName": "Dewey",
					"dogName": "Louie"
				}
			]
		}
	]
};


export const expectedThreeLayerResultWithoutKeepingUngroupedElements = {
	capabilities: [
		{
			iri: 'http://www.w3id.org/hsu-aut/addition#AdditionCapability',
			inputs: [
				{
					iri: 'http://www.w3id.org/hsu-aut/addition#InputA',
					type: 'http://www.w3id.org/hsu-aut/VDI3682#Information'
				},
				{
					iri: 'http://www.w3id.org/hsu-aut/addition#InputB',
					type: 'http://www.w3id.org/hsu-aut/VDI3682#Information'
				}
			],
			outputs: [
				{
					iri: 'http://www.w3id.org/hsu-aut/addition#OutputSum',
					type: 'http://www.w3id.org/hsu-aut/VDI3682#Product'
				}
			]
		}
	]
};
