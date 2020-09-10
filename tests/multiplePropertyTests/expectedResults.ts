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
