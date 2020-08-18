// Expected result for one layer mapping:
export const expectedOneLayerResult = {
	owners: [
		{
			ownerName: 'Peter',
			pets: [
				{
					petName: 'Rex',
					petType: 'Dog'
				}
			]
		},
		{
			ownerName: 'John',
			pets: [
				{
					petName: 'Lassie',
					petType: 'Dog'
				},
				{
					petName: 'Oliver',
					petType: 'Cat'
				}
			]
		},
		{
			ownerName: 'Mary',
			pets: [
				{
					petName: 'Huey',
					petType: 'Cat'
				},
				{
					petName: 'Dewey',
					petType: 'Cat'
				},
				{
					petName: 'Louie',
					petType: 'Cat'
				}
			]
		}
	]};

export const expectedTwoLayerResult = {
	owners: [
		{
			ownerName: 'Peter',
			petTypes: [
				{
					type: 'Dog',
					pets: [
						{ petName: 'Rex' }
					]
				}
			]
		},
		{
			ownerName: 'John',
			petTypes: [
				{
					type: 'Dog',
					pets: [
						{ petName: 'Lassie' }
					]
				},
				{
					type: 'Cat',
					pets: [
						{ petName: 'Oliver' }
					]
				}
			]
		},
		{
			ownerName: 'Mary',
			petTypes: [
				{
					type: 'Cat',
					pets: [
						{ petName: 'Huey' },
						{ petName: 'Dewey' },
						{ petName: 'Louie' },
					]
				}
			]
		}
	]};
